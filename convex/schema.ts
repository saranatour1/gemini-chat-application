import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  profiles: defineTable({
    userId: v.id("users"),
    bio: v.string(),
  }).index("userId", ["userId"]),
  channels: defineTable({
    name: v.string(),
  }).index("name", ["name"]),
  channelUsers: defineTable({
    channelId: v.id("channels"),
    userId: v.id("users"),
  }).index("channelId", ["channelId"])
  .index("userId", ["userId"]),
  messages: defineTable({
    channelId: v.id("channel"),
    senderId: v.id("users"),
    message: v.string(),
  }).index("sender", ["senderId"]),
});

export default schema;
