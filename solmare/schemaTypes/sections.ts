import { defineType, defineField } from 'sanity';

// Hero Section
export const heroSection = defineType({
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            type: 'string',
        }),
        defineField({
            name: 'ctaLink',
            title: 'CTA Button Link',
            type: 'string',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
        }),
    ],
});

// Text Section
export const textSection = defineType({
    name: 'textSection',
    title: 'Text Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
});

// Feature Grid
export const featureGrid = defineType({
    name: 'featureGrid',
    title: 'Feature Grid',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'icon', title: 'Icon Name', type: 'string' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'description', title: 'Description', type: 'text' },
                    ],
                },
            ],
        }),
    ],
});

// Image Section
export const imageSection = defineType({
    name: 'imageSection',
    title: 'Image Section',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
    ],
});

// FAQ Section
export const faqSection = defineType({
    name: 'faqSection',
    title: 'FAQ Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'items',
            title: 'FAQ Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', title: 'Question', type: 'string' },
                        { name: 'answer', title: 'Answer', type: 'text' },
                    ],
                },
            ],
        }),
    ],
});
