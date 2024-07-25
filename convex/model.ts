import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});