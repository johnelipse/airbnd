"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    linkUrl: "/anniversary-sale",
    alt: "12 Years Jumia Anniversary Sale",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    linkUrl: "/summer-collection",
    alt: "Summer Collection Now Available",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    linkUrl: "/tech-deals",
    alt: "Exclusive Tech Deals",
  },
];

export default function HeroCarousel() {
  return (
    <div className="w-full">
      <Carousel className="relative">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="w-full h-full">
                <div className="relative aspect-[12/4] overflow-hidden rounded-lg">
                  <img
                    src={banner.imageUrl}
                    alt={banner.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/30 border-0" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/30 border-0" />
      </Carousel>
    </div>
  );
}
