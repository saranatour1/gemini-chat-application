'use client'
import { ChildProps } from "../utils/types";
import { NextUIProvider } from "@nextui-org/react"; // for the next-ui context
import { SessionProvider } from "next-auth/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
export const SharedProviders = ({ children }: ChildProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};
