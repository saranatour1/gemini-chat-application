import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, Anonymous],
});
