import type { Metadata } from "next";
import Link from "next/link";
import { checkedOn } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Method",
  description: "How a GTM repo or skill gets onto gtmskills.cc.",
};

export default function MethodPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Editorial</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">How a pack gets onto the shelf.</h1>
      <div className="mt-8 space-y-6 text-[17px] leading-8">
        <p>
          This is a directory with a point of view. The job is to give a GTM agent a short list of
          context that has already been used, or that we would install on a live engagement tomorrow.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight">House</h2>
        <p>
          Packs we maintain. Today that is{" "}
          <Link href="/repos/agentic-gtm" className="underline">
            Agentic GTM
          </Link>
          , the operating system, and the{" "}
          <Link href="/repos/maps-scraper" className="underline">
            Google Maps scraper
          </Link>{" "}
          for local lists. House listings stay at the top because the site exists to put that work
          in front of other operators, next to the best free packs already in the wild.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight">Vetted</h2>
        <p>
          Free, public, and specific enough that we would load it for outbound, Clay, devtool GTM,
          or the page and offer around those jobs. Eric Nowoslawski&apos;s cold outbound system is
          the reference. ColdIQ&apos;s play library, GTM Cofounder, and Corey Haines&apos; marketing
          skills sit here for the same reason: a person can tell what the pack does, and the work
          matches a real GTM motion.
        </p>
        <p>
          Vetted is an editorial judgment: a reading of the repo and, where we have it, use in
          the work. Stars are printed as a fact from {checkedOn}. The shelf is decided by whether
          we would install the pack.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight">Open</h2>
        <p>
          Public and on-topic. We have not run the pack, or the files still describe themselves as
          templates. The Company OS starter kit lives here for that reason. Read the repo before
          you install it.
        </p>
        <h2 className="pt-4 text-2xl font-medium tracking-tight">What stays off</h2>
        <p>
          Paid courses, private client work, and repos with no SKILL.md. A submission has to be
          free to read and install. The open shelf is where a public repo appears after we can
          read its skill file. Vetted is a later decision.
        </p>
        <p>
          <Link href="/submit" className="underline">
            The submission standard
          </Link>{" "}
          is the same bar.
        </p>
      </div>
    </main>
  );
}
