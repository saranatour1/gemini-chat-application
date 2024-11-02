import { lazy, Suspense } from "react";
const SignUp = lazy(()=> import('@/components/SignUp'))
import type { Metadata } from 'next'
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: 'User Authentication',
  description: 'Access your account or create a new one with options to sign in via password, Google, or GitHub for a quick and secure experience.',
}

export default function Home() {
  return (
    <main className="grid items-center justify-center grid-flow-row auto-rows-auto w-full h-full max-w-full min-h-screen">
       <div className="w-full flex-col items-center justify-center max-sm:px-4 max-w-full">
        <Suspense fallback={<Skeleton className="w-[500px] h-[800px]"/>}>
          <SignUp />
        </Suspense>
       </div>
    </main>
  );
}
