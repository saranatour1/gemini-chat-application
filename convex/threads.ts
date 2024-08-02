import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { getAll, getManyFrom } from "convex-helpers/server/relationships";
import { checkLastThreads } from "./threadHelpers";
import { ConvexError } from "convex/values";

// get a list of threads user is member in
export const viewer = query({
  args: {},
  handler: async (ctx, args_0) => {
    // get the logged in user
    const user = await auth.getUserId(ctx);
    // get an array that shows the threads the user is Member In (user <-> thread)
    const threadsUserIsMemberIn = await getManyFrom(ctx.db, "threadsMembers", "userId", user!);
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
    const user = await auth.getUserId(ctx);
    // create a new thread
    let lastThread = await checkLastThreads(ctx,user!)
    if(lastThread){
      const newThread = await ctx.db.insert("threads", {
        summary: "new chat",
      });
      // add user to thread
      await ctx.db.insert("threadsMembers", {
        threadId: newThread,
        userId: user!,
      });
      return newThread;
    }else{
      throw new ConvexError("don't create more than 1 thread in such a short period of time")
    }
  },
});

export const getLast = query({
  args: {},
  handler: async (ctx, args_0) => {
    const user = await auth.getUserId(ctx);
    const userIsMember = await ctx.db
      .query("threadsMembers")
      .withIndex("userId", (q) => q.eq("userId", user!))
      .order("desc")
      .first();
    const thread = await ctx.db.query("threads").withIndex("by_id", (q) => q.eq("_id", userIsMember!.threadId));
    return thread;
  },
});