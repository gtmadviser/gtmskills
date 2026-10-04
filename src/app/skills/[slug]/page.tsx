import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCommand } from "@/components/copy-command";
import { TierPill } from "@/components/tier-pill";
import {
  authorBySlug,
  categoryLabel,
  repoBySlug,
  skillBySlug,
  skillInstall,
  skills,
} from "@/data/catalog";

export function generateStaticParams() {
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = skillBySlug(slug);
  if (!skill) return { title: "Skill" };
  return { title: skill.name, description: skill.summary };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = skillBySlug(slug);
  if (!skill) notFound();
  const repo = repoBySlug(skill.repo);
  if (!repo) notFound();
  const author = authorBySlug(repo.author);
  const single = skillInstall(skill);
  const pack = repo.commands.find((command) => command.value.startsWith("npx skills add"));

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <p className="text-sm text-muted">
        <Link href="/skills" className="hover:text-ink">
          Skills
        </Link>
        <span> / </span>
        <Link href={`/repos/${repo.slug}`} className="hover:text-ink">
          {repo.name}
        </Link>
      </p>
      <div className="mt-4">
        <TierPill tier={repo.tier} />
      </div>
      <h1 className="mt-3 font-mono text-3xl tracking-tight sm:text-5xl">{skill.name}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">{skill.summary}</p>
      <p className="mt-4 text-sm text-muted">{skill.categories.map(categoryLabel).join(" · ")}</p>

      <div className="mt-8 flex max-w-3xl flex-col gap-3">
        {single ? (
          <CopyCommand label="This skill" value={single} />
        ) : (
          <p className="text-sm text-muted">
            This skill ships as a file in the repo. Clone the pack, then point the agent at <code>{skill.name}</code>.
          </p>
        )}
        {pack && <CopyCommand label="Whole pack" value={pack.value} />}
        {!pack &&
          repo.commands.map((command) => (
            <CopyCommand key={command.value} label={command.label} value={command.value} />
          ))}
      </div>

      <section className="mt-10 max-w-3xl border-y border-line py-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">From</p>
        <p className="mt-2 text-2xl font-medium tracking-tight">
          <Link href={`/repos/${repo.slug}`} className="hover:underline">
            {repo.name}
          </Link>
        </p>
        <p className="mt-1 text-sm text-muted">
          {author ? `${author.name} · ${author.org}` : repo.author}
        </p>
        <p className="mt-3 leading-7">{repo.why}</p>
      </section>
    </main>
  );
}
