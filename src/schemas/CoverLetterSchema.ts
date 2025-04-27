import { z } from "zod";

export const CoverLetterSchema = z.object({
    jobDescription: z.string().optional(),
    companyName: z.string().min(1, "Company name is required"),
    jobTitle: z.string().min(1, "Job title is required"),
});

export type CoverLetterType = z.infer<typeof CoverLetterSchema>;
