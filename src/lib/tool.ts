export const toolCategories = ["CLI", "IDE", "API", "Agent"] as const;

export type ToolCategory = (typeof toolCategories)[number];
