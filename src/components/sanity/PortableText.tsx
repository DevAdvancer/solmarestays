import {
    PortableText as BasePortableText,
    type PortableTextComponents,
} from '@portabletext/react';

/**
 * Custom components for rendering Portable Text
 * Defines how each block type should be displayed
 */
const components: PortableTextComponents = {
    block: {
        // Heading styles
        h1: ({ children }) => (
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-5">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-3">
                {children}
            </h4>
        ),
        // Paragraph styles
        normal: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
        ),
        // Blockquote
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-ocean pl-6 italic text-muted-foreground my-6">
                {children}
            </blockquote>
        ),
    },
    list: {
        // Bullet list
        bullet: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {children}
            </ul>
        ),
        // Numbered list
        number: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="ml-4">{children}</li>,
        number: ({ children }) => <li className="ml-4">{children}</li>,
    },
    marks: {
        // Strong/bold
        strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
        ),
        // Emphasis/italic
        em: ({ children }) => <em className="italic">{children}</em>,
        // Links
        link: ({ value, children }) => {
            const target = value?.href?.startsWith('http') ? '_blank' : undefined;
            const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={rel}
                    className="text-ocean hover:underline transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
};

interface PortableTextProps {
    value: any;
    className?: string;
}

/**
 * Render Portable Text content from Sanity
 * Uses custom styling that matches the site design
 */
export function PortableText({ value, className = '' }: PortableTextProps) {
    if (!value) return null;

    return (
        <div className={className}>
            <BasePortableText value={value} components={components} />
        </div>
    );
}
