// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    issue_number: z.number(),
  }),
});
const issuesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    issue_number: z.number(),
  }),
});

const cardsCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    art: z.string(),
    card_path: z.string().optional(),
    issue_path: z.string().optional(),
    type: z.enum(["holo", "holo-full", "tip", "normal"]).default("normal"),
    featured: z.boolean().default(false),               // <-- enables Featured filter
    priority: z.number().optional(),                    // <-- lets you sort featured
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  articles: articlesCollection,
  issues: issuesCollection,
  cards: cardsCollection,
};
