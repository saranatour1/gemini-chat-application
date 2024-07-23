"use client";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export const SignUp = () => {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const nav = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    e.currentTarget.checkValidity()
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password")!.toString();

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Do not leave empty fields!",
        action: <ToastAction altText="undo">Undo</ToastAction>,
      });
      setSubmitting(false);
      return;
    }

    signIn("password", formData)
      .then((req) => nav.push("/dashboard"))
      .catch((e) => {
        console.error(e);
        const title =
          flow === "signIn"
            ? "Could not sign in, did you mean to sign up?"
            : "Could not sign up, did you mean to sign in?";
        toast({ variant: "destructive", title: title });
        setSubmitting(false);
      });
  };

  return (
    <div className="w-full h-full max-h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="lg:p-8">
        <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
          </div>
          <form className="w-full flex flex-col items-start justify-start gap-y-4" onSubmit={handleSubmit}>
            <input type="hidden" value={flow} name="flow" />
            <Label className="flex flex-col items-start justify-start gap-y-2 w-full">
              <span>Email</span>
              <Input name="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required className=" invalid:border-red-600 transition-colors"/>
            </Label>
            <Label className="flex flex-col items-start justify-start gap-y-2 w-full">
              <span>Password</span>
              <Input
                name="password"
                type="password"
                autoComplete={flow === "signIn" ? "current-password" : "new-password"}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                className=" invalid:border-red-600 transition-colors"
              />
            </Label>
            <Button className="w-full" type="submit" variant={`outline`}>
              submit
            </Button>
          </form>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
          <Button
            className="flex items-center justify-center gap-x-4"
            variant={`outline`}
            onClick={() => void signIn("github", { redirectTo: "/dashboard" })}
          >
            <FaGithub />
            <span>GitHub</span>
          </Button>
          <Button
            className="flex items-center justify-center gap-x-4"
            variant={`outline`}
            onClick={() => void signIn("google", { redirectTo: "/dashboard" })}
          >
            <FaGoogle />
            <span>Google</span>
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => {
              setFlow(flow === "signIn" ? "signUp" : "signIn");
            }}
          >
            {flow === "signIn" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </Card>
      </div>
    </div>
  );
};
