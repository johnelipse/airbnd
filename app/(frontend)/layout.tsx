import { Footer } from "@/components/front/footer";
import { Header } from "@/components/front/header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="pt-[calc(64px+56px+72px+68px)]">{children}</main>
      <Footer />
    </div>
  );
}
