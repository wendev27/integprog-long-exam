"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Sales", href: "/" },
    { name: "About", href: "/" },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="font-bold text-lg tracking-wide">
          🧾 Office Sales System
        </h1>

        <ul className="flex gap-6 text-sm">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={cn(
                  "hover:text-yellow-300 transition-colors",
                  pathname === link.href && "text-yellow-300 font-semibold"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
