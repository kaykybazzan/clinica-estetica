import type { Project } from "@/types/content";
export const projects: Project[] = [];
export const featuredProjects = projects;
export function getProjectBySlug(slug: string){ return projects.find((item)=>item.slug===slug); }
