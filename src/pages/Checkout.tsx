import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Calendar as CalendarIcon, Users, Shield, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Property } from '@/data/properties';
import { format, addDays, isSameDay, differenceInCalendarDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createReservation, fetchCalendar, getUnavailableDates, validateCoupon, getListingPriceDetails } from '@/services/hostaway';
import { parseHostawayResponse } from '@/utils/hostawayPricing';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { usePropertyBySlug } from '@/hooks/useProperties';
// import { calculatePrice } from '@/utils/pricing'; // Switching to API
import { HostawayCalendarDay, HostawayCoupon } from '@/types/hostaway';
import { CountrySelect } from '@/components/ui/country-select';
import { PhoneInput } from '@/components/ui/phone-input';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'; // Provide context

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

// Validation Schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  marketing: z.boolean().optional(),

  // Payment
  cardNumber: z.string().min(13, 'Card number is too short').max(19, 'Card number is too long'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvc: z.string().min(3, 'CVC is required').max(4),
  holderName: z.string().min(2, 'Card holder name is required'), // Usually same as guest, but good to have explicit or auto-filled
  billingCountry: z.string().min(2, 'Country is required'),
  billingAddress: z.string().min(5, 'Address is required'),
  billingCity: z.string().min(2, 'City is required'),
  billingZip: z.string().min(3, 'Zip/Postal code is required'),

  message: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { slug } = useParams<{ slug: string }>();
  // ... (hooks)
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const locationState = location.state as CheckoutState | null;

  // Fetch property if slug is present
  const { data: fetchedProperty, isLoading: isPropertyLoading } = usePropertyBySlug(slug || '');

  // Determined Property
  const property = locationState?.property || fetchedProperty;

  // Local state for trip details (to allow editing)
  const [checkIn, setCheckIn] = useState<Date | undefined>(locationState?.checkIn ? new Date(locationState.checkIn) : undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(locationState?.checkOut ? new Date(locationState.checkOut) : undefined);
  const [guests, setGuests] = useState<number>(locationState?.guests || 1);
  const [pricing, setPricing] = useState<CheckoutState['pricing'] | null>(locationState?.pricing || null);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const [calendarDays, setCalendarDays] = useState<HostawayCalendarDay[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<HostawayCoupon | undefined>(undefined);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Address Autofill Loading State
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  // Date range for calendar
  // Ensure we pass a valid DateRange object even if only checkIn is set, so the Calendar knows 'from' is selected.
  const dateRange: DateRange | undefined = {
    from: checkIn,
    to: checkOut,
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      marketing: false,
      billingCountry: 'US', // Default to US
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const billingZip = watch('billingZip');
  const billingCountry = watch('billingCountry');

  // Address Autofill Effect (Zippopotam.us)
  useEffect(() => {
    const fetchAddress = async () => {
      // Logic: Only fetch if we have both Country (ISO) and Zip
      if (billingCountry && billingZip && billingZip.length >= 3) {
        setIsFetchingAddress(true);
        try {
          const response = await fetch(`https://api.zippopotam.us/${billingCountry}/${billingZip}`);
          if (response.ok) {
            const data = await response.json();
            if (data.places && data.places.length > 0) {
              const place = data.places[0];
              setValue('billingCity', place['place name']);
              // Could also set state if we had a field for it
              // setValue('billingState', place['state']); 
              toast.success(`Found city: ${place['place name']}`);
            }
          }
        } catch (error) {
          // Silent fail
        } finally {
          setIsFetchingAddress(false);
        }
      }
    };

    const timeout = setTimeout(fetchAddress, 1000);
    return () => clearTimeout(timeout);
  }, [billingZip, billingCountry, setValue]);

  // Fetch calendar availability when property is loaded
  useEffect(() => {
    if (property?.hostawayListingId) {
      const fetchAvailability = async () => {
        setIsLoadingCalendar(true);
        try {
          const now = new Date();
          const nextYear = new Date();
          nextYear.setFullYear(now.getFullYear() + 1);
          const calendarData = await fetchCalendar(property.hostawayListingId, now, nextYear);
          setCalendarDays(calendarData);
          const unavailable = getUnavailableDates(calendarData);
          setUnavailableDates(unavailable);

          // Trigger price update once we have data if currently empty
          if (!pricing && checkIn && checkOut) {
            updatePricing(checkIn, checkOut, guests, appliedCoupon);
          }

        } catch (e) {
          console.error('Failed to load calendar', e);
        } finally {
          setIsLoadingCalendar(false);
        }
      };
      fetchAvailability();
    }
  }, [property?.hostawayListingId]);

  // Initial Price check if direct loaded (and defaults set)
  // Ensure we have calendar data before calculating if using local calc, otherwise use defaults
  useEffect(() => {
    if (property && !pricing && checkIn && checkOut && calendarDays.length > 0) {
      updatePricing(checkIn, checkOut, guests, appliedCoupon);
    }
  }, [property, checkIn, checkOut, guests, pricing, calendarDays.length]); // Added appliedCoupon dependency implicitly via usage but usually best to add explicitly if it changes logic

  // Redirect if no property found (after loading)
  useEffect(() => {
    if (!slug && !locationState) {
      navigate('/collection');
    }
  }, [slug, locationState, navigate]);

  // Recalculate price using Hostaway API (getListingPriceDetails V2)
  const updatePricing = async (newCheckIn: Date, newCheckOut: Date, newGuests: number, coupon?: HostawayCoupon) => {
    if (!property) return;

    setIsUpdatingPrice(true);
    try {
      // 1. Fetch detailed price from Hostaway API
      const apiResult = await getListingPriceDetails(
        property.hostawayListingId,
        newCheckIn,
        newCheckOut,
        newGuests
      );
      console.log('Price API Result:', apiResult);

      const round = (val: number) => Math.round(val);

      // 2. Map API result to our UI structure
      const nights = Math.max(1, Math.ceil((newCheckOut.getTime() - newCheckIn.getTime()) / (1000 * 60 * 60 * 24)));
      const parsed = parseHostawayResponse(apiResult, nights, 'USD');
      console.log('Parsed Pricing:', parsed);

      const subtotal = parsed.basePrice;
      const total = parsed.grandTotal;

      // Convert structured fees/taxes back to flat breakdown list for current UI
      const breakdown = [];

      // Base Rate
      if (parsed.basePrice > 0) {
        breakdown.push({ label: 'Base rate', amount: parsed.basePrice });
      }

      // Fees
      parsed.fees.forEach(fee => {
        breakdown.push({ label: fee.name, amount: fee.amount });
      });

      // Taxes
      parsed.taxes.forEach(tax => {
        breakdown.push({ label: tax.name, amount: tax.amount });
      });

      // Discount (Coupon) - Apply locally or check if API handles it?
      // Hostaway Calculate Price API usually doesn't take coupon code directly in simple endpoint
      // So we might need to apply discount locally on top of API total OR
      // if we want to be pure, we depend on API. 
      // User asked for "exact with respect to the api". 
      // If we implemented local coupon logic, we should probably apply it here 
      // UNLESS the API supports it.
      // Based on previous code, we had local logic. Let's keep applying the coupon 
      // logic locally to the result *from* the API if the API doesn't reflected it.
      // However, usually coupons reduce the base rate or total.

      // 3. Apply Coupon if present
      let finalTotal = total;
      if (coupon) {
        let rawDiscount = 0;
        if (coupon.type === 'percentage') {
          rawDiscount = total * (coupon.amount / 100);
        } else if (coupon.type === 'amount') {
          rawDiscount = coupon.amount;
        }

        const discount = round(rawDiscount);
        // Ensure we don't discount more than total
        const appliedDiscount = Math.min(discount, total);

        finalTotal = total - appliedDiscount;
        breakdown.push({ label: `Coupon (${coupon.name})`, amount: -appliedDiscount });
      }

      console.log('Calculated Breakdown:', breakdown);

      setPricing({
        nightlyPrices: [], // API doesn't always return daily breakdown in simple response, keep empty or mock
        subtotal: subtotal,
        averageNightlyRate: subtotal / Math.max(1, Math.ceil((newCheckOut.getTime() - newCheckIn.getTime()) / (1000 * 60 * 60 * 24))),
        total: finalTotal,
        breakdown: breakdown,
      });

    } catch (err) {
      console.error('Failed to update price:', err);
      toast.error('Could not update price', { description: 'Please check your dates.' });
      setPricing(null);
    } finally {
      setIsUpdatingPrice(false);
    }
  };

  const validateStayRules = (start: Date, end: Date): boolean => {
    const startStr = format(start, 'yyyy-MM-dd');
    const dayData = calendarDays.find(d => d.date === startStr);
    const nights = differenceInCalendarDays(end, start);

    if (nights < 1) return false;

    // Check for blocked dates in between
    // We iterate from start date until (end - 1 day) because checkout day can be blocked (someone else checking in)
    // unless strict gap rules apply, but usually checkout on blocked day is allowed if it's the start of the block.
    // However, safest to check if any night of stay is blocked.
    // A night is "Date X". If Date X is blocked, you can't sleep there.
    for (let i = 0; i < nights; i++) {
      const d = addDays(start, i);
      // Check if this date is in unavailableDates
      const isBlocked = unavailableDates.some(unavailable => isSameDay(d, unavailable));
      if (isBlocked) {
        toast.error('Selected dates include unavailable days', { description: 'Please choose different dates.' });
        return false;
      }
    }

    if (dayData) {
      if (dayData.minimumStay && nights < dayData.minimumStay) {
        toast.error(`Minimum stay is ${dayData.minimumStay} nights`, { description: `For check-in on ${format(start, 'MMM d')}` });
        return false;
      }

      if (dayData.maximumStay && dayData.maximumStay > 0 && nights > dayData.maximumStay) {
        toast.error(`Maximum stay is ${dayData.maximumStay} nights`, { description: `For check-in on ${format(start, 'MMM d')}` });
        return false;
      }
    }
    return true;
  };

  const handleDateSelect = async (range: DateRange | undefined) => {
    // 1. Reset if undefined
    if (!range) {
      setCheckIn(undefined);
      setCheckOut(undefined);
      return;
    }

    // 2. Handle 'from' date update
    if (range.from) {
      // If we are starting a new selection (click on start date), we set checkIn
      // We keep checkOut ONLY if it's valid with the new checkIn (after the new checkIn)
      // Standard range picker behavior usually clears 'to' if 'from' changes in a way that invalidates 'to'
      // But react-day-picker usually handles this in the 'range' object passed back.

      setCheckIn(range.from);

      // 3. Handle 'to' date
      if (range.to) {
        // Check if user is selecting the same day twice (range.to == range.from) for a 1-night stay
        // or a valid range.
        const isSame = range.from.getTime() === range.to.getTime();

        // If range.to is valid (after from)
        if (!isSame) {
          // Validate availability and rules for the full range
          const isValid = validateStayRules(range.from, range.to);
          if (isValid) {
            setCheckOut(range.to);
            updatePricing(range.from, range.to, guests, appliedCoupon);
          } else {
            // If invalid range selected, keep 'from' but clear 'to' so user can try again
            setCheckOut(undefined);
          }
        } else {
          // Same date clicked for check-out? Usually means 1 night if allowed
          // But if min stay > 1, this will be caught by validateStayRules eventually
          // For now, let's treat 1-night selection attempts as just setting CheckIn
          setCheckOut(undefined);
        }
      } else {
        // 'to' is undefined (in progress selection)
        setCheckOut(undefined);
      }
    } else {
      // Fallback
      setCheckIn(undefined);
      setCheckOut(undefined);
    }
  };

  const handleGuestChange = (newGuests: number) => {
    setGuests(newGuests);
    if (checkIn && checkOut) {
      updatePricing(checkIn, checkOut, newGuests, appliedCoupon);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    if (!property || !checkIn || !checkOut) {
      setCouponError('Please select dates first');
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError(null);
    try {
      const coupon = await validateCoupon(couponCode, Number(property.id), checkIn, checkOut);
      setAppliedCoupon(coupon);
      setCouponCode(''); // Clear input on success
      toast.success('Coupon applied!');
      // Update price with new coupon
      updatePricing(checkIn, checkOut, guests, coupon);
    } catch (err) {
      console.error(err);
      setCouponError(err instanceof Error ? err.message : 'Invalid coupon');
      setAppliedCoupon(undefined);
      // Revert price
      updatePricing(checkIn, checkOut, guests, undefined);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(undefined);
    if (checkIn && checkOut) {
      updatePricing(checkIn, checkOut, guests, undefined);
    }
  };

  if (isPropertyLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32 pb-16 px-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) return null;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!checkIn || !checkOut || !pricing) {
      toast.error('Invalid booking details');
      return;
    }

    setError(null);
    try {
      // Create reservation
      const result = await createReservation(
        property.hostawayListingId,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.billingAddress,
          city: data.billingCity,
          zipCode: data.billingZip,
          country: data.billingCountry,
          message: data.message,
        },
        {
          checkIn,
          checkOut,
          guests,
        },
        {
          cardNumber: data.cardNumber,
          expiryDate: data.expiryDate,
          cvc: data.cvc,
          holderName: data.holderName || `${data.firstName} ${data.lastName}`,
        },
        true // Validate payment
      );

      console.log('Reservation created:', result);
      setReservationId(result.reservationId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to process booking');
      toast.error('Booking failed', {
        description: err instanceof Error ? err.message : 'Please check your details and try again.'
      });
    }
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
              Thank you! Your reservation <strong>#{reservationId}</strong> for <strong>{property.name}</strong> has been created.
              A confirmation email has been sent.
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
                Finalize your booking
              </h1>

              {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Booking Failed</h4>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Details */}
                  <section className="space-y-6">
                    <h2 className="text-xl font-semibold">Enter your details</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className={errors.firstName ? 'border-destructive' : ''}
                        />
                        {errors.firstName && <span className="text-xs text-destructive">{errors.firstName.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className={errors.lastName ? 'border-destructive' : ''}
                        />
                        {errors.lastName && <span className="text-xs text-destructive">{errors.lastName.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            className="mt-1"
                            placeholder="Phone number"
                          />
                        )}
                      />
                      {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        name="marketing"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="marketing"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <label
                        htmlFor="marketing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Yes, I'd like to receive exclusive offers & promotions
                      </label>
                    </div>
                  </section>

                  <div className="h-px bg-border my-8" />

                  {/* Payment Information */}
                  <section className="space-y-6">
                    <h2 className="text-xl font-semibold">Payment Information</h2>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          {...register('cardNumber')}
                          className={errors.cardNumber ? 'border-destructive' : ''}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          onChange={(e) => {
                            // Allow alphanumeric
                            let v = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                            // Limit to 16 characters
                            if (v.length > 16) v = v.slice(0, 16);
                            // Format groups of 4
                            v = v.replace(/(.{4})(?=.)/g, '$1 ');

                            e.target.value = v;
                            register('cardNumber').onChange(e);
                          }}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          {/* Icons can go here */}
                        </div>
                      </div>
                      <p className="text-[0.8rem] text-muted-foreground mt-1">
                        Enter your 16-digit card number
                      </p>
                      {errors.cardNumber && <span className="text-xs text-destructive">{errors.cardNumber.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiration date</Label>
                        <Input
                          id="expiryDate"
                          {...register('expiryDate')}
                          placeholder="MM / YY"
                          className={errors.expiryDate ? 'border-destructive' : ''}
                          maxLength={5}
                          onChange={(e) => {
                            const inputType = (e.nativeEvent as any).inputType;
                            if (inputType && inputType.includes('delete')) {
                              register('expiryDate').onChange(e);
                              return;
                            }

                            let v = e.target.value.replace(/\D/g, '');

                            // Auto-prefix single digit months 2-9
                            if (v.length === 1 && parseInt(v) > 1) {
                              v = '0' + v;
                            }

                            // Validate Month (1-12)
                            if (v.length >= 2) {
                              const month = parseInt(v.slice(0, 2));
                              if (month === 0 || month > 12) {
                                // Reject the second digit if it creates invalid month
                                v = v.slice(0, 1);
                              }
                            }

                            if (v.length >= 2) {
                              v = v.slice(0, 2) + '/' + v.slice(2);
                            }
                            if (v.length > 5) v = v.slice(0, 5);

                            e.target.value = v;
                            register('expiryDate').onChange(e);
                          }}
                        />
                        <p className="text-[0.8rem] text-muted-foreground mt-1">
                          MM / YY (Month 01-12)
                        </p>
                        {errors.expiryDate && <span className="text-xs text-destructive">{errors.expiryDate.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">Security code</Label>
                        <Input
                          id="cvc"
                          type="password"
                          {...register('cvc')}
                          placeholder="CVC"
                          className={errors.cvc ? 'border-destructive' : ''}
                          maxLength={4}
                          onChange={(e) => {
                            // Enforce numeric only and max length
                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            register('cvc').onChange(e);
                          }}
                        />
                        <p className="text-[0.8rem] text-muted-foreground mt-1">
                          3 or 4 digits (CVV/CVC)
                        </p>
                        {errors.cvc && <span className="text-xs text-destructive">{errors.cvc.message}</span>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="holderName">Cardholder Name</Label>
                      <Input
                        id="holderName"
                        {...register('holderName')}
                        placeholder="Name on card"
                        className={errors.holderName ? 'border-destructive' : ''}
                      />
                      {errors.holderName && <span className="text-xs text-destructive">{errors.holderName.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingCountry">Country</Label>
                      <Controller
                        name="billingCountry"
                        control={control}
                        render={({ field }) => (
                          <CountrySelect
                            value={field.value}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                        )}
                      />
                      {errors.billingCountry && <span className="text-xs text-destructive">{errors.billingCountry.message}</span>}
                    </div>

                    <p className="text-xs text-muted-foreground">
                      By providing your card information, you allow Solmaré Stays to charge your card for future payments in accordance with their terms.
                    </p>

                    {/* Billing Address */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Billing Address</Label>
                        <Input
                          id="billingAddress"
                          {...register('billingAddress')}
                          className={errors.billingAddress ? 'border-destructive' : ''}
                        />
                        {errors.billingAddress && <span className="text-xs text-destructive">{errors.billingAddress.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          {...register('billingCity')}
                          className={errors.billingCity ? 'border-destructive' : ''}
                        />
                        {errors.billingCity && <span className="text-xs text-destructive">{errors.billingCity.message}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">Zip code</Label>
                        <div className="relative">
                          <Input
                            id="billingZip"
                            {...register('billingZip')}
                            className={errors.billingZip ? 'border-destructive' : ''}
                          />
                          {isFetchingAddress && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        {errors.billingZip && <span className="text-xs text-destructive">{errors.billingZip.message}</span>}
                      </div>
                    </div>
                  </section>

                  <div className="h-px bg-border my-8" />

                  {/* Special Requests */}
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Special requests (optional)</h2>
                    <p className="text-sm text-muted-foreground">
                      Let us know if you have any additional requests or comments.
                    </p>
                    <Textarea
                      {...register('message')}
                      placeholder="Your message"
                      className="min-h-[120px]"
                    />
                  </section>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : 'Finalize booking'}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By clicking on this button, I agree to the Privacy Policy and Terms of Service.
                    </p>
                  </div>
                </form>
              </Form>
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
                  {/* Cancellation Policy */}
                  <div className="space-y-2 pb-6 border-b border-border">
                    <h3 className="font-semibold">Cancellation policy</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {property.cancellationPolicy || 'Standard cancellation policy applies.'}
                    </p>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-4 pb-6 border-b border-border">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">Trip details</h3>
                    </div>

                    {/* Dates Edit Check-in/out */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="w-5 h-5 text-ocean mt-0.5" />
                        <div className="text-sm">
                          <div>
                            {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select'} – {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {checkIn && checkOut ? `${Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights` : ''}
                          </div>
                        </div>
                      </div>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="link" className="h-auto p-0 text-primary">Edit</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={checkIn}
                            selected={dateRange}
                            onSelect={handleDateSelect}
                            numberOfMonths={2}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today || unavailableDates.some(unavailable => isSameDay(date, unavailable));
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Guests Edit */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-ocean mt-0.5" />
                        <div className="text-sm">
                          {guests} guest{guests > 1 ? 's' : ''}
                        </div>
                      </div>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="link" className="h-auto p-0 text-primary">Edit</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60" align="start">
                          <div className="space-y-4">
                            <h4 className="font-medium leading-none">Guests</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Adults & Children</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleGuestChange(Math.max(1, guests - 1))}
                                  disabled={guests <= 1}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{guests}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleGuestChange(Math.min(property.sleeps, guests + 1))}
                                  disabled={guests >= property.sleeps}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Max {property.sleeps} guests</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pb-6 border-b border-border transition-opacity duration-200">
                    <h3 className="font-semibold">Price details</h3>
                    {isUpdatingPrice ? (
                      <div className="flex justify-center p-4">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : (
                      pricing?.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-muted-foreground text-sm">
                          <span>{item.label}</span>
                          <span>${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-lg block">Total</span>
                      <span className="text-xs text-muted-foreground">Due today</span>
                    </div>
                    {isUpdatingPrice ? (
                      <div className="animate-pulse h-12 w-24 bg-muted rounded" />
                    ) : (
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-primary block">
                          ${pricing?.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ${pricing?.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Coupon Code */}
                  <div className="pt-4 border-t border-border mt-4">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 text-green-700 p-3 rounded-md text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Coupon <strong>{appliedCoupon.name}</strong> applied</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="h-auto p-0 text-green-700 hover:text-green-900 hover:bg-transparent font-medium"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          variant="link"
                          className="px-0 h-auto text-primary p-0 flex items-center gap-1"
                          onClick={() => {
                            const el = document.getElementById('coupon-input-section');
                            if (el) el.classList.toggle('hidden');
                          }}
                        >
                          + Add a coupon
                        </Button>

                        <div id="coupon-input-section" className="hidden transition-all">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="h-9 text-sm"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleApplyCoupon();
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              className="h-9 px-4"
                              onClick={handleApplyCoupon}
                              disabled={!couponCode || isValidatingCoupon}
                            >
                              {isValidatingCoupon ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Apply'}
                            </Button>
                          </div>
                          {couponError && (
                            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {couponError}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Guarantee */}
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg mt-4">
                    <Shield className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold text-sm">Your payment is secure</div>
                      <div className="text-xs text-muted-foreground">Your payment is 100% secure using SSL encryption</div>
                    </div>
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
