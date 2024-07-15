import { ResizablePanel } from "./ui/resizable"

export const MessagesSideBar =()=>{

  return (<ResizablePanel className="w-full h-full col-span-1 flex flex-col items-start justify-evenly min-h-full" defaultSize={45} minSize={30}>
    side bar
  </ResizablePanel>)
}