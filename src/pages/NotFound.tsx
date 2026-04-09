import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Page Not Found" />
      <Header />
      <main className="flex items-center justify-center py-32 md:py-40">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="font-serif text-6xl font-semibold text-foreground mb-4">404</h1>
          <p className="font-serif text-2xl text-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="text-primary font-medium hover:text-primary/90 transition-colors underline underline-offset-4"
            >
              Return Home
            </Link>
            <Link
              to="/collection"
              className="text-primary font-medium hover:text-primary/90 transition-colors underline underline-offset-4"
            >
              Browse Collection
            </Link>
            <Link
              to="/contact"
              className="text-primary font-medium hover:text-primary/90 transition-colors underline underline-offset-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
