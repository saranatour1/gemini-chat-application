import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SharedProviders } from "@/components/SharedProvides";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "main page",
  description: "Gemini chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharedProviders>
          <Navigation/>
          {children}
        </SharedProviders>
        </body>
    </html>
  );
}
