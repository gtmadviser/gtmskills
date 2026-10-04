import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCommand } from "@/components/copy-command";
import { TierPill } from "@/components/tier-pill";
import {
  authorBySlug,
  categoryLabel,
  checkedOn,
  githubUrl,
  repoBySlug,
  repos,
  skillsInRepo,
} from "@/data/catalog";

export function generateStaticParams() {
  return repos.map((repo) => ({ slug: repo.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repo = repoBySlug(slug);
  if (!repo) return { title: "Repo" };
  return { title: repo.name, description: repo.summary };
}

export default async function RepoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = repoBySlug(slug);
  if (!repo) notFound();
  const author = authorBySlug(repo.author);
  const listed = skillsInRepo(repo.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <p className="text-sm text-muted">
        <Link href="/repos" className="hover:text-ink">
          Repos
        </Link>
        <span> / {repo.name}</span>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <TierPill tier={repo.tier} />
        {repo.license && <span className="text-xs uppercase tracking-[0.14em] text-muted">{repo.license}</span>}
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{repo.name}</h1>
      <p className="mt-3 text-muted">
        {author ? (
          <a href={author.url} className="hover:text-ink" target="_blank" rel="noreferrer">
            {author.name} · {author.org}
          </a>
        ) : (
          repo.author
        )}
      </p>
      <p className="mt-6 max-w-3xl text-lg leading-8">{repo.summary}</p>
      <p className="mt-4 max-w-3xl leading-7 text-muted">{repo.why}</p>

      <div className="mt-8 flex max-w-3xl flex-col gap-3">
        {repo.commands.map((command) => (
          <CopyCommand key={command.value} label={command.label} value={command.value} />
        ))}
      </div>

      <dl className="mt-8 grid max-w-3xl gap-4 rounded-md border border-line bg-paper-2 px-4 py-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">GitHub</dt>
          <dd>
            <a href={githubUrl(repo.github)} className="underline" target="_blank" rel="noreferrer">
              {repo.github}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Stars</dt>
          <dd>
            {repo.stars.toLocaleString("en-US")}
            <span className="block text-muted">{checkedOn}</span>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Jobs</dt>
          <dd>{repo.categories.map(categoryLabel).join(", ")}</dd>
        </div>
      </dl>

      {repo.homepage && (
        <p className="mt-4 text-sm">
          <a href={repo.homepage} className="underline" target="_blank" rel="noreferrer">
            {repo.homepage.replace("https://", "")}
          </a>
        </p>
      )}

      {listed.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-medium tracking-tight">Skills on this shelf</h2>
          {repo.skillCountNote && <p className="mt-2 text-sm text-muted">{repo.skillCountNote}</p>}
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {listed.map((skill) => (
              <li key={skill.slug}>
                <Link href={`/skills/${skill.slug}`} className="block py-4 hover:bg-paper-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{skill.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
