import { getSingleCat } from "@/actions/categoryActions";
import { NoProperties } from "@/components/front/no-data";
import { PropertyCard } from "@/components/front/property-card";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getSingleCat(slug);
  if (category?.properties.length === 0) {
    return <NoProperties />;
  }
  return (
    <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {category?.properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
}
