import { HostawayListing, HostawayListingsResponse, HostawayCalendarDay, HostawayCalendarResponse, HostawayCoupon, HostawayCouponsResponse, HostawayReviewsResponse, HostawayReview } from '@/types/hostaway';
import { Property } from '@/data/properties';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_HOSTAWAY_API_URL || 'https://api.hostaway.com/v1';
const API_TOKEN = import.meta.env.VITE_HOSTAWAY_API_TOKEN;

/**
 * Generate a URL-friendly slug from a property name
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate unit type description based on bedroom count
 */
function getUnitType(bedroomsNumber: number | null): string {
  if (bedroomsNumber === null || bedroomsNumber === 0) {
    return 'Studio Bungalow';
  }
  const bedroomWord = bedroomsNumber === 1 ? 'One Bedroom' :
    bedroomsNumber === 2 ? 'Two Bedroom' :
      bedroomsNumber === 3 ? 'Three Bedroom' :
        bedroomsNumber === 4 ? 'Four Bedroom' :
          `${bedroomsNumber} Bedroom`;
  return `${bedroomWord} House`;
}

/**
 * Convert square meters to square feet
 */
function squareMetersToFeet(meters: number): number {
  return Math.round(meters * 10.764);
}

/**
 * Extract guidebook URL from custom field values
 */
function extractGuidebookUrl(customFieldValues: HostawayListing['customFieldValues']): string | null {
  const guidebookField = customFieldValues?.find(
    (field) => field.customField?.name?.toLowerCase() === 'guidebook'
  );
  return guidebookField?.value || null;
}

/**
 * Transform Hostaway listing to Property interface
 */
function transformListing(listing: HostawayListing): Property {
  // Get images from API
  const images = listing.listingImages
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => ({
      src: img.url,
      alt: img.airbnbCaption || listing.name,
    }));

  // Get the first image as the main thumbnail
  const mainImage = images.length > 0 ? images[0].src : listing.thumbnailUrl;

  // Extract amenity names (show all, not limited)
  const amenities = listing.listingAmenities.map((a) => a.amenityName);

  const transformed = {
    // Basic info
    id: String(listing.id),
    slug: String(listing.id),
    name: listing.name,
    location: listing.city,
    unitType: listing.bookingcomPropertyRoomName || getUnitType(listing.bedroomsNumber),
    description: listing.description,

    // Capacity & layout
    sleeps: listing.personCapacity,
    bedrooms: listing.bedroomsNumber ?? 0,
    bathrooms: listing.bathroomsNumber,
    bedsNumber: listing.bedsNumber,
    squareFeet: squareMetersToFeet(listing.squareMeters),

    // Pricing
    startingPrice: listing.price,
    cleaningFee: listing.cleaningFee,
    weeklyDiscount: listing.weeklyDiscount,

    // Images
    image: mainImage,
    images: images.length > 0 ? images : [{ src: mainImage, alt: listing.name }],

    // Amenities
    amenities,

    // Policies & rules
    houseRules: listing.houseRules,
    cancellationPolicy: listing.cancellationPolicy,
    minNights: listing.minNights,
    maxNights: listing.maxNights,

    // Check-in/out
    checkInTimeStart: listing.checkInTimeStart,
    checkInTimeEnd: listing.checkInTimeEnd,
    checkOutTime: listing.checkOutTime,

    // Location
    lat: listing.lat,
    lng: listing.lng,
    address: listing.publicAddress || listing.address || `${listing.street}, ${listing.city}`,

    // Reviews
    // Note: Hostaway sometimes returns 0-10 or 0-5. Inspecting value.
    averageReviewRating: listing.averageReviewRating ? listing.averageReviewRating : null,

    // External links
    hostawayListingId: String(listing.id),
    airbnbListingUrl: listing.airbnbListingUrl,
    vrboListingUrl: listing.vrboListingUrl,

    // Guidebook
    guidebookUrl: extractGuidebookUrl(listing.customFieldValues),

    // Additional fees and taxes
    checkinFee: listing.checkinFee,
    priceForExtraPerson: listing.priceForExtraPerson,
    guestsIncluded: listing.guestsIncluded,
    propertyRentTax: listing.propertyRentTax,
    guestStayTax: listing.guestStayTax,
    guestNightlyTax: listing.guestNightlyTax,
    guestPerPersonPerNightTax: listing.guestPerPersonPerNightTax,
    refundableDamageDeposit: listing.refundableDamageDeposit,
  };

  if (String(listing.id) === '429263') {
    console.log(`[DEBUG] Property 429263 Tax Rate check:`, listing.propertyRentTax);
  }

  return transformed;
}

/**
 * Fetch all listings from Hostaway API
 */
