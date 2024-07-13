import { SIgnInWithGithub } from "@/components/SIgnInWithGithub";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col min-[460px]:flex-row w-full gap-2 items-stretch">
      <SIgnInWithGithub />
      </section>
    </main>
  );
}
