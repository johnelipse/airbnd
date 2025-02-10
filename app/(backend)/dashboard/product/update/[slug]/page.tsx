import { getCategories } from "@/actions/categoryActions";
import { getSingleProperty } from "@/actions/propertyactions";
import PropertyListingForm from "@/components/back/property-form";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getSingleProperty(slug);
  const categories = await getCategories();
  return (
    <div>
      <PropertyListingForm initialData={property} categories={categories} />
    </div>
  );
}
