import { useState, useMemo, useEffect } from 'react';
import { format, differenceInDays, addDays, isSameDay } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarTwin } from '@/components/ui/calendar-twin';
import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Users, Loader2, MessageCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Property } from '@/data/properties';
import { getListingPriceDetails } from '@/services/hostaway';
import { parseHostawayResponse, StructuredPricingBreakdown } from '@/utils/hostawayPricing';

interface BookingWidgetProps {
  property: Property;
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);


  // Fetch calendar availability data with pricing
  const { unavailableDates, getPriceForDate, isLoading: isCalendarLoading } = useCalendar(
    property.hostawayListingId,
    { monthsAhead: 12 }
  );

  // Helper to check if a date is unavailable
  const isDateUnavailable = useMemo(() => {
    return (date: Date): boolean => {
      return unavailableDates.some((unavailableDate) => isSameDay(date, unavailableDate));
    };
  }, [unavailableDates]);

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  // Calculate dynamic pricing from calendar data
  const dynamicPricing = useMemo(() => {
    if (!checkIn || !checkOut || nights === 0) {
      return {
        nightlyPrices: [],
        subtotal: 0,
        averageNightlyRate: property.startingPrice,
        usedDynamicPricing: false,
      };
    }

    const nightlyPrices: { date: Date; price: number }[] = [];
    let currentDate = new Date(checkIn);
    let total = 0;
    let hasDynamicData = false;

    // Iterate through each night of the stay
    while (currentDate < checkOut) {
      const calendarPrice = getPriceForDate(currentDate);
      const nightPrice = calendarPrice ?? property.startingPrice;

      if (calendarPrice !== null) {
        hasDynamicData = true;
      }

      nightlyPrices.push({
        date: new Date(currentDate),
        price: nightPrice,
      });

      total += nightPrice;
      currentDate = addDays(currentDate, 1);
    }

    return {
      nightlyPrices,
      subtotal: total,
      averageNightlyRate: nights > 0 ? Math.round(total / nights) : property.startingPrice,
      usedDynamicPricing: hasDynamicData,
    };
  }, [checkIn, checkOut, nights, getPriceForDate, property.startingPrice]);

  // 1. Base Rate (Rent)
  const baseRent = dynamicPricing.subtotal;

  // 2. Extra Person Fee
  // Charge if guests > guestsIncluded
  const extraGuests = Math.max(0, guests - (property.guestsIncluded || 1));
  const extraPersonFee = extraGuests * property.priceForExtraPerson * nights;

  // 3. One-time Fees (Cleaning, Check-in)
  // 3. One-time Fees (Cleaning, Check-in)
  const cleaningFee = property.cleaningFee;
  const checkinFee = property.checkinFee;
  // Guest Channel Fee (approx 1.91% based on $40 fee for $2095 rent)
  const serviceFee = Math.round(baseRent * 0.0191);

  // 4. Discounts
  const hasWeeklyDiscount = property.weeklyDiscount && property.weeklyDiscount < 1 && nights >= 7;
  const discountMultiplier = hasWeeklyDiscount ? property.weeklyDiscount! : 1;
  // Discount usually applies to Rent + ExtraPersonFee, but let's apply to Rent for safety or Rent+Extra. Hostaway applies to Rent.
  const discountedRent = Math.round(baseRent * discountMultiplier);
  const discountAmount = baseRent - discountedRent;

  // Subtotal for Tax Calculation (Rent + Fees - Discount)
  // Taxable amount usually includes Rent, Cleaning, ExtraPerson. 
  // We'll calculate taxes on (DiscountedRent + ExtraPersonFee + CleaningFee)
  const taxableAmount = discountedRent + extraPersonFee + cleaningFee;

  // 5. Taxes
  // propertyRentTax is a percentage (e.g., 10 for 10%)
  const taxRate = property.propertyRentTax ? property.propertyRentTax / 100 : 0;
  const rentTax = taxRate > 0 ? Math.round(taxableAmount * taxRate) : 0;

  // Flat taxes
  // const stayTax = property.guestStayTax;
  // const nightlyTax = property.guestNightlyTax * nights;
  // const personNightlyTax = property.guestPerPersonPerNightTax * guests * nights;

  const totalTaxes = rentTax; // + stayTax + nightlyTax + personNightlyTax;

  // 6. Refundable Deposit
  const damageDeposit = property.refundableDamageDeposit;

  // Total
  const total = discountedRent + extraPersonFee + cleaningFee + checkinFee + serviceFee + totalTaxes + damageDeposit;

  // Validate minimum nights
  const meetsMinNights = nights >= property.minNights;



  const [apiPricing, setApiPricing] = useState<StructuredPricingBreakdown | null>(null);
  const [isPricingLoading, setIsPricingLoading] = useState(false);

  // Fetch API pricing when dates/guests change
  useEffect(() => {
    async function fetchPrice() {
      if (checkIn && checkOut && property.hostawayListingId) {
        setIsPricingLoading(true);
        try {
          const result = await getListingPriceDetails(
            property.hostawayListingId,
            checkIn,
            checkOut,
            guests
          );
          const duration = Math.max(1, differenceInDays(checkOut, checkIn));
          const parsed = parseHostawayResponse(result, duration, 'USD');
          setApiPricing(parsed);
        } catch (error) {
          console.error('Failed to fetch price details:', error);
          setApiPricing(null);
        } finally {
          setIsPricingLoading(false);
        }
      } else {
        setApiPricing(null);
      }
    }

    // Debounce slightly or just call
    const timer = setTimeout(fetchPrice, 300);
    return () => clearTimeout(timer);
  }, [checkIn, checkOut, guests, property.hostawayListingId]);


  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!checkIn || !checkOut) return;

    // Use API pricing if available, otherwise fall back to local (or block?)
    // User requested "take it from api", so we trust API.

    let breakdownToPass: any[] = [];
    let totalToPass = 0;

    if (apiPricing) {
      totalToPass = apiPricing.grandTotal;
      const nightsCount = apiPricing.nights;

      // Base
      if (apiPricing.basePrice > 0) {
        breakdownToPass.push({
          label: `$${Math.round(apiPricing.basePrice / nightsCount)} × ${nightsCount} night${nightsCount > 1 ? 's' : ''}`,
          amount: apiPricing.basePrice
        });
      }

      // Fees
      apiPricing.fees.forEach(f => breakdownToPass.push({ label: f.name, amount: f.amount }));

      // Taxes
      apiPricing.taxes.forEach(t => breakdownToPass.push({ label: t.name, amount: t.amount }));

    } else {
      // Fallback
      totalToPass = dynamicPricing.subtotal;
    }

    navigate(`/checkout/${property.slug}`, {
      state: {
        property,
        checkIn,
        checkOut,
        guests,
        // If API loaded, pass it. If not, Checkout will fetch it.
        // We pass 'pricing' object.
        pricing: apiPricing ? {
          nightlyPrices: [],
          subtotal: apiPricing.basePrice,
          averageNightlyRate: Math.round(apiPricing.basePrice / apiPricing.nights),
          total: apiPricing.grandTotal,
          breakdown: breakdownToPass
        } : undefined
      },
    });
  };

  // Display Logic: Prefer API pricing for the widget totals/breakdown
  // Display Logic: Prefer API pricing for the widget totals/breakdown
  const displayTotal = apiPricing ? apiPricing.grandTotal : 0;
  const displayBreakdown = apiPricing ? [
    ...apiPricing.fees.map(f => ({ label: f.name, amount: f.amount })),
    ...apiPricing.taxes.map(t => ({ label: t.name, amount: t.amount }))
  ] : [];

  return (
    <div className="bg-card rounded-xl shadow-elevated p-6 sticky top-24">
      {/* Dynamic Price Display */}
      <div className="mb-4">
        <span className="font-serif text-2xl font-semibold text-foreground">
          {checkIn && checkOut
            ? (isPricingLoading ? <Loader2 className="inline h-6 w-6 animate-spin" /> : `$${apiPricing ? Math.round(apiPricing.basePrice / apiPricing.nights) : dynamicPricing.averageNightlyRate}`)
            : 'Select dates'}
        </span>
        {checkIn && checkOut && <span className="text-muted-foreground"> / night</span>}
      </div>

      {/* Check-in/out times */}
      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
        <span>Check-in: {property.checkInTimeStart}:00</span>
        <span>•</span>
        <span>Check-out: {property.checkOutTime}:00</span>
      </div>

      {/* Date Selection */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal h-14 mb-4',
              !checkIn && !checkOut && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
            <div className="flex flex-col items-start flex-1 overflow-hidden">
              <span className="text-xs uppercase text-muted-foreground">Dates</span>
              <span className="truncate w-full">
                {checkIn && checkOut
                  ? `${format(checkIn, 'MMM d')} → ${format(checkOut, 'MMM d, yyyy')}`
                  : checkIn
                    ? `${format(checkIn, 'MMM d')} → Select checkout`
                    : 'Select dates'}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarTwin
            value={{ from: checkIn, to: checkOut }}
            onChange={(range) => {
              setCheckIn(range.from);
              setCheckOut(range.to);
            }}
            onComplete={() => {
              const trigger = document.querySelector('[data-state="open"]');
              if (trigger) {
                (trigger as HTMLElement).click();
              }
            }}
            disabledDates={unavailableDates}
          />
        </PopoverContent>
      </Popover>

      {/* Guest Selection */}
      <div className="mb-6">
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full justify-start text-left font-normal h-14 cursor-default px-4"
          )}
        >
          <Users className="mr-2 h-4 w-4" />
          <div className="flex flex-col items-start flex-1">
            <span className="text-xs uppercase text-muted-foreground">Guests</span>
            <span>{guests} guest{guests > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setGuests(Math.max(1, guests - 1));
              }}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              -
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setGuests(Math.min(property.sleeps, guests + 1));
              }}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>


      {/* Pricing View */}
      {checkIn && checkOut ? (
        <>
          {/* Loading State */}
          {isCalendarLoading ? (
            <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mb-2" />
              <span className="text-sm">Calculating best rates...</span>
            </div>
          ) : (
            <>
              {/* Min nights warning */}
              {!meetsMinNights && (
                <div className="mb-4 p-3 bg-destructive/10 rounded-lg text-destructive text-sm">
                  Minimum stay is {property.minNights} nights
                </div>
              )}

              {/* Pricing Breakdown */}
              {apiPricing && (
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {/* Rent */}
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      ${Math.round(apiPricing.basePrice / apiPricing.nights)} × {apiPricing.nights} night{apiPricing.nights > 1 ? 's' : ''}
                    </span>
                    <span>${apiPricing.basePrice}</span>
                  </div>

                  {/* Combined Breakdown (Fees + Taxes + Channel Fee) */}
                  {displayBreakdown.map((item, i) => (
                    <div key={`item-${i}`} className="flex justify-between text-muted-foreground">
                      <span>{item.label}</span>
                      <span>${item.amount}</span>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t mt-4">
                    <span>Total</span>
                    <span>${displayTotal}</span>
                  </div>
                </div>
              )}

              {!apiPricing && !isPricingLoading && (
                <div className="text-center text-sm text-red-500 mb-4">
                  Unable to calculate price. Please try different dates.
                </div>
              )}

              {/* Book Now Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full mb-3"
                onClick={handleBookNow}
                disabled={!meetsMinNights}
              >
                Book Now
              </Button>

              {/* Send Inquiry Button */}
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2"
                asChild
              >
                <Link to="/contact">
                  <MessageCircle className="w-4 h-4" />
                  Have a question? Message Host
                </Link>
              </Button>
            </>
          )}
        </>
      ) : (
        /* Prompt to select dates if none selected */
        <div className="text-center py-6 text-muted-foreground bg-secondary/30 rounded-lg border border-border/50 border-dashed">
          <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-20" />
          <p className="text-sm">Select check-in and check-out dates to see pricing</p>
        </div>
      )}

      {/* Best Rate Guarantee */}
      <div className="mt-4 p-3 bg-ocean/5 rounded-lg border border-ocean/20 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Book Direct & Save:</span>Our lowest rates are guaranteed here no third-party fees.
        </p>
      </div>

      {/* Cancellation Policy */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Free cancellation for a full refund if canceled at least 14 days before check-in.
        </p>
      </div>
    </div>
  );
}
