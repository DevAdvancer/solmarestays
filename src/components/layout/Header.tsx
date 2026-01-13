import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'The Collection' },
  { href: '/why-choose-us', label: 'Why Choose Us' },
  { href: '/for-homeowners', label: 'For Homeowners' },
  { href: '/services', label: 'Services & Partners' },
  { href: '/contact', label: 'Get In Touch' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <svg
                  viewBox="0 0 48 48"
                  className="w-10 h-10 md:w-12 md:h-12 text-primary transition-transform duration-300 group-hover:scale-105"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {/* Sun rays */}
                  <circle cx="24" cy="16" r="8" />
                  {/* Horizon line */}
                  <path d="M8 28 C16 24, 32 24, 40 28" />
                  {/* Water waves */}
                  <path d="M6 34 C12 31, 18 37, 24 34 C30 31, 36 37, 42 34" />
                  <path d="M6 40 C12 37, 18 43, 24 40 C30 37, 36 43, 42 40" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg md:text-xl font-semibold tracking-wide text-primary">
                  SOLMARÉ
                </span>
                <span className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  Stays
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Now Button */}
            <div className="flex items-center gap-4">
              <Button
                variant="book-now"
                size="default"
                className="hidden md:flex"
                asChild
              >
                <Link to="/book">Book Now</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-elevated p-6 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 text-lg font-medium rounded-lg transition-colors hover:bg-secondary ${
                      location.pathname === link.href
                        ? 'text-primary bg-secondary'
                        : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/book">Book Now</Link>
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
