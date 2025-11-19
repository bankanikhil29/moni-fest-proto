import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

export const phoneSchema = z.string()
  .trim()
  .regex(/^[\d\s\-\+\(\)]+$/, { message: "Invalid phone number format" })
  .min(10, { message: "Phone number must be at least 10 digits" })
  .max(20, { message: "Phone number must be less than 20 characters" })
  .optional()
  .or(z.literal(''));

export const urlSchema = z.string()
  .trim()
  .url({ message: "Invalid URL format" })
  .refine(url => url.startsWith('http://') || url.startsWith('https://'), {
    message: "URL must start with http:// or https://"
  })
  .optional()
  .or(z.literal(''));

export const socialHandleSchema = z.string()
  .trim()
  .regex(/^@?[\w\.]+$/, { message: "Invalid social media handle" })
  .max(50, { message: "Handle must be less than 50 characters" })
  .optional()
  .or(z.literal(''));

export const positiveNumberSchema = z.coerce
  .number({ invalid_type_error: "Must be a number" })
  .nonnegative({ message: "Must be a positive number" })
  .max(1000000000, { message: "Value is too large" });

// Brand Profile Setup Schema
export const brandProfileSchema = z.object({
  companyInfo: z.object({
    companyName: z.string().trim().min(2, { message: "Company name must be at least 2 characters" }).max(100, { message: "Company name must be less than 100 characters" }),
    registrationNumber: z.string().trim().max(50, { message: "Registration number must be less than 50 characters" }).optional().or(z.literal('')),
    website: urlSchema,
    industry: z.string().min(1, { message: "Please select an industry" }),
    companySize: z.string().min(1, { message: "Please select company size" }),
    establishedYear: z.string().regex(/^\d{4}$/, { message: "Invalid year format" }).optional().or(z.literal('')),
    headquartersLocation: z.string().trim().max(100, { message: "Location must be less than 100 characters" }).optional().or(z.literal(''))
  }),
  contactInfo: z.object({
    contactPersonName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
    designation: z.string().trim().max(100, { message: "Designation must be less than 100 characters" }).optional().or(z.literal('')),
    email: emailSchema,
    phone: phoneSchema,
    preferredLanguage: z.string()
  }),
  brandDetails: z.object({
    brandDescription: z.string().trim().min(10, { message: "Description must be at least 10 characters" }).max(1000, { message: "Description must be less than 1000 characters" }),
    targetAudience: z.string().trim().max(500, { message: "Target audience must be less than 500 characters" }).optional().or(z.literal('')),
    brandValues: z.string().trim().max(500, { message: "Brand values must be less than 500 characters" }).optional().or(z.literal('')),
    previousCampaigns: z.string().trim().max(1000, { message: "Previous campaigns must be less than 1000 characters" }).optional().or(z.literal('')),
    socialMediaPresence: z.object({
      instagram: socialHandleSchema,
      facebook: socialHandleSchema,
      twitter: socialHandleSchema,
      linkedin: socialHandleSchema,
      youtube: socialHandleSchema
    })
  }),
  campaignPreferences: z.object({
    campaignTypes: z.array(z.string()).min(1, { message: "Select at least one campaign type" }),
    contentTypes: z.array(z.string()).min(1, { message: "Select at least one content type" }),
    preferredNiches: z.array(z.string()).min(1, { message: "Select at least one niche" }),
    budgetRange: z.string().min(1, { message: "Please select a budget range" }),
    campaignDuration: z.string().min(1, { message: "Please select campaign duration" }),
    expectedDeliverables: z.string().trim().max(1000, { message: "Expected deliverables must be less than 1000 characters" }).optional().or(z.literal(''))
  })
});

