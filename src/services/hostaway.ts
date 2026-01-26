import { HostawayListing, HostawayListingsResponse, HostawayCalendarDay, HostawayCalendarResponse } from '@/types/hostaway';
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
      alt: img.caption || listing.name,
    }));

  // Get the first image as the main thumbnail
  const mainImage = images.length > 0 ? images[0].src : listing.thumbnailUrl;

  // Extract amenity names (show all, not limited)
  const amenities = listing.listingAmenities.map((a) => a.amenityName);

  return {
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
    averageReviewRating: listing.averageReviewRating ? listing.averageReviewRating / 2 : null,

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

export async function calculateReservationPrice(
  listingId: string,
  startDate: Date,
  endDate: Date,
  guests: number
): Promise<any> {
  if (!API_TOKEN) {
    throw new Error('Hostaway API token is not configured');
  }

  const payload = {
    listingId: Number(listingId), // Hostaway usually expects integer ID
    startingDate: format(startDate, 'yyyy-MM-dd'),
    endingDate: format(endDate, 'yyyy-MM-dd'),
    numberOfGuests: guests,
  };

  const response = await fetch(`${API_URL}/reservations/calculate-price`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    // Attempt to read error message
    const errorBody = await response.text();
    console.error('Price calculation failed:', errorBody);
    throw new Error(`Failed to calculate price: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(data.errorMessage || 'Hostaway API returned an error');
  }

  return data.result;
}
