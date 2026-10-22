import { siAngular, siDocker, siGo, siLaravel, siNodedotjs, siReact, siTypescript } from "simple-icons";

export type ToolCategory = "Frontend" | "Backend" | "Mobile" | "DevOps";

export type Tool = {
    name: string;
    category: ToolCategory;
    path: string;
    hex: string;
    gradient?: [string, string];
    darkTile?: boolean;
};

export const toolCategories: ("All" | ToolCategory)[] = ["All", "Frontend", "Backend", "Mobile", "DevOps"];

const t = (name: string, category: ToolCategory, icon: { path: string; hex: string }, extra: Partial<Tool> = {}): Tool => ({
    name,
    category,
    path: icon.path,
    hex: `#${icon.hex}`,
    ...extra,
});

export const tools: Tool[] = [
    t("React", "Frontend", siReact),
    t("Angular", "Frontend", siAngular, { gradient: ["#F6254A", "#B52E9B"] }),
    t("TypeScript", "Frontend", siTypescript),
    t("Node.js", "Backend", siNodedotjs),
    t("Golang", "Backend", siGo),
    t("Laravel", "Backend", siLaravel),
    t("React Native", "Mobile", siReact, { darkTile: true }),
    t("Docker", "DevOps", siDocker),
];
