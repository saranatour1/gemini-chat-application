import { SignInWithGithub } from "@/components/SIgnInWithGithub";
import { SignInWithGoogle } from "@/components/SignInWithGoogle";
import { SignInWithPassword } from "@/components/SignInWithPassword";
import { Separator } from "@/components/ui/separator"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col  w-full gap-2 items-stretch justify-center">
      <div className=" w-full max-w-[384px] mx-auto flex flex-col gap-4">
      <h2 className="font-semibold text-2xl tracking-tight">
        Sign in or create an account
      </h2>
      <SignInWithPassword />
    </div>
      <Separator className="max-w-[400px] mx-auto"/>
      <div className="flex items-center justify-center gap-x-4 max-w-[400px] w-full mx-auto">
      <SignInWithGithub />
      <SignInWithGoogle />
      </div>
      </section>
    </main>
  );
}
