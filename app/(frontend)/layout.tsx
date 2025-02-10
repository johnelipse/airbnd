import { Footer } from "@/components/front/footer";
import { Header } from "@/components/front/header";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="pt-[8.5rem] px-4 md:px-6">{children}</main>
      <Footer />
    </div>
  );
}
