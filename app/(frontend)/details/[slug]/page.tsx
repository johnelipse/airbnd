import { getSingleProperty } from "@/actions/propertyactions";
import PropertyDetails from "@/components/front/prop-details";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getSingleProperty(slug);
  return (
    <div>
      <PropertyDetails slug={slug} />
    </div>
  );
}
