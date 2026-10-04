"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Shelf" },
  { href: "/skills", label: "Skills" },
  { href: "/repos", label: "Repos" },
  { href: "/open", label: "Open" },
  { href: "/method", label: "Method" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid size-5 place-items-center bg-accent text-[11px] font-semibold text-accent-ink">
            G
          </span>
          <span className="text-sm font-medium tracking-tight whitespace-nowrap">GTM Skills</span>
        </Link>
        <nav className="flex items-center gap-x-3 text-[12px] sm:gap-x-5 sm:text-[13px]">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "text-accent" : "text-muted hover:text-ink"}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/submit"
            className="hidden rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium tracking-wide text-accent-ink uppercase hover:brightness-110 sm:inline-flex"
          >
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
}
