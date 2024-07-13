'use client'
import { ReactNode } from "react"
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

interface Props{
  children:ReactNode;
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const Provider = ({children}:Props) =>{

  return(<ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>)
}