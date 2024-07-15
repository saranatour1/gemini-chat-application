import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { auth } from "./auth";
import { getAll, getOneFrom, getManyFrom, getManyVia } from "convex-helpers/server/relationships";
import { api } from "./_generated/api";

// views a user profile, name, bio, user profile, requests
export const viewer = query({
  args: { profileId: v.id("profiles") },
  handler: async (ctx, args) => {
    try {
      const profile = await ctx.db.get(args.profileId);
      
      if (!profile) {
        throw new ConvexError('Profile not found');
      }

      const userId = profile.userId;    
      const [user, requestsTo, requestsFrom] = await Promise.all([
        ctx.db.get(userId),
        ctx.db.query('requests')
        .withIndex('receiverId', (q) => q.eq('receiverId', userId))
        .unique(),
        ctx.db.query('requests')
        .withIndex('senderId', (q) => q.eq('senderId', userId))
        .unique()
      ])

      if (!user) {
        throw new ConvexError('User not found');
      }

      const profileInformation ={
        username:user?.name,
        image:user?.image,
        email:user.email,
        bio:profile.bio || "",
        since:profile._creationTime,
        requestsTo: requestsTo ? requestsTo.status : null,
        requestsFrom: requestsFrom ? requestsFrom.status : null,
        isRequested: !!requestsFrom,
      }
      return profileInformation
    } catch (error) {
      console.error('something happened while viewing the profile')
    }
  },
});

