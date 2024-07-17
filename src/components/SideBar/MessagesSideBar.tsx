import { ResizablePanel } from "@/components/ui/resizable"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Chats } from "./Chats";

export const MessagesSideBar =()=>{
  return (<ResizablePanel className="w-full h-auto col-span-1 flex flex-col items-start justify-evenly min-h-full mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border" defaultSize={30} minSize={20}>
    <h3 className="text-4xl font-bold p-4">Messages</h3>
    <Chats />
  </ResizablePanel>)
}