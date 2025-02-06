"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CategoryBar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);

  // Update maxScroll when the component mounts or window resizes
  React.useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth
        );
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  // Update scroll position when scrolling
  const handleScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  }, []);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Scroll by a fixed amount when clicking navigation buttons
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative  border-b bg-background">
      {/* Left Shadow Gradient */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent opacity-0 transition-opacity duration-200",
          scrollPosition > 0 && "opacity-100"
        )}
      />

      {/* Left Navigation Button */}
      {scrollPosition > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full border shadow-lg transition-transform hover:scale-110"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable Categories */}
      <div
        ref={scrollContainerRef}
        className="flex w-full items-center gap-4 overflow-x-auto scroll-smooth px-4 py-4 scrollbar-hide"
      >
        {categories.map((category) => {
          const categoryPath = `/${category.slug}`;
          const isActive = pathname === categoryPath;
          return (
            <Link
              href={categoryPath}
              key={category.id}
              className={cn(
                "flex min-w-fit flex-col items-center gap-2 px-4 transition-colors",
                isActive
                  ? "border-b-[2px] border-solid border-b-black"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <img
                src={category.image as string}
                alt={category.title}
                className="h-5 w-5"
              />
              {/* <Icon className="h-6 w-6" /> */}
              <span className="text-xs">{category.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Shadow Gradient */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent opacity-0 transition-opacity duration-200",
          scrollPosition < maxScroll && "opacity-100"
        )}
      />

      {/* Right Navigation Button */}
      {scrollPosition < maxScroll && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full border shadow-lg transition-transform hover:scale-110"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
