import { TextForm } from "@/components/Content/TextForm";

export default function page() {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col">
      <h1 className="p-6 flex flex-col items-center justify-center mx-auto col-span-4 text-3xl font-bold font-serif text-center">
        what can I help you with?
      </h1>
      <div className="mx-auto w-full max-w-lg">
        <TextForm />
      </div>
    </div>
  );
}
