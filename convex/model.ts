import { Content, GenerationConfig, GoogleGenerativeAI, ModelParams } from "@google/generative-ai";

import { Doc } from "./_generated/dataModel";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);
// const fileManager = new GoogleAIFileManager(apiKey as string)

export const generationConfig:GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// return a response of a stream for a single message
export const singleMessageChat = async (message: string, settings: Partial<Doc<"settings">>) => {
  const model = genAI.getGenerativeModel({ model: settings.model as string})
  const result = await model.generateContentStream(message);
  return result;
};

export const singleOutputResponse = async (message: string, settings: Partial<Doc<"settings">>) => {
  const model = genAI.getGenerativeModel({ model: settings.model as string})
  const result = await model.generateContent(message);
  return result;
};

// all chat
export const chatResponse = async (messages: Doc<"messages">[], settings: Partial<Doc<"settings">>) => {
  // const model = genAI.getGenerativeModel({ model: settings.model as string});
  const model = genAI.getGenerativeModel({ model: settings.model as string})
  const history:Content[] = messages.map((singleMessage, index) => {
    return {
      role: singleMessage.author.role === "assistant" ? "model" : "user",
      parts: [{
        text: singleMessage.message,
      }],
    };
  });

  const chatSession = model.startChat({
    generationConfig,
    history
  })
  const result = await chatSession.sendMessageStream(messages[messages.length-1].message);
  return result
};
