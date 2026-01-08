import { defineCollection, z } from 'astro:content';

const globals = defineCollection({
    type: 'data',
    schema: z.object({
        title: z.string().optional(),
    }).passthrough(),
});

const pages = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
    }).passthrough(),
});

const applications = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
    }).passthrough(),
});

const posts = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
    }).passthrough(),
});

const products = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string().optional(),
    }).passthrough(),
});

export const collections = {
    'globals': globals,
    'cms_pages': pages,
    'applications': applications,
    'posts': posts,
    'products': products,
};
