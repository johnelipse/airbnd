import FooterBanner from "@/components/front/logBanner";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <FooterBanner />
    </div>
  );
}
