"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/api/auth";
import { Lock, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const data = await loginUser(values);
      toast({
          variant: "success",
        title: "Login successful",
        description: "Welcome back to ExpenseWise!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
            variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-background p-8 shadow-xl animate-in fade-in duration-500">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold gradient-text font-montserrat">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="your.email@example.com"
                        {...field}
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 animated-button font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
