import { defineCollection, z } from "astro:content";

const tools = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(["CLI", "IDE", "API", "Agent"]),
    summary: z.string(),
    officialDocs: z.string().url(),
    updatedAt: z.string(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { tools };
