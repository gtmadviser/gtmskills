import type { Metadata } from "next";
import { SubmitForm } from "@/components/submit-form";

export const metadata: Metadata = {
  title: "Submit a Skill",
  description: "Submit a public GitHub repository. We read the SKILL.md and list free packs on the open shelf.",
};

export default function SubmitPage() {
  return (
    <main className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Submit a Skill</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Share your skill by submitting your GitHub repository. We read the skill details from
          your SKILL.md file.
        </p>
      </div>
      <SubmitForm />
    </main>
  );
}
