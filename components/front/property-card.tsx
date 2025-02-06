"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Property } from "@prisma/client";
import Link from "next/link";

export function PropertyCard({ property }: { property: Property }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Link href="" className="w-full rounded-md shadow-lg">
      <Carousel setApi={setApi} className="w-full rounded-md">
        <CarouselContent>
          {property.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[5/4]">
                <img
                  alt={property.title}
                  className="object-cover w-full h-full rounded-t-lg"
                  src={image}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 text-slate-900" />
        <CarouselNext className="right-2 text-slate-900" />
      </Carousel>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 hover:scale-110"
      >
        <Heart className="h-4 w-4" />
      </Button>
      {/* {rating > 4.9 && (
        <Badge variant="secondary" className="absolute left-3 top-3">
          Guest favorite
        </Badge>
      )} */}
      <div className="mt-2 px-3 py-3 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{property.location}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span>4.9</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {property.description}
        </p>
        <p className="text-sm text-muted-foreground">{property.propertyType}</p>
        <p className="font-medium">
          ${property.price} <span className="text-muted-foreground">night</span>
        </p>
      </div>
    </Link>
  );
}
