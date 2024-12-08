import { Doc } from "@convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { useHtml } from '@hooks/useHtml';
interface Props {
  avatar?: string;
  message: Doc<"messages">;
}
export const Message = ({ message, avatar }: Props) => {
  const { html } = useHtml(message.message)

  return (
    <div className="flex items-start gap-4 rounded-md bg-card p-4 flex-col shadow-sm border">
      <div className="w-full h-full flex items-center justify-start gap-4 ">
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
        <p className="font-medium text-sm">{message.author.role === "user" ? `You` : `Assistant`}</p>
      </div>
      <div className="grid gap-1 w-full max-w-lg">
        <article className="prose w-full max-sm:break-words max-sm:prose-sm max-sm:text-wrap" dangerouslySetInnerHTML={{__html:html}}/> 
        <span className="sr-only">{message.state}</span>
      </div>
    </div>
  );
};
