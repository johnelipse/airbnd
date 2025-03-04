import CategoryPage from "@/components/front/category-page";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <CategoryPage slug={slug} />
    </div>
  );
}
