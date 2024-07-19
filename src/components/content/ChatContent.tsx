import { ResizablePanel } from "@/components/ui/resizable";
import { SendText } from "./SendText";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";

export const ChatContent = ({ chatId }: { chatId: Id<"channels"> }) => {
  const messageViewer = useQuery(api.messages.viewer, chatId ? { chatId: chatId } : "skip");
  
  useEffect(()=>{
    console.log("messages", messageViewer)
  },[messageViewer])
  return (
    <ResizablePanel
      className="w-full h-auto col-span-1 flex flex-col items-start justify-evenly min-h-[84vh] mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border"
      defaultSize={70}
      minSize={40}
    >
      
      <SendText chatId={chatId} />
    </ResizablePanel>
  );
};
