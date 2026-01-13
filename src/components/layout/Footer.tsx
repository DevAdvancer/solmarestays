import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 48 48"
                className="w-10 h-10 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="24" cy="16" r="8" />
                <path d="M8 28 C16 24, 32 24, 40 28" />
                <path d="M6 34 C12 31, 18 37, 24 34 C30 31, 36 37, 42 34" />
                <path d="M6 40 C12 37, 18 43, 24 40 C30 37, 36 43, 42 40" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-semibold tracking-wide">
                  SOLMARÉ
                </span>
                <span className="text-xs tracking-[0.25em] opacity-70 uppercase">
                  Stays
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed max-w-xs">
              Where the Sun Meets the Sea in Style. Boutique vacation rentals on California's Central Coast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collection" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/why-choose-us" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/for-homeowners" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  For Homeowners
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Services & Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@solmarestays.com" className="hover:opacity-100 transition-opacity">
                  hello@solmarestays.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Phone className="w-4 h-4" />
                <a href="tel:+18055551234" className="hover:opacity-100 transition-opacity">
                  (805) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Avila Beach & San Luis Obispo, CA</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© {new Date().getFullYear()} Solmaré Stays. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
