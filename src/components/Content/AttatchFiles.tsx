import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Paperclip } from 'lucide-react';
export const AttachFiles =()=>{
  const [file,SetFile] = useState<FileList>()
  useEffect(()=>{
    const formData = new FormData()
    formData.append("attached-file",(file as FileList)[0])
    console.log(formData)
  },[file])
  return(
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Label className="p-2 hover:cursor-pointer">
          <Paperclip className="size-4" />
          <span className="sr-only">Attach file</span>
          <Input type="file" className="hidden" onChange={(e)=> SetFile(e.currentTarget.files as FileList)}/>
        </Label>
      </TooltipTrigger>
      <TooltipContent side="top">Attach File</TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}