import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const states = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/states" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    stateCode: z.string(),
    capital: z.string(),
    region: z.string(),
  }),
});

export const collections = { states };
