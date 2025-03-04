"use client";
import { PropertyCard } from "@/components/front/property-card";
import { useCategory, useSingleCategory } from "@/hooks/use-data-hook";
import React from "react";

export default function CategoryPage({ slug }: { slug: string }) {
  const { category, isLoading } = useSingleCategory(slug);
  if (isLoading) {
    return (
      <div className="max-w-3xl flex justify-center items-center mx-auto p-8">
        <p className="text-xl animate-pulse ">Loading...</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {category?.properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
}
