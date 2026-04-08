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
    answer: 'You will receive a full refund if you cancel your reservation at least 14 days prior to your scheduled check-in date.',
  },
  {
    question: 'Do you offer early check-in?',
    answer: 'We try our best to accommodate early arrivals whenever possible. Please message us on the morning of your arrival, and we will let you know if the property is ready for you early.',
  },
  {
    question: 'Are your homes pet-friendly?',
    answer: "Many of our properties welcome pets! Look for the 'Pet Friendly' badge on our Collection page or filter your search to see available options.",
  },
  {
    question: 'I\'m a property owner. How do I list with you?',
    answer: "We'd love to chat! Select 'List My Property' in the contact form above, or visit our For Homeowners page to schedule a revenue consultation.",
  },
];

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
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <motion.img
              src={contactHeroImage}
              alt="California Central Coast landscape"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
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
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-ocean" />
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
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-ocean" />
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
                    <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-ocean" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <a href="tel:+18058016429" className="text-muted-foreground hover:text-ocean transition-colors">
                        (805) 801-6429
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 p-6 bg-secondary rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-ocean" />
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">General Inquiries:</span><br />
                      Monday - Friday: 9am - 5pm PST
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Guest Support:</span><br />
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
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-10">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
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
                ))}
              </Accordion>
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
