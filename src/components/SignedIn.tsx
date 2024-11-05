'use client'
import { Authenticated } from "convex/react";
import { Children } from "@/types";

export const SignedIn = ({ children }: Children) => {
  return (
    <Authenticated>
      {children}
    </Authenticated>
  );
};
