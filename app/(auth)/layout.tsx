import FooterBanner from "@/components/front/logBanner";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="px-4">{children}</div>
      <FooterBanner />
    </div>
  );
}
