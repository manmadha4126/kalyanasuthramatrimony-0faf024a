import { z } from "zod";

// ============================================
// Input Sanitization Utilities
// ============================================

/**
 * Strips HTML tags and dangerous characters from user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

/**
 * Sanitize phone number - only allow digits, +, spaces, hyphens
 */
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d+\s\-()]/g, "").trim();
};

/**
 * Rate limiter using in-memory store (client-side)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count++;
  return true;
};

// ============================================
// Validation Schemas
// ============================================

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[\d+\s\-()]+$/, "Invalid phone number format"),
  preferred_date: z.string().min(1, "Please select a date"),
  preferred_time: z.string().min(1, "Please select a time slot"),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(255, "Input is too long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),
});

// ============================================
// Session Security
// ============================================

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
let lastActivity = Date.now();

export const resetActivityTimer = () => {
  lastActivity = Date.now();
};

export const isSessionExpired = (): boolean => {
  return Date.now() - lastActivity > SESSION_TIMEOUT_MS;
};

/**
 * Setup activity listeners to track user interaction
 */
export const setupActivityTracking = () => {
  const events = ["mousedown", "keydown", "scroll", "touchstart"];
  events.forEach((event) => {
    document.addEventListener(event, resetActivityTimer, { passive: true });
  });

  return () => {
    events.forEach((event) => {
      document.removeEventListener(event, resetActivityTimer);
    });
  };
};

// ============================================
// Security Headers (CSP via meta tag is set in index.html)
// ============================================

/**
 * Validate URL to prevent open redirect attacks
 */
export const isValidRedirectUrl = (url: string): boolean => {
  if (!url) return false;
  // Only allow relative URLs or same-origin
  return url.startsWith("/") && !url.startsWith("//");
};

/**
 * Generate a simple CSRF-like token for form submissions
 */
export const generateFormToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
};
