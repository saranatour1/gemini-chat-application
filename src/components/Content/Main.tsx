"use client";;
import { Badge } from "@ui/badge";
import { ScrollArea } from "@ui/scroll-area";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Message } from "./Message";
import { TextForm } from "./TextForm";
import { useEffect, useRef, useState } from "react";
interface Props {
  threadId: Id<"threads">[];
}
export const Main = ({ threadId }: Props) => {
  const messages = useQuery(api.messages.messages.viewer, threadId ? { threadId: threadId[0] } : "skip");
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // make this into a hook
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    const scrollToBottom = () => {
      if (scrollArea) {
        const scrollViewport = scrollArea.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    };

    // Initial scroll (only if content is immediately available)
    if (messages && !scrollInitialized) {
      scrollToBottom();
      setScrollInitialized(true);
    }

    if (messages) {
      scrollToBottom();
      setScrollInitialized(true);
    }

    
    // Observe for dynamic content changes after initial potential scroll
    const resizeObserver = new ResizeObserver(() => {
      scrollToBottom();
    });

    if (scrollArea) {
      const scrollContent = scrollArea.querySelector('[data-radix-scroll-area-content]');
      if (scrollContent) {
        resizeObserver.observe(scrollContent);
      }
    }

    return () => resizeObserver.disconnect();
  }, [messages, threadId, scrollInitialized]);

  return (
    <main className="grid grid-cols-1 w-full max-w-3xl max-sm:max-w-lg justify-center items-center mx-auto">
      <div className="relative flex h-full min-h-[40vh] flex-col rounded-xl p-4 lg:col-span-2">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-1 mt-6">
          <ScrollArea className="w-full max-w-full h-[650px] py-8" ref={scrollAreaRef}>
            <div className="grid gap-4">
              {messages && messages.map((message, idx) => <Message message={message} key={idx} />)}
            </div>
          </ScrollArea>
        </div>
        <TextForm threadId={threadId[0]}/>
      </div>
    </main>
  );
};
