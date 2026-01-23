export interface Property {
  // Basic info
  id: string;
  slug: string;
  name: string;
  location: string;
  unitType: string;
  description: string;

  // Capacity & layout
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  bedsNumber: number;
  squareFeet: number;

  // Pricing
  startingPrice: number;
  cleaningFee: number;
  checkinFee: number;
  priceForExtraPerson: number;
  guestsIncluded: number;
  propertyRentTax: number;
  guestStayTax: number;
  guestNightlyTax: number;
  guestPerPersonPerNightTax: number;
  refundableDamageDeposit: number;
  weeklyDiscount: number | null;

  // Images
  image: string;
  images: { src: string; alt: string }[];

  // Amenities
  amenities: string[];

  // Policies & rules
  houseRules: string | null;
  cancellationPolicy: string;
  minNights: number;
  maxNights: number;

  // Check-in/out
  checkInTimeStart: number;
  checkInTimeEnd: number;
  checkOutTime: number;

  // Location
  lat: number;
  lng: number;
  address: string;

  // Reviews
  averageReviewRating: number | null;

  // External links
  hostawayListingId: string;
  airbnbListingUrl: string | null;
  vrboListingUrl: string | null;

  // Guidebook (from custom fields)
  guidebookUrl: string | null;
}
