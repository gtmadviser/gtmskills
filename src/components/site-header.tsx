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
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-8">
        <Link href="/" className="mr-auto flex shrink-0 items-center gap-2.5">
          <span className="grid size-5 place-items-center bg-accent text-[11px] font-semibold text-accent-ink">
            G
          </span>
          <span className="text-sm font-medium tracking-tight whitespace-nowrap">GTM Skills</span>
        </Link>
        <Link
          href="/submit"
          className="inline-flex shrink-0 rounded-md bg-accent px-3 py-1.5 text-[12px] font-medium tracking-wide text-accent-ink uppercase hover:brightness-110"
        >
          Submit
        </Link>
        <nav className="order-3 flex w-full gap-4 overflow-x-auto pb-0.5 text-[13px] sm:order-none sm:w-auto sm:flex-1 sm:justify-end sm:overflow-visible sm:pb-0">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 ${active ? "text-accent" : "text-muted hover:text-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
