'use client'
import { Children } from "@/types";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Provider = ({ children }: Children) => {
  return <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>;
};
