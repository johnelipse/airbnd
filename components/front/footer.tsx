import Link from "next/link";
import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

const footerSections = [
  {
    title: "Support",
    links: [
      "Help Center",
      "AirCover",
      "Supporting people with disabilities",
      "Cancellation options",
      "Our COVID-19 Response",
      "Report a neighborhood concern",
    ],
  },
  {
    title: "Community",
    links: ["Airbnb.org: disaster relief housing", "Combating discrimination"],
  },
  {
    title: "Hosting",
    links: [
      "Airbnb your home",
      "AirCover for Hosts",
      "Explore hosting resources",
      "Visit our community forum",
      "How to host responsibly",
    ],
  },
  {
    title: "Airbnb",
    links: [
      "Newsroom",
      "Learn about new features",
      "Letter from our founders",
      "Careers",
      "Investors",
      "Gift cards",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button className="flex items-center text-sm text-gray-800">
                <Globe className="h-5 w-5 mr-2" />
                English (US)
              </button>
              <button className="flex items-center text-sm text-gray-800">
                $ USD
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>© 2023 Airbnb, Inc. All rights reserved</p>
            <div className="mt-2 space-x-3">
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <span>·</span>
              <Link href="#" className="hover:underline">
                Terms
              </Link>
              <span>·</span>
              <Link href="#" className="hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
