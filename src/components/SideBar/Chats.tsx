import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FormEvent, useMemo, useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export const Chats = () => {
  const chats = useQuery(api.chats.viewer);
  const data = useMutation(api.chats.createChat);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("name")?.toString().length) {
      const newChannel = await data({ name: form.get("name") as unknown as string });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="ml-auto p-2">
          <Plus className="hover:rotate-45 transition-transform" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>create a new channel</DialogTitle>
            <form className="w-full h-full flex flex-col items-start justify-center gap-y-2" onSubmit={handleSubmit}>
              <Label className="flex flex-col items-start justify-center gap-y-2">
                <span>Channel Name</span>
                <Input name="name" />
              </Label>
              {/* Todo: create search users component  */}
              {/* <Label>
                  <span>users</span>
                  <Input/>
                </Label> */}
              <Button type="submit">confirm</Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-full h-full grid grid-flow-row auto-rows-auto min-h-min">
        {chats?.length && chats.length > 0 ? (
          chats?.map((chat, idx) => (
            <div
              className="w-full h-full max-h-12 p-2 hover:cursor-pointer hover:underline transition-all flex items-center justify-start gap-4"
              key={idx}
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
export const TimeObject = ({time}:{time:number}) => {
  const timestamp = useMemo(() => {
    const timeC = new Date(time);
    const hours = timeC.getHours().toString().padStart(2, '0');
    const minutes = timeC.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [time]);
  return <span>{timestamp}</span>
}