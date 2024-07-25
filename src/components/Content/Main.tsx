"use client";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Message } from "./Message";
import { useEffect } from "react";
import { TextForm } from "./TextForm";

interface Props {
  threadId: Id<"threads">[];
}
export const Main = ({ threadId }: Props) => {
  const messages = useQuery(api.messages.viewer, threadId ? { threadId: threadId[0] } : "skip");
  return (
    <main className="grid flex-1 gap-4 overflow-auto  md:grid-cols-2 lg:grid-cols-2">
      <div className="relative flex h-full min-h-[40vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-1 mt-6">
          <ScrollArea className="w-full max-w-full h-[650px]">
            <div className="grid gap-4">
              {messages && messages?.map((message, idx) => <Message message={message} key={idx} />)}
            </div>
          </ScrollArea>
        </div>
        <TextForm threadId={threadId[0]}/>
      </div>
    </main>
  );
};
