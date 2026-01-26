import { useState, useMemo } from 'react';
import { format, differenceInDays, addDays, isSameDay } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useCalendar } from '@/hooks/useCalendar';
import { CalendarTwin } from '@/components/ui/calendar-twin';
import { Button, buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Users, Loader2, MessageCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Property } from '@/data/properties';

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

  // 5. Taxes (Excluded by user request)
  // propertyRentTax is a percentage (e.g., 10 for 10%)
  // const rentTax = Math.round(taxableAmount * (property.propertyRentTax / 100));

  // Flat taxes
  // const stayTax = property.guestStayTax;
  // const nightlyTax = property.guestNightlyTax * nights;
  // const personNightlyTax = property.guestPerPersonPerNightTax * guests * nights;

  const totalTaxes = 0; // rentTax + stayTax + nightlyTax + personNightlyTax;

  // 6. Refundable Deposit
  const damageDeposit = property.refundableDamageDeposit;

  // Total
  const total = discountedRent + extraPersonFee + cleaningFee + checkinFee + serviceFee + totalTaxes + damageDeposit;

  // Validate minimum nights
  const meetsMinNights = nights >= property.minNights;



  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!checkIn || !checkOut) return;

    // Construct breakdown for the checkout page
    const breakdown = [
      {
        label: `$${dynamicPricing.averageNightlyRate} × ${nights} night${nights > 1 ? 's' : ''}`,
        amount: dynamicPricing.subtotal,
      },
    ];

    if (extraPersonFee > 0) {
      breakdown.push({
        label: `Extra guest fee`,
        amount: extraPersonFee,
      });
    }

    if (hasWeeklyDiscount) {
      breakdown.push({
        label: `Weekly discount`,
        amount: -discountAmount,
      });
    }

    if (cleaningFee > 0) {
      breakdown.push({
        label: `Cleaning Fee`,
        amount: cleaningFee,
      });
    }

    if (serviceFee > 0) {
      breakdown.push({
        label: `Guest Channel Fee`,
        amount: serviceFee,
      });
    }

    if (checkinFee > 0) {
      breakdown.push({
        label: `Check-in fee`,
        amount: checkinFee,
      });
    }

    // Taxes excluded by user request
    /*
    if (totalTaxes > 0) {
      breakdown.push({
        label: `Occupancy Tax`,
        amount: totalTaxes,
      });
    }
    */

    if (damageDeposit > 0) {
      breakdown.push({
        label: `Refundable Damage Deposit`,
        amount: damageDeposit,
      });
    }

    navigate('/checkout', {
      state: {
        property,
        checkIn,
        checkOut,
        guests,
        pricing: {
          nightlyPrices: dynamicPricing.nightlyPrices,
          subtotal: dynamicPricing.subtotal,
          averageNightlyRate: dynamicPricing.averageNightlyRate,
          total,
          breakdown,
        },
      },
    });
  };

  return (
    <div className="bg-card rounded-xl shadow-elevated p-6 sticky top-24">
      {/* Dynamic Price Display */}
      <div className="mb-4">
        <span className="font-serif text-2xl font-semibold text-foreground">
          {checkIn && checkOut && dynamicPricing.usedDynamicPricing
            ? `$${dynamicPricing.averageNightlyRate}`
            : 'Select dates'}
        </span>
        {checkIn && checkOut && <span className="text-muted-foreground"> / night</span>}
        {property.weeklyDiscount && property.weeklyDiscount < 1 && (
          <span className="ml-2 px-2 py-1 bg-ocean/10 text-ocean text-xs rounded-full font-medium">
            {Math.round((1 - property.weeklyDiscount) * 100)}% off weekly
          </span>
        )}
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
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {/* Rent */}
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    ${dynamicPricing.averageNightlyRate} × {nights} night{nights > 1 ? 's' : ''}
                  </span>
                  <span>${dynamicPricing.subtotal}</span>
                </div>

                {/* Extra Person Fee */}
                {extraPersonFee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Extra guest fee (${property.priceForExtraPerson} × {extraGuests} × {nights})</span>
                    <span>${extraPersonFee}</span>
                  </div>
                )}

                {/* Discount Bar */}
                {hasWeeklyDiscount && (
                  <div className="flex justify-between items-center text-sm bg-green-50 text-green-700 p-2 rounded-md mb-2">
                    <span>Weekly discount applied</span>
                    <span className="font-semibold">-${discountAmount}</span>
                  </div>
                )}

                {/* Fees */}
                {cleaningFee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Cleaning Fee</span>
                    <span>${cleaningFee}</span>
                  </div>
                )}

                {/* Guest Channel Fee */}
                {serviceFee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Guest Channel Fee</span>
                    <span>${serviceFee}</span>
                  </div>
                )}

                {checkinFee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Check-in fee</span>
                    <span>${checkinFee}</span>
                  </div>
                )}

                {/* Occupancy Tax - Excluded
                {totalTaxes > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Occupancy Tax</span>
                    <span>${totalTaxes}</span>
                  </div>
                )}
                */}

                {/* Damage Deposit */}
                {damageDeposit > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Refundable Damage Deposit</span>
                    <span>${damageDeposit}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>${total}</span>
              </div>

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
          <span className="font-medium text-foreground">Best Rate Guarantee:</span> Rates may be lower here than on Airbnb/Vrbo due to zero platform fees.
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