export async function fetchListings(): Promise<Property[]> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured. Please set VITE_HOSTAWAY_API_TOKEN in .env');
  }

  const response = await fetch(`${API_URL}/listings`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch listings: ${response.status} ${response.statusText}`);
  }

  const data: HostawayListingsResponse = await response.json();

  if (data.status !== 'success') {
    throw new Error('Hostaway API returned an error');
  }

  const result = data.result.map(transformListing);

  // Cache the result
  try {
    localStorage.setItem('solmare_properties_cache_v3', JSON.stringify({
      timestamp: Date.now(),
      data: result
    }));
  } catch (e) {
    console.warn('Failed to cache properties:', e);
  }

  return result;
}

/**
 * Fetch a single listing by ID from Hostaway API
 */
export async function fetchListingById(id: string): Promise<Property | null> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured. Please set VITE_HOSTAWAY_API_TOKEN in .env');
  }

  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch listing: ${response.status} ${response.statusText}`);
  }

  const data: { status: string; result: HostawayListing } = await response.json();

  if (data.status !== 'success') {
    throw new Error('Hostaway API returned an error');
  }

  return transformListing(data.result);
}

// ... (previous code)

/**
 * Fetch calendar data for a listing from Hostaway API
 * Returns day-by-day availability, pricing, and reservations
 */
export async function fetchCalendar(
  listingId: string,
  startDate: Date,
  endDate: Date,
  includeResources: boolean = true
): Promise<HostawayCalendarDay[]> {
  if (!API_TOKEN) {
    console.error('Hostaway API token is missing');
    throw new Error('Hostaway API token is not configured');
  }

  const startDateStr = format(startDate, 'yyyy-MM-dd');
  const endDateStr = format(endDate, 'yyyy-MM-dd');

  const params = new URLSearchParams({
    startDate: startDateStr,
    endDate: endDateStr,
    ...(includeResources && { includeResources: '1' }),
  });

  const response = await fetch(`${API_URL}/listings/${listingId}/calendar?${params}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
  }

  const data: HostawayCalendarResponse = await response.json();

  if (data.status !== 'success') {
    throw new Error('Hostaway API returned an error');
  }

  return data.result;
}

/**
 * Get dates that are not available for booking
 * Filters calendar data to return only dates that are booked/blocked
 * Logic: A date is unavailable if its status is NOT 'available'
 */
export function getUnavailableDates(calendarDays: HostawayCalendarDay[]): Date[] {
  return calendarDays
    .filter((day) => {
      // User requirement: "it will only show if the status is available"
      // Therefore, if status is distinct from 'available', it is unavailable.
      return day.status !== 'available';
    })
    .map((day) => {
      // Parse YYYY-MM-DD as local date to prevent timezone shifts
      const [year, month, date] = day.date.split('-').map(Number);
      return new Date(year, month - 1, date);
    });
}

/**
 * Calculate reservation price using Hostaway API
 */
export interface CalculatePriceResponse {
  totalPrice: number;
  basePrice: number;
  cleaningFee: number;
  taxes: number;
  // Add other fields as discovered from API response
  breakdown: any; // We'll inspect this for details
}

export async function getListingPriceDetails(
  listingId: string,
  startDate: Date,
  endDate: Date,
  guests: number
): Promise<any> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured');
  }

  const payload = {
    startingDate: format(startDate, 'yyyy-MM-dd'),
    endingDate: format(endDate, 'yyyy-MM-dd'),
    numberOfGuests: guests, // Keep as number, internal JSON stringify handles it. Script uses string but JSON standard is fine. 
    // If strict string required: String(guests)
    version: 2
  };

  const response = await fetch(`${API_URL}/listings/${listingId}/calendar/priceDetails`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Price details fetch failed:', errorBody);
    throw new Error(`Failed to get price details: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.errorMessage || 'Hostaway API returned an error');
  }

  return data.result;
}

/**
 * Create a new reservation in Hostaway
 */
