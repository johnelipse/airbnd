import { getSingleCat } from "@/actions/categoryActions";
import CategoryForm from "@/components/back/category-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = await getSingleCat(slug);
  return (
    <div className="max-w-md w-full pt-12 mx-auto">
      <CategoryForm initialData={cat} />
    </div>
  );
}
