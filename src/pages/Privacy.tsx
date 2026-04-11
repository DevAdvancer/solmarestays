import { SEO } from "@/components/SEO";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { usePage } from "@/hooks/useSanityContent";
import { SanitySectionRenderer } from "@/components/sanity/SanitySectionRenderer";

const Privacy = () => {
  const { data: pageData, isLoading } = usePage('privacy');

  // Check if we have valid Sanity data with sections
  const showSanityContent = !isLoading && pageData?.sections?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={pageData?.title || "Privacy Policy"}
        description={pageData?.metaDescription || "Privacy Policy for Solmaré Stays."}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Privacy Policy', url: 'https://www.solmarestays.com/privacy' },
        ]}
      />
      <Header />
      <main className="pt-32 md:pt-36 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {showSanityContent ? (
              <>
                <h1 className="font-serif text-4xl font-semibold text-foreground mb-8">
                  {pageData.title}
                </h1>
                <SanitySectionRenderer sections={pageData.sections} />
              </>
            ) : (
              // Fallback Hardcoded Content
              <>
                <h1 className="font-serif text-4xl font-semibold text-foreground mb-8">
                  Privacy Policy for Solmaré Stays
                </h1>

                <div className="prose prose-stone max-w-none text-muted-foreground">
                  <p className="text-sm text-muted-foreground/70 mb-6 italic">Last Updated: April 10, 2026</p>

                  <p className="mb-6">
                    At Solmaré Stays ("we," "us," or "our"), we are committed to protecting the privacy of our guests, website visitors, and property owners. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at solmarestays.com and when you book or stay at one of our vacation rental properties on California's Central Coast.
                  </p>

                  <p className="mb-6">
                    By using our website or booking a stay, you consent to the practices described in this policy. If you have questions, contact us at info@solmarestays.com or (805) 242-6411.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Information We Collect</h2>
                  <p className="mb-4">We collect information in the following ways:</p>
                  <p className="mb-2"><strong className="text-foreground">Information you provide directly:</strong></p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Name, email address, phone number, and mailing address when you make a reservation or contact us</li>
                    <li>Payment information when you book through our direct booking platform (processed securely by our payment processor — we do not store full credit card numbers)</li>
                    <li>Guest details required for check-in, including the number of guests and any special requests</li>
                    <li>Messages and communications you send us via the website, email, or text</li>
                  </ul>
                  <p className="mb-2"><strong className="text-foreground">Information collected automatically:</strong></p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>IP address, browser type, operating system, and device information</li>
                    <li>Pages visited, time spent on pages, and referring URLs</li>
                    <li>Cookies and similar tracking technologies (see Cookies section below)</li>
                  </ul>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Process and manage your vacation rental reservations</li>
                    <li>Communicate with you about your booking, including confirmations, check-in instructions, and post-stay follow-ups</li>
                    <li>Provide guest support before, during, and after your stay</li>
                    <li>Send you promotional offers and updates about our properties (you may opt out at any time)</li>
                    <li>Improve our website, properties, and guest experience</li>
                    <li>Comply with legal obligations, including tax reporting and local short-term rental regulations</li>
                    <li>Prevent fraud and protect the security of our properties and guests</li>
                  </ul>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Information Sharing</h2>
                  <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li><strong className="text-foreground">Service providers</strong> who assist with property management, cleaning, maintenance, and payment processing</li>
                    <li><strong className="text-foreground">Booking platforms</strong> (Airbnb, Vrbo) when your reservation originates from those channels</li>
                    <li><strong className="text-foreground">Property owners</strong> whose homes you are staying in, limited to information necessary for your stay</li>
                    <li><strong className="text-foreground">Legal authorities</strong> when required by law, subpoena, or to protect our rights and safety</li>
                  </ul>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Cookies and Tracking</h2>
                  <p className="mb-6">
                    Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. We use essential cookies for website functionality and analytics cookies (such as Google Analytics) to understand how visitors interact with our site. You can control cookie preferences through your browser settings. Disabling cookies may limit some website functionality, such as saved search preferences.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Data Security</h2>
                  <p className="mb-6">
                    We implement industry-standard security measures to protect your personal information, including encrypted data transmission (SSL/TLS), secure payment processing, and restricted access to personal data. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Data Retention</h2>
                  <p className="mb-6">
                    We retain your personal information for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations (including tax and regulatory requirements), and resolve disputes. Reservation records are retained for a minimum of seven years for tax and accounting purposes. You may request deletion of your data at any time, subject to our legal retention obligations.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Your Privacy Rights</h2>
                  <p className="mb-4"><strong className="text-foreground">California Residents (CCPA/CPRA):</strong> You have the right to:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Know what personal information we collect, use, and disclose about you</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of the sale or sharing of your personal information (we do not sell personal information)</li>
                    <li>Not be discriminated against for exercising your privacy rights</li>
                  </ul>
                  <p className="mb-4"><strong className="text-foreground">All Users:</strong> Regardless of location, you have the right to:</p>
                  <ul className="list-disc pl-6 mb-6">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate information</li>
                    <li>Request deletion of your data (subject to legal retention requirements)</li>
                    <li>Opt out of marketing communications at any time</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>
                  <p className="mb-6">
                    To exercise any of these rights, contact us at info@solmarestays.com. We will respond within 30 days.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Third-Party Links</h2>
                  <p className="mb-6">
                    Our website may contain links to third-party websites, including booking platforms, partner businesses, and social media. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing personal information.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Children's Privacy</h2>
                  <p className="mb-6">
                    Our website and services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us at info@solmarestays.com and we will promptly delete it.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Changes to This Policy</h2>
                  <p className="mb-6">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
                  </p>

                  <h2 className="text-2xl font-serif font-medium text-foreground mt-8 mb-4">Contact Us</h2>
                  <p className="mb-6">
                    If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:<br /><br />
                    Solmaré Stays<br />
                    Email: info@solmarestays.com<br />
                    Phone: (805) 242-6411<br />
                    Website: solmarestays.com
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
