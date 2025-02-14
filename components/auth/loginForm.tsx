"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInput from "../formIniputs/text-input";
import PasswordInput from "../formIniputs/password-input";
import { LoginFormProps } from "@/types/type";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>();
  async function submit(data: LoginFormProps) {
    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 403) {
        setLoading(false);
        setErr("Wrong Credentials");
        toast.error("Wrong Credentials");
      } else if (res.status === 200) {
        setLoading(false);
        toast.success("Login Successful...");
        reset();
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(submit)} action="">
          <div className="space-y-2">
            <TextInput
              register={register}
              errors={errors}
              label="Email"
              name="email"
            />
          </div>
          <div className="space-y-2">
            <PasswordInput
              register={register}
              errors={errors}
              label="Password"
              name="password"
              icon={Lock}
              placeholder="password"
              //   forgotPasswordLink="/forgot-password"
            />
            {err && <span className="text-xs text-red-600">{err}</span>}
          </div>
          <div className="mt-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-[#b41d39] hover:bg-[#b41d39]"
            >
              {loading ? "Signing..." : " Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
