import type { CategoryId, Repo, Skill } from "@/data/catalog";
import type { ParsedSkill } from "@/lib/github-skill";
import submissions from "../../data/open-submissions.json";

export type Submission = {
  owner: string;
  repo: string;
  stars: number;
  submittedAt: string;
  skills: ParsedSkill[];
};

const FILE = "data/open-submissions.json";
const REPO = "gtmadviser/gtmskills";

export async function loadSubmissions(): Promise<Submission[]> {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${FILE}`, {
      next: { revalidate: 30 },
    });
    if (!response.ok) return localSubmissions();
    const data = (await response.json()) as Submission[];
    return Array.isArray(data) ? data : localSubmissions();
  } catch {
    return localSubmissions();
  }
}

export async function submissionEntries() {
  const list = await loadSubmissions();
  return {
    repos: list.map(toRepo),
    skills: list.flatMap(toSkills),
  };
}

export async function saveSubmission(entry: Submission) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("Submissions are not connected to GitHub yet.");
  }
  const current = await loadRemote(token);
  if (current.some((item) => item.owner === entry.owner && item.repo === entry.repo)) {
    return;
  }
  current.push(entry);
  await writeRemote(token, current, currentSha);
}

let currentSha: string | undefined;

async function loadRemote(token: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    headers: githubHeaders(token),
    cache: "no-store",
  });
  if (response.status === 404) {
    currentSha = undefined;
    return [];
  }
  if (!response.ok) {
    throw new Error("Could not read the open shelf.");
  }
  const payload = (await response.json()) as { content?: string; sha?: string };
  currentSha = payload.sha;
  const json = Buffer.from(payload.content ?? "", "base64").toString("utf8");
  const data = JSON.parse(json) as Submission[];
  return Array.isArray(data) ? data : [];
}

async function writeRemote(token: string, entries: Submission[], sha?: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
    method: "PUT",
    headers: githubHeaders(token),
    body: JSON.stringify({
      message: `List ${entries.at(-1)?.owner}/${entries.at(-1)?.repo} on the open shelf`,
      content: Buffer.from(`${JSON.stringify(entries, null, 2)}\n`).toString("base64"),
      sha,
      branch: "main",
    }),
  });
  if (!response.ok) {
    throw new Error("The skill was read, and the open shelf could not be updated.");
  }
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "User-Agent": "gtmskills",
  };
}

function localSubmissions(): Submission[] {
  return submissions as Submission[];
}

function toRepo(entry: Submission): Repo {
  const lead = entry.skills[0];
  return {
    slug: `sub-${entry.owner}-${entry.repo}`.toLowerCase(),
    name: lead?.name || entry.repo,
    github: `${entry.owner}/${entry.repo}`,
    tier: "open",
    summary: lead?.description || "Submitted skill pack.",
    why: "Submitted from a public GitHub repository. The SKILL.md was readable, so it is on the open shelf. It has not been vetted.",
    author: entry.owner,
    stars: entry.stars,
    categories: [guessCategory(`${lead?.name ?? ""} ${lead?.description ?? ""}`)],
    commands: [
      {
        label: "Install the skills",
        value: `npx skills add ${entry.owner}/${entry.repo}`,
      },
    ],
    skillCountNote: `${entry.skills.length} skill file${entry.skills.length === 1 ? "" : "s"} read from the repo.`,
  };
}

function toSkills(entry: Submission): Skill[] {
  const repo = `sub-${entry.owner}-${entry.repo}`.toLowerCase();
  return entry.skills.map((skill) => ({
    slug: `${repo}--${slugify(skill.name)}`,
    name: skill.name,
    summary: skill.description,
    repo,
    categories: [guessCategory(`${skill.name} ${skill.description}`)],
  }));
}

function guessCategory(text: string): CategoryId {
  const value = text.toLowerCase();
  if (value.includes("clay")) return "clay";
  if (value.includes("deliverab")) return "deliverability";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("icp")) return "icp";
  if (value.includes("pric") || value.includes("launch")) return "growth";
  if (value.includes("copy") || value.includes("email")) return "copy";
  if (value.includes("list") || value.includes("lead")) return "lists";
  if (value.includes("position")) return "positioning";
  return "operating-system";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
