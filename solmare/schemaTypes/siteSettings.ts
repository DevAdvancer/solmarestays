import { defineType, defineField } from 'sanity';

export const siteSettingsSchema = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
        }),
        defineField({
            name: 'footerText',
            title: 'Footer Text',
            type: 'text',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                { name: 'email', title: 'Email', type: 'string' },
                { name: 'phone', title: 'Phone', type: 'string' },
                { name: 'address', title: 'Address', type: 'text' },
            ],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'tiktok', title: 'TikTok URL', type: 'url' },
            ],
        }),
    ],
});
