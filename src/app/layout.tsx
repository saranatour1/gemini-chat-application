import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "../components/Provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "home",
  description: "home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`w-full max-w-full min-h-screen flex flex-col items-start justify-start`, fontSans.className)}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
