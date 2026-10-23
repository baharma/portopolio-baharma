import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/cms";
import { site } from "@/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const routes = ["", "/experience", "/about", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
