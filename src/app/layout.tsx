import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "../components/Provider";
import { cn } from "@/lib/utils";

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
      <body className={cn(``, fontSans.className)}>
        <Provider>{children}</Provider>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
// grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]