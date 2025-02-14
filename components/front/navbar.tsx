"use client";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUser } from "@/lib/dal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/actions/useractions";

export function Navbar({ user }: { user: AuthUser | null }) {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-primary text-rose-500">
          <svg className="h-8 w-auto" viewBox="0 0 32 32">
            <path
              d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm0 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm0 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm0 2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
              fill="currentColor"
            />
          </svg>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Stays</Button>
          <Button variant="ghost">Experiences</Button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-full"
                >
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-[1.5rem] w-[1.5rem]">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-1 w-3">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="text-sm" href="/dashboard">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm" onClick={() => logout()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              className="py-1 px-3 bg-[#b41d39]
            text-white rounded-md"
              href="/login"
            >
              Login
            </Link>
          )}
          <Button variant="ghost" size="sm">
            Airbnb your home
          </Button>
        </div>
      </div>
    </nav>
  );
}
