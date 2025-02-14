"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordInput from "../formIniputs/password-input";
import TextInput from "../formIniputs/text-input";
import { useForm } from "react-hook-form";
import { RegisterFormProps } from "@/types/type";
import toast from "react-hot-toast";
import { useState } from "react";
import ImageInput from "../formIniputs/image-input";

export function RegisterForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>();
  const [loading, setLoading] = useState(false);
  const initialImage = "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [emailerr, setEmailerr] = useState("");

  async function onSubmit(data: RegisterFormProps) {
    data.image = imageUrl;
    try {
      setLoading(true);
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        setLoading(false);
        toast.success("❤️ account created successfully.");
        reset();
        setImageUrl(initialImage);
      } else if (res.status === 409) {
        setLoading(false);
        setEmailerr("Email exists or its not valid");
        toast.error("Email exists or its not valid");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("😒 Something went wrong");
    }
  }
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <ImageInput
              title="Profile Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="imageUploader"
            />
          </div>
          <div className="space-y-2">
            <TextInput
              register={register}
              errors={errors}
              label="Full Name"
              name="name"
            />
          </div>
          <div className="space-y-2">
            <TextInput
              register={register}
              errors={errors}
              label="Email"
              name="email"
            />
            {emailerr && (
              <span className="text-xs text-red-600">{emailerr}</span>
            )}
          </div>
          <div className="space-y-2">
            <TextInput
              type="tel"
              register={register}
              errors={errors}
              label="Phone Number"
              name="phone"
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
          </div>
          <div className="mt-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-[#b41d39] hover:bg-[#b41d39]"
            >
              {loading ? "creating..." : "create Account"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
