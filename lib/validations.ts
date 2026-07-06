import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  guests: z.number().int().min(1, "At least 1 guest").max(20, "Max 20 guests"),
  date: z.string().min(1, "Please choose a date"),
  time: z.string().min(1, "Please choose a time"),
  notes: z.string().max(500).optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const feedbackSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  rating: z.number().int().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Please share at least a few words"),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const referralSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  friendEmail: z.string().email("Please enter your friend's email"),
});

export type ReferralFormValues = z.infer<typeof referralSchema>;

export const partnershipSchema = z.object({
  company: z.string().min(2, "Please enter your company name"),
  contact: z.string().min(2, "Please enter a contact name"),
  email: z.string().email("Please enter a valid email"),
  type: z.string().min(1, "Please choose a partnership type"),
  message: z.string().min(10, "Please tell us a little more"),
});

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;
