import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { alreadyListed, parseGithubRepo, readPublicRepo } from "@/lib/github-skill";
import { loadSubmissions, saveSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { url?: string; free?: boolean } | null;
  if (!body?.free) {
    return NextResponse.json(
      { ok: false, error: "Paid courses stay off the shelf. The repository has to be free to read and install." },
      { status: 400 },
    );
  }
  const parsed = parseGithubRepo(body.url ?? "");
  if (!parsed) {
    return NextResponse.json(
      { ok: false, error: "Use a GitHub repository URL, like https://github.com/username/repo." },
      { status: 400 },
    );
  }

  if (alreadyListed(parsed.owner, parsed.repo)) {
    return NextResponse.json({
      ok: true,
      status: "already",
      owner: parsed.owner,
      repo: parsed.repo,
      skills: [],
    });
  }

  try {
    const existing = await loadSubmissions();
    const prior = existing.find((item) => item.owner === parsed.owner && item.repo === parsed.repo);
    if (prior) {
      return NextResponse.json({
        ok: true,
        status: "already",
        owner: parsed.owner,
        repo: parsed.repo,
        skills: prior.skills,
      });
    }

    const result = await readPublicRepo(parsed.owner, parsed.repo);
    await saveSubmission({
      owner: result.owner,
      repo: result.repo,
      stars: result.stars,
      submittedAt: new Date().toISOString(),
      skills: result.skills,
    });
    revalidatePath("/");
    revalidatePath("/open");
    revalidatePath("/repos");
    revalidatePath("/skills");
    return NextResponse.json({
      ok: true,
      status: "listed",
      owner: result.owner,
      repo: result.repo,
      skills: result.skills,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not read that repository.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
