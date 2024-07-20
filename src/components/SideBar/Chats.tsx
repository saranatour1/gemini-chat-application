import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMemo } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { AddChannels } from "./AddChannels";

export const Chats = ({ chatId, setChatId }: { chatId: Id<"channels">; setChatId: (id: Id<"channels">) => void }) => {
  const chats = useQuery(api.chats.viewer);
  return (
    <>
      <AddChannels />
      <div className="w-full h-full grid grid-flow-row auto-rows-auto min-h-min">
        {chats?.length && chats.length > 0 ? (
          chats?.map((chat, idx) => (
            <div
              className="w-full h-full max-h-12 p-2 hover:cursor-pointer hover:underline transition-all flex items-center justify-start gap-4"
              key={idx}
              onClick={() => setChatId(chat._id)}
            >
              <Avatar>
                <AvatarImage className=" max-h-12 max-w-10 rounded-full" src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="flex items-center justify-between w-full">
                <span>{chat?.name}</span>
                <TimeObject time={chat._creationTime} />
              </p>
            </div>
          ))
        ) : (
          <span className="p-2">No new chats</span>
        )}
      </div>
    </>
  );
};

// Todo: use Intl.RelativeTimeFormat() to format date longer than today
export const TimeObject = ({ time }: { time: number }) => {
  const timestamp = useMemo(() => {
    const timeC = new Date(time);
    const hours = timeC.getHours().toString().padStart(2, "0");
    const minutes = timeC.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }, [time]);
  return <span>{timestamp}</span>;
};
