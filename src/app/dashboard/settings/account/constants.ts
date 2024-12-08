import { z } from "zod";
import { Doc } from "@convex/_generated/dataModel";

export const languagesSet: [string, ...string[]] = [
  "ar",
  "bg",
  "bn",
  "zh",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "et",
  "fi",
  "fr",
  "de",
  "el",
  "iw",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lv",
  "lt",
  "no",
  "pl",
  "pt",
  "ro",
  "ru",
  " sr",
  "sk",
  "sl",
  "es",
  "sw",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
];


export const accountFormSchema = (settings: Doc<"settings">) => {
  return z.object({
    responseType: z.enum(["chat", "single-message"]).default(settings?.responseType ?? "single-message"),
    keepChat: z
      .number()
      .max(Date.now() + 30 * 86400000)
      .min(Date.now() + 86400000)
      .default(settings?.keepChat ?? Date.now()),
    attachments: z.object({
      audio: z.boolean().default(settings?.attachments.audio ?? false),
      images: z.boolean().default(settings?.attachments.images ?? false),
    }),
    model: z
      .enum(["gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro-001",
        "gemini-1.5-pro-002",
        "gemini-1.0-pro-001",
        "gemini-1.0-pro-vision-001",
        "gemini-1.0-pro",
        "gemini-1.0-pro-001",
        "gemini-1.0-pro-002",
        "gemini-1.0-pro",
        "gemini-1.0-pro-latest",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro-latest",
        "gemini-1.5-pro",
      ])
      .default(settings?.model ?? "gemini-1.5-pro-001"),
    languages: z.enum(languagesSet).default(settings?.languages ?? "en"),
  });
};

export const responses = ["chat", "single-message"] as const 
export type Response = typeof responses[number]

export const models = ["gemini-1.5-flash-001",
  "gemini-1.5-flash-002",
  "gemini-1.5-pro-001",
  "gemini-1.5-pro-002",
  "gemini-1.0-pro-001",
  "gemini-1.0-pro-vision-001",
  "gemini-1.0-pro",
  "gemini-1.0-pro-001",
  "gemini-1.0-pro-002"] as const

  export type Model = typeof models[number];

