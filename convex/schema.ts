import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { literals } from "convex-helpers/validators";

export const settingsSchema = {
  userId: v.id("users"),
  responseType: literals("chat","single-message"),
  theme:literals("dark","light"),
  keepChat: v.number(), // How long to keep the chats for // max of 30 days
  attachments:v.object({
      audio: v.boolean(),
      images: v.boolean(),
    }),
  model: literals("gemini-1.0-pro","gemini-1.0-pro-latest","gemini-1.0-pro-001","gemini-1.5-flash","gemini-1.5-flash-latest","gemini-1.5-pro-latest","gemini-1.5-pro"),
  languages: literals("ar","bn","bg","zh","hr","cs","da","nl",
    "en","et","fi","fr","de","el","iw","hi","hu","id","it","ja",
    "ko","lv","lt","no","pl","pt","ro","ru","sr","sk","sl","es",
    "sw","sv","th","tr","uk","vi")
}

const schema = defineSchema({
  ...authTables,
  settings: defineTable(settingsSchema)
    .index("userId", ["userId"])
    .index("languages", ["languages"]),
  threads: defineTable({
    summary: v.optional(v.string()),
    summarizer: v.optional(v.id("_scheduled_functions")),
  }).index("by_summary", ["summary"]),
  threadsMembers: defineTable({
    threadId: v.id("threads"),
    userId: v.id("users"),
  })
    .index("threadId", ["threadId"])
    .index("userId", ["userId"]),
  messages: defineTable({
    message: v.string(),
    threadId: v.id("threads"),
    author: v.union(
      v.object({
        role: v.literal("system"),
      }),
      v.object({
        role: v.literal("assistant"),
        // context: v.array(v.id("messages")),
        model: v.optional(v.string()),
      }),
      v.object({
        role: v.literal("user"),
        userId: v.id("users"),
      })
    ),
    state: literals("success", "generating", "failed"),
  })
    .index("state", ["state", "author.userId"])
    .index("threadId", ["threadId"]),
  jobs: defineTable({
    work: v.object({
      responseId: v.id("messages"),
      stream: v.boolean(),
    }),
    status: literals("pending", "inProgress", "success", "failed", "timedOut"),
    lastUpdate: v.number(),
    workerId: v.optional(v.id("workers")),
    janitorId: v.optional(v.id("_scheduled_functions")),
    start: v.optional(v.number()),
    end: v.optional(v.number()),
  })
    .index("responseId", ["work.responseId"])
    .index("status", ["status", "lastUpdate"]),
});

export default schema;
