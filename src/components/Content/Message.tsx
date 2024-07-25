import { Doc } from "../../../convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useHtml } from '../../hooks/useHtml';
import { ReactNode } from "react";

interface Props {
  avatar?: string;
  message: Doc<"messages">;
}
export const Message = ({ message, avatar }: Props) => {
  const {html} = useHtml(message.message)
  return (
    <div className="flex items-start gap-4 rounded-md bg-card p-4">
      <Avatar className="border w-10 h-10">
        <AvatarImage
          src={
            message.author.role === `user`
              ? avatar
              : `https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg`
          }
        />
        <AvatarFallback>{message.author.role === "user" ? `U` : `A`}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="font-medium text-sm">{message.author.role === "user" ? `You` : `Assistant`}</p>
        <article className="prose w-full" dangerouslySetInnerHTML={{__html:html}}/> 
        <span className="sr-only">{message.state}</span>
      </div>
    </div>
  );
};
