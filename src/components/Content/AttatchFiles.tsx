import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Children } from "@/types";
export const AttachFiles = ({ children }: Children) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top">Attach File</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
