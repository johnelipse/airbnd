import { getProperties } from "@/actions/propertyactions";
import { PropertyCard } from "@/components/front/property-card";
import Link from "next/link";
import React from "react";

export default async function page() {
  const properties = await getProperties();
  const roomData = properties.filter(
    (property) => property.categoryId === "67a493f70b112e00735658e0"
  );
  const iconsData = properties.filter(
    (property) => property.categoryId === "67a494230b112e00735658e1"
  );
  const trendingData = properties.filter(
    (property) => property.categoryId === "67a496f20b112e00735658ee"
  );

  return (
    <>
      <div className="container py-8">
        <div className="flex bg-[#b41d39]  px-4 py-3 rounded-t-2xl items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Trending</h1>
          <Link
            href="/trending"
            className="text-white hover:border-b-[1px] border-solid border-white transition-all ease-in delay-100"
          >
            See All items
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center bg-[#b41d39] rounded-t-2xl  px-4 py-3 justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Rooms</h1>
          <Link
            href="/rooms"
            className="text-white hover:border-b-[1px] border-solid border-white transition-all ease-in delay-100"
          >
            See All items
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {roomData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center bg-[#b41d39] rounded-t-2xl  px-4 py-3 justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Icons</h1>
          <Link
            href="/icons"
            className="text-white hover:border-b-[1px] border-solid border-white transition-all ease-in delay-100"
          >
            See All items
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {iconsData.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </>
  );
}
