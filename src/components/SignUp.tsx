"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

export const SignUp = () => {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const nav = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    flow: z.enum(["signIn", "signUp"]).default("signIn"),
  });

  type SignInValues = z.infer<typeof formSchema>;

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: SignInValues) => {
    signIn("password", { ...data, flow: flow })
      .then((req) => nav.push("/dashboard"))
      .catch((e) => {
        console.error(e);
        const title =
          flow === "signIn"
            ? "Could not sign in, did you mean to sign up?"
            : "Could not sign up, did you mean to sign in?";
        // toast({ variant: "destructive", title: title });
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
          <Form {...form}>
            <form
              className="w-full flex flex-col items-start justify-start gap-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                name="flow"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only hidden">flow</FormLabel>
                    <FormControl>
                      <Input type="hidden" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-start gap-y-2 w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" required className="transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-start gap-y-2 w-full">
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        required
                        className="transition-colors"
                        autoComplete={flow === "signIn" ? "current-password" : "new-password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" variant={`outline`}>
                submit
              </Button>
            </form>
          </Form>
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
