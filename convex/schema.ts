import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...
  profiles: defineTable({
    userId: v.id('users'), // one to one
    bio: v.string(),
  }).index('userId', ['userId']),
  // one user has many friends but 1 friend is connected to 1 user, one to many
  friends: defineTable({
    userId: v.id('users'),
    friendId:v.id('users'),
  }).index('userId',['userId'])
  .index('friendId',['friendId']),
  
  requests: defineTable({
    senderId: v.id('users'),
    receiverId: v.id('users'),
    status:v.string(),
  }).index('senderId',['senderId'])
  .index('receiverId',['receiverId'])
});
 
export default schema;