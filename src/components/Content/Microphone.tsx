import { Mic, Pause } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useEffect, useRef, useState } from "react";
export const Microphone = () => {
  const [record, setRecord] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={()=>setRecord(!record)}>
            {record ? <Pause className="size-4" /> : <Mic className="size-4" />}
            {record ? (
              <span className="sr-only">pause recording</span>
            ) : (
              <span className="sr-only">Use Microphone</span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">Use Microphone</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
