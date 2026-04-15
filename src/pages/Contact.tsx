import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, Send, Check, Clock } from 'lucide-react';
import { toast } from 'sonner';
import contactHeroImage from '/contact/contact.jpg';

// FAQ Data
const faqItems = [
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellation policies vary by property and season. We use Limited, Moderate, and Firm policies depending on the time of year and demand. Full cancellation terms are displayed during booking and included in your confirmation email. If you have questions about a specific reservation, contact us directly.',
  },
  {
    question: 'What is included in the price?',
    answer: 'Every stay includes professionally laundered linens, towels, toiletries, a fully equipped kitchen, WiFi, smart TV with streaming, and a digital guidebook with local recommendations. A one-time cleaning fee covers professional cleaning between stays. There are no hidden charges — the total you see at checkout is the total you pay.',
  },
  {
    question: 'What are check-in and check-out times?',
    answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM for most properties. We offer self check-in via smart lock — your unique access code is sent the day before arrival. Early check-in may be available depending on the schedule. Just message us on the morning of your arrival and we will let you know.',
  },
  {
    question: 'Is there parking?',
    answer: 'Yes, every property has dedicated parking. Most Avila Beach properties include one or two off-street spots. Our Casitas Estate in Arroyo Grande has a circular driveway that fits four vehicles with overflow available. Specific parking instructions are included in your arrival guide.',
  },
  {
    question: 'How far are your properties from the beach?',
    answer: 'Our Avila Beach properties are one to two blocks from the sand — a one to three minute walk. Our Arroyo Grande estate is about 15 minutes from Pismo Beach and 20 minutes from Avila Beach by car. Our San Luis Obispo property is 10 to 15 minutes from the nearest beach.',
  },
  {
    question: 'How do I save 15% by booking direct?',
    answer: 'When you book through our website instead of Airbnb or Vrbo, you avoid their service fees — which typically add 12 to 15% to the booking total. Our direct prices reflect this savings. We guarantee our direct rate is the best available rate for any of our properties.',
  },
  {
    question: 'Do you offer discounts for longer stays?',
    answer: 'Yes. We offer a 10% discount on stays of 7 nights or more and a 20% discount on stays of 28 nights or more. These discounts apply automatically during booking on all channels including our website.',
  },
  {
    question: 'Can I book multiple properties for a group?',
    answer: 'Absolutely. Many of our Avila Beach properties are located near each other, making them perfect for larger groups. For groups of 10 or more, our Casitas Estate in Arroyo Grande sleeps up to 14 on a private 7-acre estate. Contact us to coordinate multi-property bookings and group pricing.',
  },
  {
    question: 'Are your homes pet-friendly?',
    answer: "We welcome dogs at select properties, including The Palm House and The Pine House. A modest pet fee applies to cover additional cleaning. Look for the Pet Friendly badge on our Collection page or filter your search to find available options.",
  },
  {
    question: 'I\'m a property owner. How do I list with you?',
    answer: "We'd love to chat. Select 'List My Property' in the contact form above, or visit our For Homeowners page to learn about our management services and schedule a revenue consultation.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });

  const faqRef = useRef(null);
  const isFaqInView = useInView(faqRef, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        toast.success('Message sent successfully! We\'ll be in touch soon.');

        // Reset form after delay
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Solmaré Stays"
        description="Get in touch with Solmaré Stays. Book a vacation rental, list your property, or get guest support. Located in Avila Beach on California's Central Coast."
        schema={faqSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.solmarestays.com/' },
          { name: 'Contact', url: 'https://www.solmarestays.com/contact' },
        ]}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[35vh] lg:min-h-[40vh] flex items-center">
          <div className="absolute inset-0">
            <motion.img
              src={contactHeroImage}
              alt="California Central Coast landscape"
              className="w-full h-full object-cover object-[center_75%]"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/40 to-foreground/60" />
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-white"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Have questions about a stay, property management, or partnering with us?
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                Our local team is here to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section ref={formRef} className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-4">
                  Connect With Us
                </h2>
                <p className="text-muted-foreground mb-8">
                  We are based locally on the Central Coast and are available to assist you.
                </p>

                <div className="space-y-6">
                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Serving the Central Coast, CA
                      </p>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a href="mailto:info@solmarestays.com" className="text-muted-foreground hover:text-ocean transition-colors">
                        info@solmarestays.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href="tel:+18052426411" className="text-muted-foreground hover:text-ocean transition-colors">
                        (805) 242-6411
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 p-6 bg-primary rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-white/70" />
                    <h3 className="font-semibold text-white">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>
                      <span className="font-medium text-white">General Inquiries:</span><br />
                      Monday - Friday: 9am - 5pm PST
                    </p>
                    <p>
                      <span className="font-medium text-white">Guest Support:</span><br />
                      24/7 for current guests and emergencies
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-elevated">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Web3Forms Access Key */}
                    <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS} />

                    {/* Optional: Custom subject line */}
                    <input type="hidden" name="from_name" value="Solmaré Stays Website" />

                    {/* Anti-spam honeypot */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                            <SelectItem value="List My Property">List My Property</SelectItem>
                            <SelectItem value="Current Guest Support">Current Guest Support</SelectItem>
                            <SelectItem value="Vendor / Partnership">Vendor / Partnership</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* Hidden input for form submission */}
                        <input type="hidden" name="subject" value={formData.subject || 'Contact Form Submission'} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about how we can help you..."
                        required
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitted ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Message Sent!
                        </>
                      ) : isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="section-padding bg-secondary">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-10">
                Frequently Asked Questions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqItems.map((item, index) => (
                  <Accordion key={index} type="single" collapsible>
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-card rounded-xl px-6 border-none shadow-soft"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
                Ready to Book Your Escape?
              </h2>
              <Button variant="hero" size="xl" asChild>
                <Link to="/collection">Browse The Collection</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
