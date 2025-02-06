import { getCategories } from "@/actions/categoryActions";
import PropertyListingForm from "@/components/back/property-form";
import React from "react";

export default async function page() {
  const categories = await getCategories();
  return (
    <div>
      <PropertyListingForm categories={categories} />
    </div>
  );
}
