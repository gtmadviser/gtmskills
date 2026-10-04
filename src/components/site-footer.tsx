import Link from "next/link";
import { checkedOn } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[11px] tracking-wide text-muted uppercase sm:px-8">
        <p>GTM Skills · GTM Adviser · stars {checkedOn}</p>
        <div className="flex gap-4">
          <Link href="/method" className="hover:text-accent">
            Method
          </Link>
          <a href="https://www.gtmadviser.com" className="hover:text-accent" target="_blank" rel="noreferrer">
            gtmadviser.com
          </a>
        </div>
      </div>
    </footer>
  );
}
