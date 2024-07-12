import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToken } from "@/hooks/useToken";
import { StreamChatGenerics } from "@/utils/types";
import { useConnectUser } from "@/hooks/useConnectUser";
import { UserResponse } from "stream-chat";

export const Test = () => {
  const { session, status } = useAuth();

  const { loading, error, token } = useToken();

  const [userToConnect,setUserToConnect] = useState<UserResponse<StreamChatGenerics>>({} as UserResponse<StreamChatGenerics>)
  useEffect(()=>{
   if(session?.user && session.user.id){
    setUserToConnect({
      id: session.user?.id || "",
      name: session.user.name || "",
      image: session.user.image || "",
      privacy_settings: {
        typing_indicators: {
          enabled: true,
        },
        read_receipts:{
          enabled:true,
        }
      },
    })
   }
   return()=>{
    setUserToConnect({} as UserResponse<StreamChatGenerics>)
   } 
  },[session])

  const chatClient = useConnectUser<StreamChatGenerics>(process.env.GOSTREAM_KEY as string, userToConnect, token);
  useEffect(()=>{
    if(chatClient){
      console.log(chatClient)
    }
  },[chatClient])

  return <></>;
};
