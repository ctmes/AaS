import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        teaser_summary: z.string().optional(),
        // Match the Statamic fields you identified earlier
        banner_image: z.string().optional(),
        hide_nav: z.boolean().default(false),
    }),
});

export const collections = { 'pages': pages };
