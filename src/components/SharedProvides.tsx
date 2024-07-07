'use client'
import { ChildProps } from "../utils/types";
import { NextUIProvider } from "@nextui-org/react"; // for the next-ui context
import { SessionProvider } from "next-auth/react";
export const SharedProviders = ({ children }: ChildProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};
