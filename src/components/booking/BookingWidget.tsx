import { useState } from 'react';
import { format, differenceInDays, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Property } from '@/data/properties';

interface BookingWidgetProps {
  property: Property;
}

export function BookingWidget({ property }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * property.startingPrice;
  const cleaningFee = 150;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;
    
    setIsLoading(true);
    // Simulate API call - this is where Hostaway API would be integrated
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPricing(true);
    setIsLoading(false);
  };

  const handleBookNow = () => {
    // In production, this would either:
    // 1. Complete booking via Hostaway API
    // 2. Redirect to Hostaway booking engine
    const checkInStr = checkIn ? format(checkIn, 'yyyy-MM-dd') : '';
    const checkOutStr = checkOut ? format(checkOut, 'yyyy-MM-dd') : '';
    
    // Redirect to Hostaway booking engine (placeholder URL structure)
    if (property.hostawayListingId) {
      window.open(
        `https://117087_2.holidayfuture.com/listings/${property.hostawayListingId}?checkin=${checkInStr}&checkout=${checkOutStr}&guests=${guests}`,
        '_blank'
      );
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-elevated p-6 sticky top-24">
      <div className="mb-6">
        <span className="font-serif text-2xl font-semibold text-foreground">
          ${property.startingPrice}
        </span>
        <span className="text-muted-foreground"> / night</span>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'justify-start text-left font-normal h-14',
                !checkIn && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase text-muted-foreground">Check-in</span>
                <span>{checkIn ? format(checkIn, 'MMM d, yyyy') : 'Add date'}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={(date) => {
                setCheckIn(date);
                if (date && (!checkOut || checkOut <= date)) {
                  setCheckOut(addDays(date, 1));
                }
                setShowPricing(false);
              }}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'justify-start text-left font-normal h-14',
                !checkOut && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase text-muted-foreground">Check-out</span>
                <span>{checkOut ? format(checkOut, 'MMM d, yyyy') : 'Add date'}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={(date) => {
                setCheckOut(date);
                setShowPricing(false);
              }}
              disabled={(date) => date < (checkIn ? addDays(checkIn, 1) : new Date())}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guest Selection */}
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal h-14"
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
                e.stopPropagation();
                setGuests(Math.max(1, guests - 1));
              }}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              -
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setGuests(Math.min(property.sleeps, guests + 1));
              }}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
        </Button>
      </div>

      {/* Check Availability / Book Now */}
      {!showPricing ? (
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          onClick={handleCheckAvailability}
          disabled={!checkIn || !checkOut || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Availability'
          )}
        </Button>
      ) : (
        <>
          {/* Pricing Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between text-muted-foreground">
              <span>${property.startingPrice} × {nights} nights</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Button
            variant="hero"
            size="xl"
            className="w-full"
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </>
      )}

      <p className="text-center text-sm text-muted-foreground mt-4">
        You won't be charged yet
      </p>
    </div>
  );
}
