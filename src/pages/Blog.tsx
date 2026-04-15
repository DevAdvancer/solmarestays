import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { useBlogPosts } from '@/hooks/useSanityContent';
import { urlFor } from '@/lib/sanity.client';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';

const SITE_URL = 'https://www.solmarestays.com';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const Blog = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Blog"
        description="Travel tips, local guides, and insider recommendations for California's Central Coast. Discover the best of Avila Beach, Pismo Beach, and San Luis Obispo."
        breadcrumbs={breadcrumbs}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase text-amber-700 mb-4"
          >
            Stories & Guides
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 tracking-tight mb-6"
          >
            The Solmar&eacute; Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-stone-500 max-w-2xl mx-auto"
          >
            Insider tips, local favorites, and everything you need to make the most of your Central Coast getaway.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">Unable to load blog posts. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && (!posts || posts.length === 0) && (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg mb-2">No posts yet.</p>
              <p className="text-stone-400">Check back soon for travel tips and local guides.</p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, index: number) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug?.current}`}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden rounded-lg mb-5 bg-stone-100">
                      {post.mainImage?.asset ? (
                        <img
                          src={urlFor(post.mainImage).width(800).height(500).url()}
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <Calendar className="w-12 h-12" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      {post.categories && post.categories.length > 0 && (
                        <span className="text-xs tracking-[0.15em] uppercase text-amber-700">
                          {post.categories[0].replace(/-/g, ' ')}
                        </span>
                      )}
                      {post.publishedAt && (
                        <>
                          {post.categories?.length > 0 && (
                            <span className="text-stone-300">|</span>
                          )}
                          <span className="text-xs text-stone-400">
                            {formatDate(post.publishedAt)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-medium text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 group-hover:gap-2.5 transition-all">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
