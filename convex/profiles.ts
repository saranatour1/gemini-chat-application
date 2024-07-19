import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const viewer = query({
  args: { profileId: v.id("profiles") },
  handler: async (ctx, args) => {
    try {
      const profile = await ctx.db.get(args.profileId);

      if (!profile) {
        throw new ConvexError("Profile not found");
      }

      const userId = profile.userId;
      const user = await ctx.db.get(userId);

      if (!user) {
        throw new ConvexError("User not found");
      }

      const profileInformation = {
        username: user?.name,
        image: user?.image,
        email: user.email,
        bio: profile.bio || "",
        since: profile._creationTime,
      };
      return profileInformation;
    } catch (error) {
      console.error("something happened while viewing the profile");
    }
  },
});
