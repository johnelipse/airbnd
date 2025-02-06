"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import TextInput from "../formIniputs/text-input";
import ImageInput from "../formIniputs/image-input";
import { CategoryProps } from "@/types/type";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function CategoryForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryProps>();
  const initialImage = "/placeholder.png";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: CategoryProps) {
    data.image = imageUrl;
    data.slug = data.title.toLowerCase().replace(" ", "-");
    try {
      setLoading(true);
      const response = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        reset();
        setImageUrl(initialImage);
        toast.success("🚀 Category created successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("😒 Failed to create category");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full shadow-lg rounded-md mx-auto"
    >
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 pt-3">
          <TextInput
            register={register}
            errors={errors}
            label="Category Title"
            name="title"
          />
        </div>
        <div className="space-y-2">
          <ImageInput
            title="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
        </div>
      </CardContent>
      <CardFooter>
        {loading ? (
          <Button
            disabled
            className="w-full flex items-center justify-center gap-2"
          >
            <Loader className="animate-spin" size={20} />
            Creating...
          </Button>
        ) : (
          <Button className="w-full">Create Category</Button>
        )}
      </CardFooter>
    </form>
  );
}
