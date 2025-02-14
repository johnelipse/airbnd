import Link from "next/link";

export default function FooterBanner() {
  const newYear = new Date(Date.now());
  const year = newYear.getFullYear();
  return (
    <footer className="w-full fixed bottom-0 left-0 right-0 bg-[#b41d39] py-3 px-4">
      <div className="container mx-auto flex items-center justify-between text-xs text-white">
        <div>© {year} LogoPress - All rights reserved</div>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-white hover:text-white/80 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-white hover:text-white/80 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