export async function createReservation(
  listingId: string,
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    message?: string;
  },
  stayDetails: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
  },
  payment?: {
    cardNumber: string;
    expiryDate: string; // MM/YY
    cvc: string;
    holderName: string;
  },
  validatePayment: boolean = true
): Promise<any> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured');
  }

  // Parse expiry MM/YY
  let ccExpirationMonth = '';
  let ccExpirationYear = '';
  if (payment) {
    const [month, year] = payment.expiryDate.split('/').map(s => s.trim());
    ccExpirationMonth = month;
    ccExpirationYear = year.length === 2 ? `20${year}` : year;
  }

  const payload = {
    listingMapId: Number(listingId),
    channelId: 2000, // Direct booking channel ID
    guestName: `${guestDetails.firstName} ${guestDetails.lastName}`,
    guestFirstName: guestDetails.firstName,
    guestLastName: guestDetails.lastName,
    guestEmail: guestDetails.email,
    phone: guestDetails.phone,
    guestAddress: guestDetails.address,
    guestCity: guestDetails.city,
    guestZipCode: guestDetails.zipCode,
    guestCountry: guestDetails.country,
    numberOfGuests: stayDetails.guests,
    adults: stayDetails.guests, // Often required to match numberOfGuests if no children info
    arrivalDate: format(stayDetails.checkIn, 'yyyy-MM-dd'),
    departureDate: format(stayDetails.checkOut, 'yyyy-MM-dd'),
    comment: guestDetails.message,
    isManuallyChecked: 0,
    isInitial: 0,

    // Add payment fields if provided
    ...(payment && {
      ccNumber: payment.cardNumber.replace(/\s/g, ''),
      ccExpirationMonth,
      ccExpirationYear,
      cvc: payment.cvc,
      ccName: payment.holderName,
    })
  };

  const params = new URLSearchParams();
  if (validatePayment && payment) {
    params.append('validatePaymentMethod', '1');
  }
  // Ensure we DO NOT force overbooking
  params.append('forceOverbooking', '0');

  const response = await fetch(`${API_URL}/reservations?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Reservation creation failed:', errorBody);
    try {
      const errorJson = JSON.parse(errorBody);
      throw new Error(errorJson.errorMessage || `Failed to create reservation: ${response.status}`);
    } catch (e) {
      throw new Error(`Failed to create reservation: ${response.status} ${response.statusText}`);
    }
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.errorMessage || 'Hostaway API returned an error');
  }

  return data.result;
}

/**
 * Fetch all coupons from Hostaway
 */
export async function fetchCoupons(): Promise<HostawayCoupon[]> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured');
  }

  const response = await fetch(`${API_URL}/coupons`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch coupons: ${response.status}`);
  }

  const data: HostawayCouponsResponse = await response.json();
  if (data.status !== 'success') {
    throw new Error('Hostaway API returned an error');
  }

  return data.result;
}

/**
 * Validate a coupon code against a listing and stay details
 * This fetches ALL coupons and filters client-side (no direct validate endpoint known)
 */
export async function validateCoupon(
  code: string,
  listingId: number,
  checkIn: Date,
  checkOut: Date
): Promise<HostawayCoupon> {
  // 1. Fetch all coupons
  const coupons = await fetchCoupons();

  // 2. Find matching code
  // Note: Hostaway coupon codes might be case insensitive, but usually they are uppercase properties.
  // Test script showed "RETURNGUEST". Let's normalize input to uppercase.
  const coupon = coupons.find(c => c.name.toUpperCase() === code.trim().toUpperCase());

  if (!coupon) {
    throw new Error('Invalid coupon code');
  }

  // 3. Validation Checks

  // Active status
  if (!coupon.isActive) throw new Error('Coupon is inactive');
  if (coupon.isExpired) throw new Error('Coupon has expired');

  // Validity Dates (When the coupon can be USED/APPLIED)
  const now = new Date();
  if (coupon.validityDateStart && new Date(coupon.validityDateStart) > now) throw new Error('Coupon is not valid yet');
  if (coupon.validityDateEnd && new Date(coupon.validityDateEnd) < now) throw new Error('Coupon has expired');

  // Stay Dates (Check-in requirements)
  if (coupon.checkInDateStart && new Date(coupon.checkInDateStart) > checkIn) throw new Error('Coupon not valid for these dates');
  if (coupon.checkInDateEnd && new Date(coupon.checkInDateEnd) < checkIn) throw new Error('Coupon not valid for these dates');

  // Listing requirement
  if (coupon.listingMapIds && coupon.listingMapIds.length > 0) {
    if (!coupon.listingMapIds.includes(listingId)) {
      throw new Error('Coupon not valid for this property');
    }
  }

  // Length of stay requirement
  if (coupon.lengthOfStayCondition && coupon.lengthOfStayValue) {
    const nightCount = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const value = coupon.lengthOfStayValue;

    switch (coupon.lengthOfStayCondition) {
      case 'moreThan':
        if (nightCount <= value) throw new Error(`Minimum stay of ${value + 1} nights required`);
        break;
      case 'moreThanOrEqualTo':
        if (nightCount < value) throw new Error(`Minimum stay of ${value} nights required`);
        break;
      case 'lessThan':
        if (nightCount >= value) throw new Error(`Maximum stay of ${value - 1} nights allowed`);
        break;
      case 'lessThanOrEqualTo':
        if (nightCount > value) throw new Error(`Maximum stay of ${value} nights allowed`);
        break;
      case 'equals':
        if (nightCount !== value) throw new Error(`Stay must be exactly ${value} nights`);
        break;
    }
  }


  return coupon;
}

/**
 * Fetch reviews from Hostaway
 */
export async function fetchReviews(listingId?: string): Promise<HostawayReview[]> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured');
  }

  const params = new URLSearchParams();
  if (listingId) {
    params.append('listingId', listingId);
  }
  // Sort by newest first
  params.append('sortOrder', 'DESC');

  const response = await fetch(`${API_URL}/reviews?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status}`);
  }

  const data: HostawayReviewsResponse = await response.json();
  if (data.status !== 'success') {
    throw new Error('Hostaway API returned an error');
  }

  return data.result;
}
