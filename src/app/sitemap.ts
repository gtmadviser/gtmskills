import type { MetadataRoute } from "next";
import { repos, skills } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gtmskills.cc";
  const staticRoutes = ["", "/skills", "/repos", "/open", "/method", "/submit", "/imprint"].map((path) => ({
    url: `${base}${path}`,
  }));
  const repoRoutes = repos.map((repo) => ({ url: `${base}/repos/${repo.slug}` }));
  const skillRoutes = skills.map((skill) => ({ url: `${base}/skills/${skill.slug}` }));
  return [...staticRoutes, ...repoRoutes, ...skillRoutes];
}
