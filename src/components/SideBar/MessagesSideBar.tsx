import { ResizablePanel } from "@/components/ui/resizable"
import { useQuery } from "convex/react"
import { Chats } from "./Chats";
import { Id } from "../../../convex/_generated/dataModel";

export const MessagesSideBar =({chatId , setChatId}:{chatId:Id<"channels">, setChatId:(id:Id<"channels">) => void})=>{
  return (<ResizablePanel className="w-full h-auto  min-h-[84vh] col-span-1 flex flex-col items-start justify-start mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border" defaultSize={30} minSize={20}>
    <h3 className="text-4xl font-bold p-4">Messages</h3>
    <Chats chatId={chatId} setChatId={setChatId} />
  </ResizablePanel>)
}