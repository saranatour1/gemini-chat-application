"use client";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaEdit } from "react-icons/fa";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { AwardIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const ToggleBtns = () => {
  const addChat = useMutation(api.threads.createThread);
  const createSettings = useMutation(api.settings.createUserSettings)
  const nav = useRouter();
  const directToLast = async()=>{
    const lastId = await addChat()
    if(lastId){
      nav.push(`/dashboard/${lastId}`)
    }
  }

  useEffect(()=>{
    createSettings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <AwardIcon className="h-6 w-6" />
              <span className="">Chat</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8" onClick={directToLast}>
              <FaEdit className="text-gpt-grey" />
              <span className="sr-only">Add new chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>New Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
