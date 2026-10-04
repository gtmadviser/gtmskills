"use client";

import { useState } from "react";
import Link from "next/link";

type Skill = { name: string; description: string };

type Result =
  | { ok: true; status: "listed" | "already"; owner: string; repo: string; skills: Skill[] }
  | { ok: false; error: string };

const steps = [
  "We'll fetch the SKILL.md file from your repo.",
  "The name and description are read from that file.",
  "A public, free repo is listed on the open shelf right away. Vetted is a separate reading.",
];

export function SubmitForm() {
  const [url, setUrl] = useState("");
  const [free, setFree] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, free }),
      });
      const data = (await response.json()) as Result;
      setResult(data);
    } catch {
      setResult({ ok: false, error: "The submission did not go through." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 w-full max-w-xl">
      <label className="block">
        <span className="sr-only">GitHub repository</span>
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://github.com/username/repo"
          required
          className="h-12 w-full rounded-md border border-line bg-paper-2 px-3 font-mono text-sm outline-none placeholder:text-muted focus:border-accent"
        />
      </label>
      <p className="mt-2 text-sm text-muted">The repository must contain a SKILL.md file.</p>
      <label className="mt-4 flex items-start gap-3 text-sm leading-6">
        <input
          type="checkbox"
          checked={free}
          onChange={(event) => setFree(event.target.checked)}
          className="mt-1 accent-[#b8ff4d]"
          required
        />
        <span>This repository is free to read and install. It is not a paid course.</span>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:brightness-110 disabled:opacity-60"
      >
        <GithubMark />
        {pending ? "Reading repository…" : "Submit with GitHub"}
      </button>

      {result && !result.ok && (
        <p className="mt-4 rounded-md border border-line bg-paper-2 px-3 py-3 text-sm text-ink">{result.error}</p>
      )}
      {result?.ok && (
        <div className="mt-4 rounded-md border border-accent/40 bg-paper-2 px-4 py-4">
          <p className="font-medium">
            {result.status === "already" ? "Already on the shelf." : "Listed on the open shelf."}
          </p>
          <p className="mt-1 font-mono text-sm text-muted">
            {result.owner}/{result.repo}
          </p>
          {result.skills.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm">
              {result.skills.slice(0, 8).map((skill) => (
                <li key={skill.name}>
                  <span className="font-mono text-accent">{skill.name}</span>
                  <span className="mt-0.5 block text-muted">{skill.description}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/open" className="mt-4 inline-block text-sm text-accent hover:underline">
            View the open shelf
          </Link>
        </div>
      )}

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-lg font-medium tracking-tight">What happens next?</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="font-mono text-accent">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </form>
  );
}

function GithubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.7 7.7 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
