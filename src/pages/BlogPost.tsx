import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { useBlogPost } from '@/hooks/useSanityContent';
import { urlFor, SanityImageSource } from '@/lib/sanity.client';
import { Calendar, ArrowLeft, Loader2, User } from 'lucide-react';

const SITE_URL = 'https://www.solmarestays.com';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Portable Text custom components for rendering Sanity block content
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-sm text-stone-400 mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const isExternal = value.href?.startsWith('http');
      return (
        <a
          href={value.href}
          className="text-amber-800 underline underline-offset-2 hover:text-amber-900 transition-colors"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl md:text-2xl font-light text-stone-900 mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-lg font-medium text-stone-900 mt-8 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-2 border-amber-700 pl-6 my-8 text-stone-600 italic text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-stone-600 leading-relaxed mb-5">{children}</p>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || '');

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    ...(post ? [{ name: post.title, url: `${SITE_URL}/blog/${slug}` }] : []),
  ];

  // Article schema markup (JSON-LD)
  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt || '',
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author || 'Solmaré Stays',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Solmaré Stays',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blog/${slug}`,
        },
        ...(post.mainImage?.asset?.url
          ? {
              image: {
                '@type': 'ImageObject',
                url: post.mainImage.asset.url,
              },
            }
          : {}),
      }
    : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <SEO title="Post Not Found" description="The blog post you're looking for could not be found." />
        <Header />
        <div className="flex flex-col items-center justify-center py-40 px-6">
          <h1 className="text-3xl font-light text-stone-900 mb-4">Post Not Found</h1>
          <p className="text-stone-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        image={post.mainImage?.asset?.url}
        type="article"
        schema={articleSchema}
        breadcrumbs={breadcrumbs}
      />
      <Header />

      {/* Hero / Header */}
      <article>
        <header className="pt-32 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Posts
              </Link>
            </motion.div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {post.categories.map((cat: string) => (
                  <span
                    key={cat}
                    className="text-xs tracking-[0.15em] uppercase text-amber-700"
                  >
                    {cat.replace(/-/g, ' ')}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 text-sm text-stone-400"
            >
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
            </motion.div>
          </div>
        </header>

        {/* Main Image */}
        {post.mainImage?.asset && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-5xl mx-auto px-6 mb-12"
          >
            <div className="aspect-[21/9] overflow-hidden rounded-lg">
              <img
                src={urlFor(post.mainImage as SanityImageSource).width(1400).height(600).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto px-6 pb-20"
        >
          {post.body && (
            <div className="prose-stone">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Divider + back link */}
          <div className="border-t border-stone-200 mt-16 pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
