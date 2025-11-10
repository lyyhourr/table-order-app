"use client";

import { setAuthCookie } from "@/commons/helpers/cookie-helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { errorToast } from "@/components/ui/toast";
import api from "@/lib/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CupSoda } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  TLoginResponse,
  TLoginSchema,
} from "../_utils/login-schema";

export default function LoginForm() {
  const form = useForm<TLoginSchema>({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  async function onSubmit(payload: TLoginSchema) {
    const { success, data, message } = await api.post<TLoginResponse>(
      "/auth/login",
      payload
    );

    if (!success) {
      errorToast(message);
      return;
    }

    if (data?.token) {
      await setAuthCookie(data?.token);
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center  from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md relative shadow-xl border-border/50 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
            <div className="relative bg-primary/10 p-4 rounded-2xl">
              <CupSoda className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Login to your admin account to manage the site.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-medium">
                        Password
                      </FormLabel>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                loading={form.formState.isSubmitting}
                className="w-full "
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
