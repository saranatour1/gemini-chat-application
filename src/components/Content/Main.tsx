"use client";;
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Message } from "./Message";
import { TextForm } from "./TextForm";
interface Props {
  threadId: Id<"threads">[];
}
export const Main = ({ threadId }: Props) => {
  const messages = useQuery(api.messages.viewer, threadId ? { threadId: threadId[0] } : "skip");
  return (
    <main className="grid flex-1 gap-4 overflow-auto  md:grid-cols-1 lg:grid-cols-1">
      <div className="relative flex h-full min-h-[40vh] flex-col rounded-xl p-4 lg:col-span-2 px-56 max-md:px-20 max-sm:px-4">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-1 mt-6">
          <ScrollArea className="w-full max-w-full h-[650px] py-8" >
            <div className="grid gap-4" >
              {messages && messages?.map((message, idx) => <Message message={message} key={idx} />)}
            </div>
          </ScrollArea>
        </div>
        <TextForm threadId={threadId[0]}/>
      </div>
    </main>
  );
};
