"use server";
import BackHeader from "@/components/back/backHeader";
import SideBar from "@/components/back/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getAuthSesssion } from "@/lib/dal";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAuthSesssion();
  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div
        className="flex w-full min-h-screen overflow-hidden
        "
      >
        <div className="flex-shrink-0">
          <SideBar user={user} />
        </div>

        <main className=" md:flex-grow">
          <div>
            <BackHeader user={user} />
          </div>
          <div className="pt-12">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
