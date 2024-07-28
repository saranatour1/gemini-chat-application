import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { literals } from "convex-helpers/validators";

const schema = defineSchema({
  ...authTables,
  settings: defineTable({
    userId: v.id("users"),
    responseType: v.union(v.literal("chat"), v.literal("single-message")),
    theme: v.union(v.literal("dark"), v.literal("light")),
    keepChat: v.number(), // How long to keep the chats for // max of 30 days
    attachments:v.object({
        audio: v.boolean(),
        images: v.boolean(),
      }),
    model: v.union(
      v.literal("gemini-1.5-pro"),
      v.literal("gemini-1.5-flash"),
      v.literal("gemini-1.0-pro"),
      v.literal("text-embedding-004"),
      v.literal("aqa")
    ),
    languages: v.union(
      v.literal("ar"),
      v.literal("bn"),
      v.literal("bg"),
      v.literal("zh"),
      v.literal("hr"),
      v.literal("cs"),
      v.literal("da"),
      v.literal("nl"),
      v.literal("en"),
      v.literal("et"),
      v.literal("fi"),
      v.literal("fr"),
      v.literal("de"),
      v.literal("el"),
      v.literal("iw"),
      v.literal("hi"),
      v.literal("hu"),
      v.literal("id"),
      v.literal("it"),
      v.literal("ja"),
      v.literal("ko"),
      v.literal("lv"),
      v.literal("lt"),
      v.literal("no"),
      v.literal("pl"),
      v.literal("pt"),
      v.literal("ro"),
      v.literal("ru"),
      v.literal("sr"),
      v.literal("sk"),
      v.literal("sl"),
      v.literal("es"),
      v.literal("sw"),
      v.literal("sv"),
      v.literal("th"),
      v.literal("tr"),
      v.literal("uk"),
      v.literal("vi")
    ),
  })
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
