'use client'
import { GoogleLogo } from "./GoogleLogo"
import { Button } from "./ui/button"
import { useAuthActions } from "@convex-dev/auth/react";
export const SignInWithGoogle =()=>{
  const { signIn } = useAuthActions();
  return(    <Button
    className="flex-1"
    variant="outline"
    type="button"
    onClick={() => void signIn("google",{redirectTo:'/dashboard'})}
  >
    <GoogleLogo className="mr-2 h-4 w-4" /> Google
  </Button>)
}