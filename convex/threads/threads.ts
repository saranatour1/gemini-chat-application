import { query } from "@convex/_generated/server";
import { getAll, getManyFrom } from "convex-helpers/server/relationships";
import { defineRateLimits } from "convex-helpers/server/rateLimit";
import { mutation } from "@convex/functions";
import { getCurrentUser } from "@convex/users/userHelpers";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const MAX_GROUP_SIZE = 25;

export const { checkRateLimit, rateLimit, resetRateLimit } = defineRateLimits({
  createThread: {
    kind: "token bucket",
    rate: 1,
    period: MINUTE,
    capacity: 2,
  },
});

// get a list of threads user is member in
export const viewer = query({
  args: {},
  handler: async (ctx, args_0) => {
    // get the logged in user
    const user = await getCurrentUser(ctx)
    // get an array that shows the threads the user is Member In (user <-> thread)
    const threadsUserIsMemberIn = await getManyFrom(ctx.db, "threadsMembers", "userId", user?._id!);
    // get all the Threads, by name and summary
    const threads = await getAll(
      ctx.db,
      threadsUserIsMemberIn.map((item) => item.threadId)
    );
    return threads.reverse();
  },
});

export const createThread = mutation({
  args: {},
  handler: async (ctx, args_0) => {
    // get logged in user
    const user = await getCurrentUser(ctx);
    // create a new thread
    await rateLimit(ctx, {
      name: "createThread",
      key: user?._id,
      throws: true,
    });
      const newThread = await ctx.db.insert("threads", {
        summary: "new chat",
      });
      // add user to thread
      await ctx.db.insert("threadsMembers", {
        threadId: newThread,
        userId: user?._id!,
      });
      return newThread;
  },
});

export const getLast = query({
  args: {},
  handler: async (ctx, args_0) => {
    const user = await getCurrentUser(ctx)
    const userIsMember = await ctx.db
      .query("threadsMembers")
      .withIndex("userId", (q) => q.eq("userId", user?._id!))
      .order("desc")
      .first();
    const thread = await ctx.db.query("threads").withIndex("by_id", (q) => q.eq("_id", userIsMember!.threadId));
    return thread;
  },
});