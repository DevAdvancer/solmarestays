import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

// Custom TikTok icon component (lucide-react doesn't include TikTok)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex flex-col items-start gap-1 mb-6 group">
              <div className="relative mb-2">
                <img
                  src="/logo.png"
                  alt="Solmaré Stays"
                  draggable="false"
                  className="w-32 h-32 md:w-40 md:h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                />
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
                <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/philosophy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/management" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  For Homeowners
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Guest Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@solmarestays.com" className="hover:opacity-100 transition-opacity">
                  info@solmarestays.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+18058016429" className="hover:opacity-100 transition-opacity">
                  (805) 801-6429
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Licensed & Insured | Based in Pismo Beach</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/solmarestays"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@solmarestays"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/solmarestays"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
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

        {/* Partnership Message */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-sm opacity-80 leading-relaxed max-w-2xl mx-auto">
            Interested in partnering with Solmaré? We're always open to collaborating with local businesses that share our commitment to quality and guest experience.{' '}
            <Link to="/contact" className="underline hover:opacity-100 transition-opacity font-medium">
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
