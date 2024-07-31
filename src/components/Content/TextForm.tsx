"use client";
import { useMutation } from "convex/react";
import { CornerDownLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AttachFiles } from "./AttatchFiles";
import { Microphone } from "./Microphone";

interface Props {
  threadId: Id<"threads">;
}
export const TextForm = ({ threadId }: Props) => {
  const sendMessage = useMutation(api.messages.createMessage);
  const [text, setText] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const message = form.get("message");
    if (message) {
      sendMessage({ threadId: threadId, content: message?.toString()! });
      setText("");
    }
  };
  return (
    <form
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      x-chunk="dashboard-03-chunk-1"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        value={text}
        name="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <div className="flex items-center p-3 pt-0">
        <AttachFiles />
        <Microphone />
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
};
