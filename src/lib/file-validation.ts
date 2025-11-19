/**
 * File validation utilities for secure file uploads
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Sanitize filename by removing unsafe characters
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 100);
};

/**
 * Validate image file for document uploads
 */
export const validateImageFile = (file: File): FileValidationResult => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File too large. Maximum 5MB allowed.',
    };
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPG and PNG images allowed.',
    };
  }

  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const validExtensions = ['jpg', 'jpeg', 'png'];
  if (!extension || !validExtensions.includes(extension)) {
    return {
      isValid: false,
      error: 'Invalid file extension. Only .jpg, .jpeg, and .png allowed.',
    };
  }

  return { isValid: true };
};

/**
 * Validate content file (image or video) for campaign uploads
 */
export const validateContentFile = (file: File): FileValidationResult => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File too large. Maximum 5MB allowed.',
    };
  }

  // Check MIME type
  const allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPG, PNG images and MP4, MOV videos allowed.',
    };
  }

  return { isValid: true };
};

/**
 * Create a safe object URL for file preview
 */
export const createSafePreviewUrl = (file: File): string | null => {
  try {
    return URL.createObjectURL(file);
  } catch (error) {
    console.error('Error creating preview URL:', error);
    return null;
  }
};
