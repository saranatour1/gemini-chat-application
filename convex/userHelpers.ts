import { QueryCtx } from "./_generated/server";
import { auth } from "./auth";

export const getCurrentUser = async (ctx: QueryCtx) => {
  const userId = await auth.getUserId(ctx);
  return userId ? ctx.db.get(userId) : null;
};
