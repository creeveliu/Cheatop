import { defineCollection, z } from "astro:content";

const sectionSchema = z.object({
  title: z.string(),
  type: z.enum(["table", "list"]),
  headers: z.array(z.string()).optional(),
  rows: z.array(z.array(z.string())).optional(),
  items: z.array(z.string()).optional(),
  note: z.string().optional()
});

const tools = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum(["CLI", "IDE", "API", "Agent"]),
    summary: z.string(),
    officialDocs: z.string().url(),
    updatedAt: z.string(),
    tags: z.array(z.string()).default([]),
    sheet: z
      .object({
        title: z.string(),
        dek: z.string(),
        pills: z.array(z.string()),
        meta: z.array(
          z.object({
            label: z.string(),
            value: z.string()
          })
        ),
        left: z.array(sectionSchema),
        right: z.array(sectionSchema),
        footer: z.array(z.string())
      })
      .optional()
  })
});

export const collections = { tools };
