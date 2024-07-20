import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Edit, Delete } from "lucide-react"
import { Button } from "../ui/button"
import { Id } from "../../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { Alert } from "./Alert"

export const ChannelInfo =({channelId, name}:{channelId:Id<"channels">, name?:string}) =>{
  const channelInfo = useQuery(api.chats.getChatById, channelId ? { chatId: channelId } : "skip");
  const deleteChat = useMutation(api.chats.deleteChat)
  const [open, setOpen] = useState(false)
  return (
    <>
          {/* Todo: add edit information */}
          <div className="w-full self-start p-4 flex justify-between items-center">
        <div className="flex items-center justify-start gap-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="hover:underline hover:cursor-pointer">{channelInfo?.name}</span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <Alert open={open} setOpen={setOpen} execute={()=>deleteChat({channelId:channelId})}>
            <Delete className="text-black"/>
          </Alert>
        </div>
      </div>
      </>
  )
}