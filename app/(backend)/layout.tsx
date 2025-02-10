import BackHeader from "@/components/back/backHeader";
import SideBar from "@/components/back/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div
        className='flex w-full min-h-screen overflow-hidden">
        <div className="flex-shrink-0'
      >
        <div className="flex-shrink-0">
          <SideBar />
        </div>

        <main className=" md:flex-grow">
          <div>
            <BackHeader />
          </div>
          <div className="pt-12">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
