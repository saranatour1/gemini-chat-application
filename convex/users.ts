import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args:{},
  handler:async(ctx, args_0)=> {
    const userId = await auth.getUserId(ctx);
    return ctx.db.get(userId!);
  },
})