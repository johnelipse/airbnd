"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthUser } from "@/lib/dal";

export default function BackHeader({ user }: { user: AuthUser }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <header className="fixed top-0 w-[80%] bg-white/50 z-40 backdrop-blur-lg">
      <div className="flex h-16 items-center gap-4 border-b px-4">
        <SidebarTrigger />
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle theme</span>
          <Sun className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add new</span>
        </Button>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
