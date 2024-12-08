import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "@convex/_generated/server";

export const getCurrentUser = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  return userId ? ctx.db.get(userId) : null;
};
