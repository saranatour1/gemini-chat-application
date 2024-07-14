import { query } from "./_generated/server";
import { auth } from "./auth";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await auth.getSessionId(ctx);
    return sessionId !== null ? ctx.db.get(sessionId) : null;
  },
});
