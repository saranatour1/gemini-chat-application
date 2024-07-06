import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SharedProviders } from "@/components/SharedProvides";

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
          {children}
        </SharedProviders>
        </body>
    </html>
  );
}
