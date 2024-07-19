import { ResizablePanel } from "@/components/ui/resizable";
import { SendText } from "./SendText";
import { Id } from "../../../convex/_generated/dataModel";

import { MessagesArea } from "./MessagesArea";

export const ChatContent = ({ chatId }: { chatId: Id<"channels"> }) => {
  return (
    <ResizablePanel
      className="w-full col-span-1 flex flex-col items-start justify-evenly min-h-[84vh] max-h-full mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border"
      defaultSize={70}
      minSize={40}
    > 
      <MessagesArea chatId={chatId} />
      <SendText chatId={chatId} />
    </ResizablePanel>
  );
};
