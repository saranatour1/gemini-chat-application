'use client'
import { Unauthenticated } from "convex/react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
export const NotSignedIn = ()=>{
  return (<Unauthenticated>
    <div className="w-full h-full max-w-full flex flex-col items-center justify-center min-h-screen">
      <p className="py-4 text-2xl font-bold">please sign in</p>
      <Link href={`/`} className={buttonVariants({ variant: "outline" })}>
        sign in page
      </Link>
    </div>
  </Unauthenticated>)
}