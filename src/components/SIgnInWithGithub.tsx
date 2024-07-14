'use client'
import { GitHubLogo } from "@/components/GithubIcon"
import { Button } from "@/components/ui/button"
import { useAuthActions } from "@convex-dev/auth/react";

export const SignInWithGithub = ()=>{
  const { signIn } = useAuthActions();
  return(    <Button
    className="flex-1"
    variant="outline"
    type="button"
    onClick={() => void signIn("github",{redirectTo:'/dashboard'})}
  >
    <GitHubLogo className="mr-2 h-4 w-4" /> GitHub
  </Button>)
}