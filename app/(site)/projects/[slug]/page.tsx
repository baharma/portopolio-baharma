import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/sections/case-study";
import { getProject, getProjects } from "@/lib/cms";

type Params = { slug: string };

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Params[]> {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description ?? undefined,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.description ?? undefined, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const projects = await getProjects();
  return <CaseStudy project={project} projects={projects} />;
}
