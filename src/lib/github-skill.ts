import { repos } from "@/data/catalog";

const NAME = /^[A-Za-z0-9_.-]+$/;

export type ParsedSkill = {
  path: string;
  name: string;
  description: string;
};

export type ParsedRepo = {
  owner: string;
  repo: string;
  stars: number;
  defaultBranch: string;
  skills: ParsedSkill[];
};

export function parseGithubRepo(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim().replace(/\.git$/, "");
  const match = trimmed.match(
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\/.*)?$/,
  );
  if (!match) return null;
  const owner = match[1];
  const repo = match[2];
  if (!NAME.test(owner) || !NAME.test(repo)) return null;
  return { owner, repo };
}

export function alreadyListed(owner: string, repo: string) {
  const github = `${owner}/${repo}`.toLowerCase();
  return repos.some((item) => item.github.toLowerCase() === github);
}

export async function readPublicRepo(owner: string, repo: string): Promise<ParsedRepo> {
  const metaRes = await github(`/repos/${owner}/${repo}`);
  if (metaRes.status === 404) {
    throw new Error("That repository is private or does not exist. Submissions have to be public.");
  }
  if (!metaRes.ok) {
    throw new Error("GitHub did not return that repository.");
  }
  const meta = (await metaRes.json()) as {
    private?: boolean;
    stargazers_count?: number;
    default_branch?: string;
  };
  if (meta.private) {
    throw new Error("That repository is private. Submissions have to be public.");
  }
  const branch = meta.default_branch || "main";
  const treeRes = await github(`/repos/${owner}/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
  if (!treeRes.ok) {
    throw new Error("Could not read the repository files.");
  }
  const tree = (await treeRes.json()) as { tree?: { path: string; type: string }[] };
  const paths = (tree.tree ?? [])
    .filter((item) => item.type === "blob" && item.path.endsWith("SKILL.md"))
    .map((item) => item.path)
    .filter((path) => !path.includes("node_modules/"))
    .slice(0, 20);

  if (paths.length === 0) {
    throw new Error("The repository must contain a SKILL.md file.");
  }

  const skills: ParsedSkill[] = [];
  for (const path of paths) {
    const raw = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path
        .split("/")
        .map(encodeURIComponent)
        .join("/")}`,
      { headers: { "User-Agent": "gtmskills" } },
    );
    if (!raw.ok) continue;
    const text = (await raw.text()).slice(0, 8000);
    const parsed = parseSkill(text, path);
    skills.push(parsed);
  }

  if (skills.length === 0) {
    throw new Error("The repository must contain a SKILL.md file.");
  }

  return {
    owner,
    repo,
    stars: meta.stargazers_count ?? 0,
    defaultBranch: branch,
    skills,
  };
}

function parseSkill(text: string, path: string): ParsedSkill {
  const folder = path.split("/").slice(-2, -1)[0] || path.replace(/\.md$/, "");
  const fence = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = fence?.[1] ?? "";
  const name = field(block, "name") || folder;
  const description =
    field(block, "description") ||
    text
      .replace(/^---[\s\S]*?---/, "")
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("#")) ||
    "Submitted skill.";
  return {
    path,
    name: name.slice(0, 80),
    description: description.replace(/\s+/g, " ").slice(0, 280),
  };
}

function field(block: string, key: string) {
  const match = block.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!match) return "";
  let value = match[1].trim().replace(/^['"]|['"]$/g, "");
  if (value === ">" || value === "|" || value === "") {
    const lines = block.split("\n");
    const index = lines.findIndex((line) => line.startsWith(`${key}:`));
    const folded: string[] = [];
    for (const line of lines.slice(index + 1)) {
      if (!/^\s+\S/.test(line)) break;
      folded.push(line.trim());
    }
    value = folded.join(" ");
  }
  return value;
}

async function github(path: string) {
  const token = process.env.GITHUB_TOKEN;
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "gtmskills",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
}
