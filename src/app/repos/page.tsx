import type { Metadata } from "next";
import { Suspense } from "react";
import { Directory } from "@/components/directory";

export const metadata: Metadata = {
  title: "Repos",
  description: "House, vetted, and open GTM repositories.",
};

export default function ReposPage() {
  return (
    <main className="py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Index</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Repos</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Skill packs install with one command. Tool repos are cloned. The note
          on each listing is the reason it is house, vetted, or open.
        </p>
      </div>
      <div className="mt-8">
        <Suspense fallback={<p className="px-8 text-muted">Loading repos…</p>}>
          <Directory view="repos" />
        </Suspense>
      </div>
    </main>
  );
}
