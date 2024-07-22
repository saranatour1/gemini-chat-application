import { SignUp } from "@/components/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid items-center justify-center grid-flow-row auto-rows-auto w-full h-full max-w-full min-h-screen">
      <SignUp />
    </main>
  );
}
