import type { Metadata } from "next";
import { Suspense } from "react";
import { Directory } from "@/components/directory";

export const metadata: Metadata = {
  title: "Open shelf",
  description: "Public GTM repos that are on topic and not yet vetted.",
};

export default function OpenPage() {
  return (
    <main className="py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Open shelf</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Public, and not yet vouched for.</h1>
        <p className="mt-3 max-w-2xl text-muted">
          These repos are free and about GTM. They have not been run on an engagement here.
          Read them before you install.
        </p>
      </div>
      <div className="mt-8">
        <Suspense fallback={<p className="px-8 text-muted">Loading the open shelf…</p>}>
          <Directory view="repos" lockedTier="open" />
        </Suspense>
      </div>
    </main>
  );
}
