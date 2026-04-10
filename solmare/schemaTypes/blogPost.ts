import { defineType, defineField } from 'sanity';

export const blogPostSchema = defineType({
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'Short summary displayed on blog listing cards',
            validation: (Rule) => Rule.max(300),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'H4', value: 'h4' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                            description: 'Describe the image for accessibility',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    description: 'Describe the image for accessibility and SEO',
                },
            ],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            initialValue: 'Solmaré Stays',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Travel Tips', value: 'travel-tips' },
                    { title: 'Local Guide', value: 'local-guide' },
                    { title: 'Property Spotlight', value: 'property-spotlight' },
                    { title: 'Events', value: 'events' },
                    { title: 'Food & Drink', value: 'food-drink' },
                    { title: 'Outdoor Activities', value: 'outdoor-activities' },
                    { title: 'Family Travel', value: 'family-travel' },
                    { title: 'Pet Travel', value: 'pet-travel' },
                ],
            },
        }),
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Override the default title for search engines',
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            description: 'Override the excerpt for search engine meta description',
        }),
    ],
    orderings: [
        {
            title: 'Published Date (Newest)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'publishedAt',
            media: 'mainImage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle
                    ? new Date(subtitle).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })
                    : 'No date',
                media,
            };
        },
    },
});
