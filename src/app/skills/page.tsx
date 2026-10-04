import type { Metadata } from "next";
import { Suspense } from "react";
import { Directory } from "@/components/directory";
import { submissionEntries } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Skills",
  description: "Agent skills for GTM work, from the house pack and the vetted repos.",
};

export default async function SkillsPage() {
  const submitted = await submissionEntries();
  return (
    <main className="py-10">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Index</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Skills</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Individual skills an agent can load. Each one belongs to a repo. Install the repo, or the single skill, from its page.
        </p>
      </div>
      <div className="mt-8">
        <Suspense fallback={<p className="px-8 text-muted">Loading skills…</p>}>
          <Directory view="skills" extraRepos={submitted.repos} extraSkills={submitted.skills} />
        </Suspense>
      </div>
    </main>
  );
}
