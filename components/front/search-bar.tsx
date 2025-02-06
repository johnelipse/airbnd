"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="flex justify-center px-6 py-4">
      <div className="inline-flex items-center divide-x rounded-full border shadow-sm">
        <button className="px-6 py-3 text-sm font-medium">
          Where
          <div className="text-xs text-muted-foreground">
            Search destinations
          </div>
        </button>
        <button className="px-6 py-3 text-sm font-medium">
          Check in
          <div className="text-xs text-muted-foreground">Add dates</div>
        </button>
        <button className="px-6 py-3 text-sm font-medium">
          Check out
          <div className="text-xs text-muted-foreground">Add dates</div>
        </button>
        <button className="px-6 py-3 text-sm font-medium">
          Who
          <div className="text-xs text-muted-foreground">Add guests</div>
        </button>
        <Button size="icon" className="m-2 rounded-full bg-primary">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
