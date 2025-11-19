import { z } from 'zod';

// Common schemas
export const nameSchema = z.string().trim().min(2, 'Required').max(100, 'Max 100 characters');

export const emailSchema = z.string().trim().email('Invalid email').max(255, 'Max 255 characters');

export const phoneINSchema = z.string().trim().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number (10 digits, starting with 6-9)');

export const addressSchema = z.string().trim().max(500, 'Max 500 characters');

// Document ID schemas
export const aadhaarSchema = z.string().trim().regex(/^\d{4}\s?\d{4}\s?\d{4}$/, 'Invalid Aadhaar format (12 digits)');

export const panSchema = z.string().trim().regex(/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN format (e.g., ABCDE1234F)');

export const passportSchema = z.string().trim().regex(/^[A-PR-WYa-pr-wy][1-9]\d{6}$/, 'Invalid Passport format');

// Document verification schema
export const documentVerificationSchema = z.object({
  documentType: z.enum(['aadhaar','pan','passport','driving-license']),
  documentNumber: z.string().trim().min(3,'Required').max(25, 'Max 25 characters'),
  fullName: nameSchema,
  dateOfBirth: z.string().refine(d => {
    const t = Date.parse(d); 
    if (Number.isNaN(t)) return false;
    const age = (Date.now() - t) / (1000*60*60*24*365.25);
    return age >= 18 && age <= 120;
  }, 'Must be between 18 and 120 years old'),
  address: addressSchema.optional(),
}).superRefine((val, ctx) => {
  if (val.documentType === 'aadhaar' && !aadhaarSchema.safeParse(val.documentNumber).success) {
    ctx.addIssue({code:'custom', path:['documentNumber'], message:'Invalid Aadhaar format (12 digits)'});
  }
  if (val.documentType === 'pan' && !panSchema.safeParse(val.documentNumber).success) {
    ctx.addIssue({code:'custom', path:['documentNumber'], message:'Invalid PAN format (e.g., ABCDE1234F)'});
  }
  if (val.documentType === 'passport' && !passportSchema.safeParse(val.documentNumber).success) {
    ctx.addIssue({code:'custom', path:['documentNumber'], message:'Invalid Passport format'});
  }
});

// Influencer profile schema
export const influencerProfileSchema = z.object({
  personalInfo: z.object({
    fullName: nameSchema,
    email: emailSchema,
    phone: phoneINSchema.optional().or(z.literal('')),
    dateOfBirth: z.string().optional(),
    city: z.string().trim().max(80, 'Max 80 characters').optional(),
    state: z.string().trim().max(80, 'Max 80 characters').optional(),
    preferredLanguage: z.string().optional()
  }),
  socialMedia: z.object({
    instagram: z.object({
      handle: z.string().trim().min(2,'Required'),
      followers: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
      engagementRate: z.string().trim().regex(/^\d*\.?\d*%?$/, 'e.g. 5.4%').optional().or(z.literal(''))
    }),
    youtube: z.object({
      handle: z.string().trim().optional().or(z.literal('')),
      subscribers: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
      avgViews: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal(''))
    }),
    twitter: z.object({
      handle: z.string().trim().optional().or(z.literal('')),
      followers: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
      engagementRate: z.string().trim().regex(/^\d*\.?\d*%?$/, 'e.g. 3%').optional().or(z.literal(''))
    })
  }),
  contentDetails: z.object({
    niches: z.array(z.string()).max(10, 'Max 10 niches'),
    contentTypes: z.array(z.string()).max(10, 'Max 10 types'),
    audienceAge: z.string().optional(),
    audienceGender: z.string().optional(),
    audienceLocation: z.string().optional(),
    bio: z.string().trim().max(2000, 'Max 2000 characters').optional(),
    achievements: z.string().trim().max(1000, 'Max 1000 characters').optional()
  }),
  rates: z.object({
    instagramPost: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
    instagramStory: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
    youtubeVideo: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal('')),
    twitterPost: z.string().trim().regex(/^\d*$/, 'Numbers only').optional().or(z.literal(''))
  })
});

// Campaign brief schema
export const campaignBriefSchema = z.string()
  .trim()
  .min(120, 'Brief must be at least 120 characters')
  .max(1000, 'Brief must be ≤ 1000 characters')
  .refine(v => !/[<>]/.test(v), 'Please remove < and >');

// Luhn algorithm for card validation
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

function isNotExpired(expiry: string): boolean {
  const [month, year] = expiry.split('/');
  if (!month || !year) return false;
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month));
  return expiryDate > new Date();
}

// Payment card schema
export const paymentCardSchema = z.object({
  number: z.string()
    .trim()
    .regex(/^\d{13,19}$/, 'Card number must be 13-19 digits')
    .refine(luhnCheck, 'Invalid card number'),
  expiry: z.string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
    .refine(isNotExpired, 'Card has expired'),
  cvc: z.string()
    .trim()
    .regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  name: z.string()
    .trim()
    .min(2, 'Required')
    .max(100, 'Max 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Letters only'),
  country: z.string().min(1, 'Please select a country'),
  zip: z.string()
    .trim()
    .min(3, 'Required')
    .max(10, 'Max 10 characters')
});

// File validation helper
export function validateFile(
  file: File, 
  options: { maxMB: number; accept: string[] }
): { ok: boolean; error?: string } {
  const maxBytes = options.maxMB * 1024 * 1024;
  
  if (file.size > maxBytes) {
    return { ok: false, error: `File size must be ≤ ${options.maxMB}MB` };
  }
  
  if (!options.accept.includes(file.type)) {
    return { ok: false, error: `File type must be ${options.accept.join(', ')}` };
  }
  
  return { ok: true };
}
