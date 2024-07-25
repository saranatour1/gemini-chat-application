import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { literals } from "convex-helpers/validators";

const schema = defineSchema({
  ...authTables,
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
      status: literals(
        "pending",
        "inProgress",
        "success",
        "failed",
        "timedOut",
      ),
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
