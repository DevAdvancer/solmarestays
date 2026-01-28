import { defineType, defineField } from 'sanity';

export const pageSchema = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            description: 'SEO description for search engines',
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            of: [
                { type: 'heroSection' },
                { type: 'textSection' },
                { type: 'featureGrid' },
                { type: 'imageSection' },
                { type: 'faqSection' },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
        },
    },
});
