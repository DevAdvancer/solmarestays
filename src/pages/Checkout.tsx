import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Calendar, Users, Shield, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Property } from '@/data/properties';
import { format } from 'date-fns';

interface CheckoutState {
  property: Property;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  pricing: {
    nightlyPrices: { date: Date; price: number }[];
    subtotal: number;
    averageNightlyRate: number;
    total: number;
    breakdown: {
      label: string;
      amount: number;
    }[];
  };
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const state = location.state as CheckoutState;

  // Redirect if no state (direct access)
  useEffect(() => {
    if (!state) {
      navigate('/collection');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { property, checkIn, checkOut, guests, pricing } = state;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically send data to backend
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title="Booking Confirmed" />
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              Booking Request Received!
            </h1>
            <p className="text-muted-foreground">
              Thank you, {formData.firstName}. We have received your request for <strong>{property.name}</strong>.
              A confirmation email has been sent to {formData.email}.
            </p>
            <div className="pt-4">
              <Button variant="hero" asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`Checkout - ${property.name}`} />
      <Header />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to={`/property/${property.slug}`}
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Property
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left Column: Form */}
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground mb-8">
                Confirm Your Booking
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any special requests or questions?"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    Complete Booking Request
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By clicking "Complete Booking Request", you agree to our Terms of Service and Privacy Policy.
                    You will not be charged yet.
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div>
              <div className="bg-card rounded-xl shadow-elevated overflow-hidden sticky top-32">
                {/* Property Header */}
                <div className="relative h-48">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h2 className="text-white font-serif text-xl font-semibold">
                      {property.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Trip Details */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-ocean mt-0.5" />
                      <div>
                        <div className="font-medium">Dates</div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(checkIn), 'MMM d, yyyy')} – {format(new Date(checkOut), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-ocean mt-0.5" />
                      <div>
                        <div className="font-medium">Guests</div>
                        <div className="text-sm text-muted-foreground">
                          {guests} guest{guests > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pb-6 border-b border-border">
                    <h3 className="font-semibold text-lg">Price details</h3>
                    {pricing.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-muted-foreground">
                        <span>{item.label}</span>
                        <span>${item.amount}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      ${pricing.total}
                    </span>
                  </div>

                  {/* Guarantee */}
                  <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-ocean" />
                    <span>Secure booking. No fees charged today.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
