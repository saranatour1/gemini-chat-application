'use client'
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Icon } from '@iconify/react';
import { Button, Input } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import useNavigate from "@/hooks/useNavigate";

export default function page(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState<string>('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const nav = useNavigate()
  
  const handleSubmit =(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signIn('email',
      {email , callbackUrl:'/dashboard'},
    )
  }
  
  return (<div className="grid w-full h-full min-h-fit max-w-full py-4 px-24 justify-center items-center">
    <Card className="w-full max-w-[52rem] mt-32 p-8 ">
      <CardHeader className="w-full">
        <p className="dark flex items-center justify-center gap-x-4 text-gray-300">
        Sign in with Email <Icon icon="mdi:email" ssr={true} />
        </p>
      </CardHeader>
      <CardBody className="w-full">
        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-start justify-between gap-y-4">
        <Input type="email" label="Email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
        <Button type="submit" className="w-full" color="primary" isDisabled={!email.length}>
          sign up
        </Button>
        </form>
      </CardBody>
      <CardFooter className="flex flex-col items-start justify-between gap-y-4 w-full">
        <Button className="w-full flex items-center justify-center gap-x-2" onClick={()=>signIn('google')}>
        <Icon icon="mdi:google" ssr={true} />
        <span>google</span>
        </Button>
        <Button className="w-full flex items-center justify-center gap-x-2" onClick={()=>signIn('github')}>
          <Icon icon="mdi:github" ssr={true} /> 
          <span>Github</span>
        </Button>
      </CardFooter>
    </Card>
  </div>)
}