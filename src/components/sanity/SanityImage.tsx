import { urlFor } from '@/lib/sanity.client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface SanityImageProps {
    image: SanityImageSource;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

/**
 * Optimized image component using Sanity's image CDN
 * Automatically generates responsive images with proper optimization
 */
export function SanityImage({
    image,
    alt = '',
    width,
    height,
    className = '',
}: SanityImageProps) {
    if (!image) return null;

    const imageBuilder = urlFor(image);

    // Apply width/height if provided
    if (width) imageBuilder.width(width);
    if (height) imageBuilder.height(height);

    // Auto format and quality
    const imageUrl = imageBuilder.auto('format').quality(90).url();

    return (
        <img
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading="lazy"
        />
    );
}
