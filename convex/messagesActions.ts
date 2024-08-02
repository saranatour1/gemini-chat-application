"use node"
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { apiKey, genAI } from './model';


export const chatWithAttachment = action({
  args:{blob:v.object({path:v.string(), name:v.optional(v.string()), displayName:v.optional(v.string()), mimeType:v.string()}), text:v.string()},
  handler:async(ctx, args_0)=> {
    const fileManager = new GoogleAIFileManager(apiKey as string)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const getResult = await fileManager.uploadFile(args_0.blob.path,{mimeType:args_0.blob.mimeType,name:args_0.blob.name})
  },
})