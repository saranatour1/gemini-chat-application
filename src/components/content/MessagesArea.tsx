import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export const MessagesArea = ({ chatId }: { chatId: Id<"channels"> }) => {
  const messageViewer = useQuery(api.messages.viewer, chatId ? { chatId: chatId } : "skip");
  const channelInfo = useQuery(api.chats.getChatById, chatId ? { chatId: chatId } : "skip");
  const user = useQuery(api.users.viewer);
  return (
    <div className="w-full h-full flex flex-col justify-end items-end">
      {/* Todo: add edit information */}
      <div className="w-full self-start p-4 ">
        <div className="flex items-center justify-start gap-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{channelInfo?.name}</p>
        </div>

      </div>

      <div className="w-full h-[60vh] overflow-scroll self-end mt-auto p-4 grid grid-flow-row auto-rows-max gap-y-2">
        {messageViewer?.map((item, idx) => (
          <p
            className={` flex flex-col ${user?._id === item.senderId ? "justify-end items-end" : "justify-start items-start"}`}
            key={idx}
          >
            {/* <span>{item.author}</span> */}
            <span className={`px-4 py-3 bg-slate-50 rounded-md shadow-sm border`}>{item.message}</span>
            {/* <small>{Date(item._creationTime).toString()}</small> */}
          </p>
        ))}
      </div>
    </div>
  );
};
