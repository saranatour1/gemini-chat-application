import { FormEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { toast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
import { Id } from "../../../convex/_generated/dataModel"
import { Button } from "../ui/button"

export const SendText = ({chatId}:{chatId:Id<"channels">}) =>{
  const sendMessage = useMutation(api.messages.createMessage)
  const [message, setMessage] = useState('');
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    if(formData.get('message') && formData.get('message')?.toString().length){
      sendMessage({chatId:chatId,content:formData.get('message')?.toString()!})
      setMessage('')
    }else{
      toast({
        variant: "destructive",
        title:"uh oh! please don't send an empty message!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }
  return (
  <form onSubmit={handleSubmit} className="mt-auto w-full flex items-center justify-evenly gap-x-4 p-4 border-t">
    <Textarea className="resize-none" placeholder="Type your message here" name="message" value={message} onChange={(e)=>setMessage(e.currentTarget.value)}/>
    <Button type="submit">
      send
    </Button>
  </form>)
} 