"use client";;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "./ui/use-toast";

const SignUp = () => {
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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: SignInValues) => {
    setSubmitting(true);
    signIn("password", { ...data, flow: flow })
      .then((req) => {
        nav.push("/dashboard")
        toast({variant:'default', title:`You have successfully ${flow === "signIn" ? 'signed in': "signed up"}!`})
      })
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
      <Card className="flex w-full flex-col justify-center space-y-6 p-6 max-w-[40rem] shadow-inner max-sm:max-w-full">
        <CardHeader className="flex flex-col space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-0">
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
                    <FormLabel>Password</FormLabel>
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
              <Button disabled={submitting} className="w-full text-white" type="submit" variant={"default"}>
                {submitting ? "submitting..":"submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center gap-y-4 p-0">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
          <Button
            className="flex items-center justify-center gap-x-4 w-full"
            variant={`outline`}
            onClick={() => void signIn("github", { redirectTo: "/dashboard" })}
          >
            <FaGithub />
            <span>GitHub</span>
          </Button>
          <Button
            className="flex items-center justify-center gap-x-4 w-full"
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
        </CardFooter>
      </Card>
  );
};

export default SignUp;
