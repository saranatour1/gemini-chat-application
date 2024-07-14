'use client'
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

export const SignInWithPassword = ({
  provider,
  handleSent,
  handlePasswordReset,
}: {
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}) => {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const { isLoading, isAuthenticated } = useConvexAuth();
  const nav = useRouter();
  useEffect(() => {
    console.log(isAuthenticated,isLoading)
    if(!isLoading && isAuthenticated){
      nav.push('/dashboard')
    }
  }, [isAuthenticated,isLoading]);
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        signIn(provider ?? "password", formData)
          .then(() => {
            handleSent?.(formData.get("email") as string);
          })
          .catch((error) => {
            console.error(error);
            const title =
              flow === "signIn"
                ? "Could not sign in, did you mean to sign up?"
                : "Could not sign up, did you mean to sign in?";
            setSubmitting(false);
          });
      }}
    >
      <label htmlFor="email">Email</label>
      <Input name="email" id="email" className="mb-4" autoComplete="email" />
      <div className="flex items-center justify-between">
        <label htmlFor="password">Password</label>
        {handlePasswordReset && flow === "signIn" ? (
          <Button
            className="p-0 h-auto"
            type="button"
            variant="link"
            onClick={handlePasswordReset}
          >
            Forgot your password?
          </Button>
        ) : null}
      </div>
      <Input
        type="password"
        name="password"
        id="password"
        className="mb-4 "
        autoComplete={flow === "signIn" ? "current-password" : "new-password"}
      />
      <input name="flow" value={flow} type="hidden" />
      <Button type="submit" disabled={submitting}>
        {flow === "signIn" ? "Sign in" : "Sign up"}
      </Button>
      <Button
        variant="link"
        type="button"
        onClick={() => {
          setFlow(flow === "signIn" ? "signUp" : "signIn");
        }}
      >
        {flow === "signIn"
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </Button>
    </form>
  );
};
