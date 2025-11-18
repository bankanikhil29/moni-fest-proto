import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International E.164 format
const urlRegex = /^https?:\/\/.+/;
const instagramHandleRegex = /^@?[\w.]+$/;
const emailSchema = z.string().email('Invalid email address').max(255, 'Email too long');

// Brand Profile Setup Schemas
export const companyInfoSchema = z.object({
  companyName: z.string().trim().min(2, 'Company name must be at least 2 characters').max(100, 'Company name too long'),
  registrationNumber: z.string().trim().min(3, 'Registration number required').max(50, 'Registration number too long'),
  website: z.string().regex(urlRegex, 'Must be a valid URL (starting with http:// or https://)').max(255, 'URL too long'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  establishedYear: z.string().regex(/^\d{4}$/, 'Must be a valid year'),
  headquartersLocation: z.string().trim().min(2, 'Location required').max(100, 'Location too long')
});

export const contactInfoSchema = z.object({
  contactPersonName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  designation: z.string().trim().min(2, 'Designation required').max(100, 'Designation too long'),
  email: emailSchema,
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  preferredLanguage: z.string().min(1, 'Please select a language')
});

export const brandDetailsSchema = z.object({
  brandDescription: z.string().trim().min(20, 'Description must be at least 20 characters').max(2000, 'Description too long'),
  targetAudience: z.string().trim().min(10, 'Target audience must be at least 10 characters').max(1000, 'Target audience too long'),
  brandValues: z.string().trim().min(10, 'Brand values must be at least 10 characters').max(1000, 'Brand values too long'),
  previousCampaigns: z.string().max(2000, 'Previous campaigns description too long').optional(),
  socialMediaPresence: z.object({
    instagram: z.string().max(255).optional(),
    facebook: z.string().max(255).optional(),
    twitter: z.string().max(255).optional(),
    linkedin: z.string().max(255).optional(),
    youtube: z.string().max(255).optional()
  })
});

export const campaignPreferencesSchema = z.object({
  campaignTypes: z.array(z.string()).min(1, 'Select at least one campaign type'),
  contentTypes: z.array(z.string()).min(1, 'Select at least one content type'),
  preferredNiches: z.array(z.string()).min(1, 'Select at least one niche'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  campaignDuration: z.string().min(1, 'Please select campaign duration'),
  expectedDeliverables: z.string().trim().min(10, 'Deliverables must be at least 10 characters').max(1000, 'Deliverables too long')
});

// Influencer Profile Setup Schemas
export const personalInfoSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: emailSchema,
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.string().min(1, 'Please select gender'),
  city: z.string().trim().min(2, 'City required').max(100, 'City name too long'),
  state: z.string().trim().min(2, 'State required').max(100, 'State name too long'),
  preferredLanguage: z.string().min(1, 'Please select a language')
});

export const socialMediaSchema = z.object({
  instagram: z.object({
    handle: z.string().regex(instagramHandleRegex, 'Invalid Instagram handle').max(30, 'Handle too long'),
    followers: z.string().regex(/^\d+$/, 'Must be a number'),
    engagementRate: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a number (e.g., 4.5)')
  }),
  youtube: z.object({
    handle: z.string().max(100, 'Handle too long').optional().or(z.literal('')),
    subscribers: z.string().regex(/^\d*$/, 'Must be a number').optional().or(z.literal('')),
    avgViews: z.string().regex(/^\d*$/, 'Must be a number').optional().or(z.literal(''))
  }),
  twitter: z.object({
    handle: z.string().max(100, 'Handle too long').optional().or(z.literal('')),
    followers: z.string().regex(/^\d*$/, 'Must be a number').optional().or(z.literal('')),
    engagementRate: z.string().regex(/^\d*(\.\d{1,2})?$/, 'Must be a number').optional().or(z.literal(''))
  })
});

export const contentDetailsSchema = z.object({
  niches: z.array(z.string()).min(1, 'Select at least one niche'),
  contentTypes: z.array(z.string()).min(1, 'Select at least one content type'),
  audienceAge: z.string().min(1, 'Please select audience age'),
  audienceGender: z.string().min(1, 'Please select audience gender'),
  audienceLocation: z.string().trim().min(2, 'Location required').max(100, 'Location too long'),
  bio: z.string().trim().min(20, 'Bio must be at least 20 characters').max(1000, 'Bio too long'),
  achievements: z.string().max(2000, 'Achievements too long').optional()
});

export const ratesSchema = z.object({
  instagramPost: z.string().regex(/^\d+$/, 'Must be a valid amount'),
  instagramStory: z.string().regex(/^\d+$/, 'Must be a valid amount'),
  youtubeVideo: z.string().regex(/^\d*$/, 'Must be a valid amount').optional().or(z.literal('')),
  twitterPost: z.string().regex(/^\d*$/, 'Must be a valid amount').optional().or(z.literal(''))
});

// Document Verification Schema
export const documentVerificationSchema = z.object({
  documentType: z.string().min(1, 'Please select document type'),
  documentNumber: z.string().trim().min(5, 'Document number must be at least 5 characters').max(50, 'Document number too long'),
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  address: z.string().trim().min(10, 'Address must be at least 10 characters').max(500, 'Address too long'),
  frontImage: z.instanceof(File, { message: 'Front image is required' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'Only JPEG and PNG files are allowed'),
  backImage: z.instanceof(File, { message: 'Back image is required' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'Only JPEG and PNG files are allowed')
    .nullable(),
  selfieImage: z.instanceof(File, { message: 'Selfie is required' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'Only JPEG and PNG files are allowed')
});

// Campaign Wizard Schemas
export const campaignObjectiveSchema = z.object({
  objective: z.enum(['Awareness', 'Engagement', 'Website Visits', 'Leads', 'Sales'], {
    errorMap: () => ({ message: 'Please select a campaign objective' })
  })
});

export const campaignBriefSchema = z.object({
  brief: z.string().trim().min(20, 'Campaign brief must be at least 20 characters').max(2000, 'Campaign brief too long')
});

export const campaignContentSchema = z.object({
  contentType: z.enum(['upload', 'link'], {
    errorMap: () => ({ message: 'Please select content type' })
  }),
  contentFilePreview: z.string().optional(),
  contentLink: z.string().optional()
}).refine(
  data => {
    if (data.contentType === 'upload') return !!data.contentFilePreview;
    if (data.contentType === 'link') return !!data.contentLink && urlRegex.test(data.contentLink);
    return false;
  },
  {
    message: 'Please provide valid content'
  }
);

export const campaignBudgetSchema = z.object({
  budgetINR: z.number().min(1000, 'Budget must be at least ₹1,000').max(10000000, 'Budget cannot exceed ₹1,00,00,000')
});

export const campaignAudienceSchema = z.object({
  audiencePreset: z.enum(['India', 'Metros', 'Custom (coming soon)'], {
    errorMap: () => ({ message: 'Please select an audience preset' })
  }),
  platforms: z.array(z.string()).min(1, 'Select at least one platform')
});
