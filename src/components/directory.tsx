"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  authorBySlug,
  categories,
  categoryLabel,
  checkedOn,
  githubUrl,
  type CategoryId,
  type Repo,
  type Skill,
  type Tier,
  skills,
  sortedRepos,
} from "@/data/catalog";
import { TierPill } from "@/components/tier-pill";

type View = "all" | "skills" | "repos";

const tiers: { id: Tier | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "house", label: "House" },
  { id: "vetted", label: "Vetted" },
  { id: "open", label: "Open" },
];

function isTier(value: string | null): value is Tier {
  return value === "house" || value === "vetted" || value === "open";
}

function isCategory(value: string | null): value is CategoryId {
  return categories.some((category) => category.id === value);
}

export function Directory({
  view,
  lockedTier,
  extraRepos = [],
  extraSkills = [],
}: {
  view: View;
  lockedTier?: Tier;
  extraRepos?: Repo[];
  extraSkills?: Skill[];
}) {
  const params = useSearchParams();
  const tierParam = params.get("tier");
  const categoryParam = params.get("category");
  const initialTier: Tier | "all" = lockedTier ?? (isTier(tierParam) ? tierParam : "all");
  const initialCategory: CategoryId | "all" = isCategory(categoryParam) ? categoryParam : "all";
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [tier, setTier] = useState<Tier | "all">(initialTier);
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);

  const catalog = useMemo(() => {
    const seen = new Set(sortedRepos().map((repo) => repo.github.toLowerCase()));
    const merged = [...sortedRepos()];
    for (const repo of extraRepos) {
      if (!seen.has(repo.github.toLowerCase())) merged.push(repo);
    }
    return merged;
  }, [extraRepos]);

  const skillCatalog = useMemo(() => [...skills, ...extraSkills], [extraSkills]);

  function skillsFor(slug: string) {
    return skillCatalog.filter((skill) => skill.repo === slug);
  }

  const needle = query.trim().toLowerCase();

  const repoResults = useMemo(() => {
    return catalog.filter((repo) => {
      if (tier !== "all" && repo.tier !== tier) return false;
      if (category !== "all" && !repo.categories.includes(category)) return false;
      if (!needle) return true;
      const author = authorBySlug(repo.author);
      const childSkills = skillsFor(repo.slug);
      const hay = [
        repo.name,
        repo.summary,
        repo.why,
        repo.github,
        author?.name,
        author?.org,
        ...repo.categories.map(categoryLabel),
        ...childSkills.flatMap((skill) => [skill.name, skill.summary]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [catalog, category, needle, skillCatalog, tier]);

  const skillResults = useMemo(() => {
    return skillCatalog.filter((skill) => {
      const repo = catalog.find((item) => item.slug === skill.repo);
      if (!repo) return false;
      if (tier !== "all" && repo.tier !== tier) return false;
      if (category !== "all" && !skill.categories.includes(category)) return false;
      if (!needle) return true;
      const author = authorBySlug(repo.author);
      const hay = [skill.name, skill.summary, repo.name, author?.name, ...skill.categories.map(categoryLabel)]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [catalog, category, needle, skillCatalog, tier]);

  const showRepos = view === "all" || view === "repos";
  const showSkills = view === "all" || view === "skills";

  return (
    <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <label className="flex items-center gap-3 rounded-md border border-line bg-paper-2 px-3">
        <span className="font-mono text-sm text-muted">/</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search skills, repos, people"
          className="h-11 w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted"
        />
        <span className="hidden font-mono text-[10px] tracking-widest text-muted sm:inline">SEARCH</span>
      </label>

      <div className="mt-4 flex flex-col gap-3">
        {!lockedTier && (
          <div className="flex gap-5 border-b border-line" role="group" aria-label="Shelf">
            {tiers.map((item) => (
              <FilterButton key={item.id} pressed={tier === item.id} onClick={() => setTier(item.id)}>
                {item.label}
              </FilterButton>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category">
          <Chip pressed={category === "all"} onClick={() => setCategory("all")}>
            Any job
          </Chip>
          {categories.map((item) => (
            <Chip key={item.id} pressed={category === item.id} onClick={() => setCategory(item.id)}>
              {item.label}
            </Chip>
          ))}
        </div>
      </div>

      {showRepos && (
        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Repos</h2>
            <p className="font-mono text-[11px] text-muted">{repoResults.length}</p>
          </div>
          {repoResults.length === 0 ? (
            <Empty />
          ) : (
            <div className="overflow-hidden rounded-md border border-line bg-paper">
              <div className="hidden grid-cols-[3rem_1fr_7rem_5.5rem] gap-3 border-b border-line bg-paper-2 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:grid">
                <span>#</span>
                <span>Repo</span>
                <span>Tier</span>
                <span className="text-right">Stars</span>
              </div>
              <ul>
                {repoResults.map((repo, index) => {
                  const author = authorBySlug(repo.author);
                  const listedSkills = skillsFor(repo.slug);
                  return (
                    <li key={repo.slug} className="border-b border-line last:border-b-0">
                      <div className="grid gap-3 px-4 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[3rem_1fr_7rem_5.5rem] sm:items-start">
                        <span className="font-mono text-xs text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <Link href={`/repos/${repo.slug}`} className="font-medium tracking-tight hover:text-accent">
                              {repo.name}
                            </Link>
                            <a
                              href={githubUrl(repo.github)}
                              className="font-mono text-[11px] text-muted hover:text-ink"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {repo.github}
                            </a>
                          </div>
                          <p className="mt-1 font-mono text-[11px] text-muted">
                            {author ? `${author.name} · ${author.org}` : repo.author}
                          </p>
                          <p className="mt-2 max-w-2xl text-sm leading-5 text-ink/90">{repo.summary}</p>
                          {listedSkills.length > 0 && (
                            <p className="mt-2 font-mono text-[11px] leading-5 text-muted">
                              {listedSkills.slice(0, 5).map((skill, skillIndex) => (
                                <span key={skill.slug}>
                                  {skillIndex > 0 && <span> · </span>}
                                  <Link href={`/skills/${skill.slug}`} className="hover:text-accent">
                                    {skill.name}
                                  </Link>
                                </span>
                              ))}
                              {listedSkills.length > 5 && (
                                <Link href={`/repos/${repo.slug}`} className="hover:text-accent">
                                  {" "}
                                  +{listedSkills.length - 5}
                                </Link>
                              )}
                            </p>
                          )}
                        </div>
                        <div className="sm:pt-0.5">
                          <TierPill tier={repo.tier} />
                        </div>
                        <p className="font-mono text-xs text-muted sm:text-right">
                          {repo.stars > 0 ? repo.stars.toLocaleString("en-US") : "—"}
                          <span className="mt-1 block text-[10px] tracking-wide">{checkedOn}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {showSkills && (
        <div className="mt-10">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Skills</h2>
            <p className="font-mono text-[11px] text-muted">{skillResults.length}</p>
          </div>
          {skillResults.length === 0 ? (
            <Empty />
          ) : (
            <div className="overflow-hidden rounded-md border border-line bg-paper">
              <div className="hidden grid-cols-[3rem_1fr_11rem] gap-3 border-b border-line bg-paper-2 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase sm:grid">
                <span>#</span>
                <span>Skill</span>
                <span className="text-right">Pack</span>
              </div>
              <ul>
                {skillResults.map((skill, index) => {
                  const repo = catalog.find((item) => item.slug === skill.repo);
                  return (
                    <li key={skill.slug} className="border-b border-line last:border-b-0">
                      <Link
                        href={`/skills/${skill.slug}`}
                        className="grid gap-2 px-4 py-3.5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[3rem_1fr_11rem] sm:items-center sm:gap-3"
                      >
                        <span className="font-mono text-xs text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="font-mono text-sm text-ink">{skill.name}</span>
                          <span className="mt-0.5 block truncate text-sm text-muted">{skill.summary}</span>
                        </span>
                        <span className="flex items-center gap-2 sm:justify-end">
                          {repo && <TierPill tier={repo.tier} />}
                          <span className="font-mono text-[11px] text-muted">{repo?.name}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`-mb-px border-b px-0.5 pb-2 font-mono text-[11px] tracking-[0.16em] uppercase ${
        pressed ? "border-accent text-accent" : "border-transparent text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${
        pressed ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Empty() {
  return (
    <p className="rounded-md border border-line px-4 py-8 font-mono text-sm text-muted">
      Nothing on the shelf matches that.
    </p>
  );
}
