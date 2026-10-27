import Link from "next/link";
import { Suspense } from "react";
import { Directory } from "@/components/directory";
import { CopyCommand } from "@/components/copy-command";
import { skills, repos } from "@/data/catalog";
import { submissionEntries } from "@/lib/submissions";

const starts = [
  {
    href: "/repos/agentic-gtm",
    kicker: "01  House",
    title: "Run the operating system",
    body: "Fifteen published skills. Nothing sends until a person approves the plan.",
  },
  {
    href: "/repos/cold-outbound",
    kicker: "02  Eric Nowoslawski",
    title: "Stand up outbound",
    body: "Lists, copy, Smartlead, and the work that keeps the domains alive.",
  },
  {
    href: "/repos/gtm-cofounder",
    kicker: "03  Devtools",
    title: "Sell a developer product",
    body: "Brief, positioning, pricing, the first fifty users, and a launch.",
  },
];

export default async function Home() {
  const submitted = await submissionEntries();
  const houseSkills = skills.filter((skill) => repos.find((repo) => repo.slug === skill.repo)?.tier === "house").length;
  const vetted = repos.filter((repo) => repo.tier === "vetted").length;
  const open = repos.filter((repo) => repo.tier === "open").length + submitted.repos.length;

  return (
    <main>
      <section className="relative mx-auto grid w-full max-w-6xl gap-10 overflow-hidden px-5 pt-14 pb-10 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
            The vetted shelf
          </p>
          <h1 className="mt-4 text-6xl leading-[0.88] font-semibold tracking-[-0.06em] sm:text-8xl">
            GTM
            <span className="block text-accent">SKILLS</span>
          </h1>
          <div className="mt-6 max-w-xl space-y-2 text-[15px] leading-6 text-muted">
            <p>Free GitHub repos and agent skills for go-to-market.</p>
            <p>
              .md files community-approved by the{" "}
              <a
                href="https://gtmengineer.dev"
                className="text-ink underline decoration-accent/70 underline-offset-2 hover:text-accent"
              >
                GTM engineering community
              </a>
              .
            </p>
            <p>+ an open shelf for new repos and skills to be submitted. Context is king.</p>
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <CopyCommand label="Install the house pack" value="npx skills add gtmadviser/agentic-gtm" />
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line font-mono text-[11px] tracking-wide uppercase">
            <Stat label="House skills" value={houseSkills} />
            <Stat label="Vetted repos" value={vetted} />
            <Stat label="Open repos" value={open} />
          </dl>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
        {starts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-line bg-paper-2 px-4 py-4 transition-colors hover:border-accent/50"
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">{item.kicker}</p>
            <h2 className="mt-3 text-lg font-medium tracking-tight">{item.title}</h2>
            <p className="mt-1.5 text-sm leading-5 text-muted">{item.body}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto mt-14 w-full max-w-6xl px-5 sm:px-8">
        <div className="rounded-md border border-line bg-paper-2 p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-medium tracking-tight">Task success</h2>
            <a
              href="https://www.skillsbench.ai/blogs/skillsbench-1-1"
              className="font-mono text-[11px] tracking-wide text-accent uppercase hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              SkillsBench source
            </a>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted">
            SkillsBench 1.1 · 87 tasks · 18 configurations · 9,396 runs
          </p>
          <BenchBar label="Without skills" value={33.9} />
          <BenchBar label="With curated skills" value={50.5} accent />
          <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            Agents in these results
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {["Claude Code", "Codex", "Gemini CLI", "OpenHands"].map((agent) => (
              <li
                key={agent}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink"
              >
                {agent}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium">Individual skills</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                One procedure an agent can load. Copy, a list, a pricing pass.
              </p>
              <Link href="/skills" className="mt-2 inline-block font-mono text-[11px] text-accent uppercase hover:underline">
                Browse skills
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-medium">Full repos</h3>
              <p className="mt-1 text-sm leading-6 text-muted">
                Several skills plus the context they read: ICP notes, list logic, copy rules, the
                operating rhythm. That is the unit we list first.
              </p>
              <Link href="/repos" className="mt-2 inline-block font-mono text-[11px] text-accent uppercase hover:underline">
                Browse repos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-14">
        <Suspense fallback={<p className="px-8 font-mono text-sm text-muted">Loading the shelf…</p>}>
          <Directory view="repos" extraRepos={submitted.repos} extraSkills={submitted.skills} />
        </Suspense>
      </div>

    </main>
  );
}

function BenchBar({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
        <span>{label}</span>
        <span className={accent ? "font-medium text-accent" : "text-muted"}>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={accent ? "h-2 rounded-full bg-accent" : "h-2 rounded-full bg-white/35"}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-paper-2 px-3 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="mt-1 font-sans text-2xl font-medium tracking-tight text-ink normal-case">{value}</dd>
    </div>
  );
}
