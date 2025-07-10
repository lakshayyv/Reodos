"use client";

import { SignupSchema } from "@/lib/schema";
import { SignupSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
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
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { GoogleButton } from "@/components/ui/google-button";
import { signup } from "@/actions/user.actions";
import { toast } from "sonner";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupSchemaType) => {
    setLoading(true);
    const response = await signup(values);
    if (response.error) {
      toast.error(response.error);
    }
    if (response.data) {
      toast.success(response.data.message);
      form.reset();
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen min-h-screen flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="max-w-sm space-y-5">
          <Image
            src="/reodos-logo-full.svg"
            alt="Reodos AI"
            width={100}
            height={100}
          />
          <div className="space-y-1 font-semibold">
            <h1 className="text-3xl">Create your account</h1>
            <p className="text-neutral-500">
              Join Reodos to experience effortless, AI-powered email replies —
              crafted with precision.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <div>
                <GoogleButton />
                <div className="flex items-center space-x-3">
                  <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent to-neutral-500 dark:via-neutral-700" />
                  <div className="text-neutral-500">or</div>
                  <div className="my-8 h-[1px] w-full bg-gradient-to-r from-neutral-500 to-transparent dark:via-neutral-700" />
                </div>
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe@example.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff
                                  className="text-neutral-400"
                                  size={24}
                                />
                              ) : (
                                <Eye className="text-neutral-400" size={24} />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Button disabled={loading} type="submit">
                  Signup &rarr;
                </Button>
                <div className="w-full text-center">
                  <Link
                    className="text-sm hover:text-primary"
                    href="/auth/signin"
                  >
                    Already have account?
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-1/2 bg-neutral-800"></div>
    </div>
  );
}
