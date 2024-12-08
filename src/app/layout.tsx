import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@sections/Provider";
import { cn } from "@utils/utils";
import { Toaster } from "@ui/toaster"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "home",
  description: "home page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const provider = await ConvexAuthNextjsServerProvider({
    children: (
      <Provider>
        {children}
      </Provider>
    ),
  });
  return(
    <html lang="en">
      <body className={cn(``, fontSans.className)}>
        {provider}
        <Toaster />
      </body>
    </html>
  );
}