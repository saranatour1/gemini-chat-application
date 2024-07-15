import { ResizablePanel } from "./ui/resizable"

export const ChatContent = ()=>{

  return (<ResizablePanel className="col-span-3 w-full h-full flex flex-col justify-normal items-start" defaultSize={70} minSize={40}>
    message content
  </ResizablePanel>)
}