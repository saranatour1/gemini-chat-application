import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { Doc } from "./_generated/dataModel";
import { getAll, getOneFrom, getManyFrom, getManyVia } from "convex-helpers/server/relationships";
import { model } from "./model";

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
    const newThread = await ctx.db.insert("threads", {
      summary: "new chat",
    });
    // add user to thread
    const addUserToThread = await ctx.db.insert("threadsMembers", {
      threadId: newThread,
      userId: user!,
    });
    return newThread;
  },
});