// Influencer Profile Setup Schema
export const influencerProfileSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
    email: emailSchema,
    phone: phoneSchema,
    dateOfBirth: z.string().optional().or(z.literal('')),
    gender: z.string().optional().or(z.literal('')),
    city: z.string().trim().max(100, { message: "City must be less than 100 characters" }).optional().or(z.literal('')),
    state: z.string().trim().max(100, { message: "State must be less than 100 characters" }).optional().or(z.literal('')),
    preferredLanguage: z.string()
  }),
  socialMedia: z.object({
    instagram: z.object({
      handle: socialHandleSchema,
      followers: z.string().optional().or(z.literal('')),
      engagementRate: z.string().optional().or(z.literal(''))
    }),
    youtube: z.object({
      handle: socialHandleSchema,
      subscribers: z.string().optional().or(z.literal('')),
      avgViews: z.string().optional().or(z.literal(''))
    }),
    twitter: z.object({
      handle: socialHandleSchema,
      followers: z.string().optional().or(z.literal('')),
      engagementRate: z.string().optional().or(z.literal(''))
    })
  }),
  contentDetails: z.object({
    niches: z.array(z.string()).min(1, { message: "Select at least one niche" }),
    contentTypes: z.array(z.string()).min(1, { message: "Select at least one content type" }),
    audienceAge: z.string().optional().or(z.literal('')),
    audienceGender: z.string().optional().or(z.literal('')),
    audienceLocation: z.string().trim().max(200, { message: "Location must be less than 200 characters" }).optional().or(z.literal('')),
    bio: z.string().trim().min(10, { message: "Bio must be at least 10 characters" }).max(500, { message: "Bio must be less than 500 characters" }),
    achievements: z.string().trim().max(1000, { message: "Achievements must be less than 1000 characters" }).optional().or(z.literal(''))
  }),
  rates: z.object({
    instagramPost: z.string().optional().or(z.literal('')),
    instagramStory: z.string().optional().or(z.literal('')),
    youtubeVideo: z.string().optional().or(z.literal('')),
    twitterPost: z.string().optional().or(z.literal(''))
  })
});

// Creator Application Schema
export const creatorApplicationSchema = z.object({
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: emailSchema,
  phone: phoneSchema,
  instagramHandle: socialHandleSchema,
  tiktokHandle: socialHandleSchema,
  youtubeChannel: socialHandleSchema,
  followersCount: z.string().refine((val) => !val || !isNaN(Number(val)), {
    message: "Must be a valid number"
  }).optional().or(z.literal('')),
  contentCategories: z.array(z.string()).min(1, { message: "Select at least one category" }),
  bio: z.string().trim().min(10, { message: "Bio must be at least 10 characters" }).max(500, { message: "Bio must be less than 500 characters" }),
  portfolioLinks: z.string().trim().max(500, { message: "Portfolio links must be less than 500 characters" }).optional().or(z.literal('')),
  ratePerReel: z.string().refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Must be a valid positive number"
  }).optional().or(z.literal('')),
  ratePerPost: z.string().refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
    message: "Must be a valid positive number"
  }).optional().or(z.literal('')),
  location: z.string().trim().max(100, { message: "Location must be less than 100 characters" }).optional().or(z.literal(''))
});

// Payment Card Details Schema
export const paymentCardSchema = z.object({
  number: z.string().trim().regex(/^\d{13,19}$/, { message: "Invalid card number" }),
  expiry: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry format (MM/YY)" }),
  cvc: z.string().trim().regex(/^\d{3,4}$/, { message: "Invalid CVC code" }),
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  country: z.string().min(1, { message: "Please select a country" }),
  zip: z.string().trim().regex(/^[\w\s\-]{3,10}$/, { message: "Invalid ZIP/postal code" })
});

// Document Verification Schema
export const documentVerificationSchema = z.object({
  documentType: z.string().min(1, { message: "Please select a document type" }),
  documentNumber: z.string().trim().min(1, { message: "Document number is required" }).max(50, { message: "Document number must be less than 50 characters" }),
  fullName: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  address: z.string().trim().min(10, { message: "Address must be at least 10 characters" }).max(300, { message: "Address must be less than 300 characters" }),
  frontImage: z.instanceof(File, { message: "Front image is required" }).optional(),
  backImage: z.instanceof(File, { message: "Back image is required" }).optional(),
  selfieImage: z.instanceof(File, { message: "Selfie is required" }).optional()
});

// Campaign Wizard Schema
export const campaignWizardSchema = z.object({
  objective: z.enum(['awareness', 'engagement', 'website-visits', 'leads', 'sales'], {
    errorMap: () => ({ message: "Please select a campaign objective" })
  }),
  brief: z.string().trim().min(120, { message: "Brief must be at least 120 characters" }).max(5000, { message: "Brief must be less than 5000 characters" }),
  budgetINR: z.number().min(1000, { message: "Minimum budget is ₹1,000" }),
  platforms: z.array(z.string()).min(1, { message: "Select at least one platform" }),
  contentType: z.enum(['upload', 'link']),
  contentFilePreview: z.string().optional(),
  contentLink: z.string().url({ message: "Invalid URL format" }).optional().or(z.literal(''))
}).refine(
  (data) => data.contentType === 'upload' ? !!data.contentFilePreview : !!data.contentLink,
  {
    message: "Either upload a file or provide a content link",
    path: ['contentFilePreview']
  }
);

// URL Parameter Validation
export const creatorIdParamSchema = z.coerce.number().int().positive({ message: "Invalid creator ID" });
export const amountParamSchema = z.coerce.number().nonnegative({ message: "Invalid amount" });
