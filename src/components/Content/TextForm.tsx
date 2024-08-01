"use client";;
import { useMutation } from "convex/react";
import { CornerDownLeft, Paperclip } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { AttachFiles } from "./AttatchFiles";
import { Microphone } from "./Microphone";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface Props {
  threadId: Id<"threads">;
}
export const TextForm = ({ threadId }: Props) => {
  const sendMessage = useMutation(api.messages.createMessage);

  const messageFormSchema = z.object({
    message: z.string().min(6, {
      message: "message too short",
    }),
    file: z.instanceof(FileList).optional(),
  });
  type MessageFormValues = z.infer<typeof messageFormSchema>;

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    mode: "onChange",
  });
  const fileRef = form.register("file");

  const handleSubmit = (data: MessageFormValues) => {
    console.log(data);
    if(data.message){
      sendMessage({threadId:threadId, content:data.message})
    }
    form.reset() // it looks like this is already been working earlier
    // form.unregister("file")
  };

  return (
    <Form {...form}>
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center p-3 pt-0">
          <AttachFiles>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 hover:cursor-pointer">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                    <FormControl>
                      <Input 
                      type="file" 
                      className="hidden"
                       {...fileRef} />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AttachFiles>
          <Microphone />
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>

        </div>
      </form>
    </Form>
  );
};
