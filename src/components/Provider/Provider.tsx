'use client'
import { Children } from "@/types";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Provider = ({ children }: Children) => {
  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
};
