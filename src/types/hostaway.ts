/**
 * Hostaway API Types
 * Based on the API response structure from https://api.hostaway.com/v1/listings
 */

export interface HostawayListingImage {
  id: number;
  caption: string;
  bookingEngineCaption: string | null;
  airbnbCaption: string;
  vrboCaption: string | null;
  url: string;
  sortOrder: number;
}

export interface HostawayAmenity {
  id: number;
  amenityId: number;
  amenityName: string;
}

export interface HostawayBedType {
  id: number;
  bedTypeId: number;
  quantity: number;
  bedroomNumber: number;
}

export interface HostawayCustomFieldValue {
  id: number;
  customFieldId: number;
  listingUnitId: number | null;
  value: string;
  insertedOn: string;
  updatedOn: string;
  customField: {
    id: number;
    name: string;
    possibleValues: string | null;
    type: string;
    isPublic: number;
    insertedOn: string;
    updatedOn: string;
  };
}

export interface HostawayListing {
  id: number;
  propertyTypeId: number;
  name: string;
  externalListingName: string;
  internalListingName: string;
  bookingcomPropertyRoomName: string;
  description: string;
  thumbnailUrl: string;
  houseRules: string | null;
  country: string;
  countryCode: string;
  state: string;
  city: string;
  street: string;
  address: string;
  publicAddress: string;
  zipcode: string;
  price: number;
  starRating: number | null;
  weeklyDiscount: number | null;
  monthlyDiscount: number | null;
  personCapacity: number;
  lat: number;
  lng: number;
  checkInTimeStart: number;
  checkInTimeEnd: number;
  checkOutTime: number;
  cancellationPolicy: string;
  squareMeters: number;
  roomType: string;
  bathroomType: string;
  bedroomsNumber: number | null;
  bedsNumber: number;
  bathroomsNumber: number;
  minNights: number;
  maxNights: number;
  guestsIncluded: number;
  cleaningFee: number;
  checkinFee: number;
  priceForExtraPerson: number;
  propertyRentTax: number;
  guestPerPersonPerNightTax: number;
  guestStayTax: number;
  guestNightlyTax: number;
  refundableDamageDeposit: number;
  instantBookable: number;
  currencyCode: string;
  timeZoneName: string;
  wifiUsername: string | null;
  wifiPassword: string | null;
  listingAmenities: HostawayAmenity[];
  listingBedTypes: HostawayBedType[];
  listingImages: HostawayListingImage[];
  customFieldValues: HostawayCustomFieldValue[];
  averageReviewRating: number | null;
  airbnbListingUrl: string | null;
  vrboListingUrl: string | null;
}

export interface HostawayListingsResponse {
  status: string;
  result: HostawayListing[];
}

/**
 * Calendar day status types
 */
export type CalendarDayStatus =
  | 'available'
  | 'reserved'
  | 'blocked'
  | 'mblocked'
  | 'hardBlock'
  | 'conflicted'
  | 'pending'
  | 'mreserved';

/**
 * Hostaway Calendar Day object
 * Represents availability and pricing for a single day
 */
export interface HostawayCalendarDay {
  id: number;
  date: string; // "YYYY-MM-DD" format
  isAvailable: number; // 0 or 1
  isProcessed: number;
  status: CalendarDayStatus;
  price: number;
  minimumStay: number;
  maximumStay: number;
  closedOnArrival: number | null;
  closedOnDeparture: number | null;
  note: string | null;
  countAvailableUnits: number | null;
  availableUnitsToSell: number | null;
  countPendingUnits: number | null;
  countBlockingReservations: number | null;
  countBlockedUnits: number | null;
  desiredUnitsToSell: number | null;
  reservations?: HostawayReservation[]; // Available when includeResources=1
}

/**
 * Hostaway Reservation object (simplified for calendar view)
 */
export interface HostawayReservation {
  id: number;
  listingMapId: number;
  channelId: number;
  channelName: string;
  reservationId: string;
  guestName: string;
  guestFirstName: string;
  guestLastName: string;
  numberOfGuests: number;
  adults: number;
  children: number | null;
  infants: number | null;
  pets: number | null;
  arrivalDate: string;
  departureDate: string;
  checkInTime: number | null;
  checkOutTime: number | null;
  nights: number;
  totalPrice: number;
  currency: string;
  status: string;
}

export interface HostawayCalendarResponse {
  status: string;
  result: HostawayCalendarDay[];
}

/**
 * Credit Card Information for booking
 */
export interface HostawayCreditCard {
  cardNumber: string;
  expirationYear: string;
  expirationMonth: string;
  cvc: string;
  holderName: string; // "ccName" in API
}

/**
 * Payload for creating a reservation
 */
export interface HostawayReservationPayload {
  listingMapId: number; // Was listingId
  channelId: number; // 2000 for Direct Booking usually, or check documentation
  guestName: string; // Full name
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestAddress: string;
  guestCity: string;
  guestZipCode: string;
  guestCountry: string;
  phone: string; // Was guestPhone
  numberOfGuests: number;
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  comment?: string;
  isManuallyChecked?: number;
  isInitial?: number;

  // Payment fields
  ccNumber?: string;
  ccExpirationYear?: string;
  ccExpirationMonth?: string;
  cvc?: string;
  ccName?: string;
}

/**
 * Response from creating a reservation
 */
export interface HostawayReservationCreateResponse {
  status: string;
  result: {
    id: number;
    reservationId: string;
    status: string;
    totalPrice: number;
    currency: string;
    // ... potentially other fields
  };
}

export interface HostawayCoupon {
  id: number;
  name: string; // The Coupon Code
  type: 'percentage' | 'amount'; // Note: API might say 'percentage' or 'fixed'? Test script said 'percentage'
  amount: number;
  isActive: number;
  isExpired: number;
  checkInDateStart: string | null;
  checkInDateEnd: string | null;
  validityDateStart: string | null;
  validityDateEnd: string | null;
  lengthOfStayCondition: 'moreThan' | 'moreThanOrEqualTo' | 'lessThan' | 'lessThanOrEqualTo' | 'equals' | null;
  lengthOfStayValue: number | null;
  listingMapIds: number[];
}

export interface HostawayCouponsResponse {
  status: string;
  result: HostawayCoupon[];
}


export interface HostawayReview {
  id: number;
  reservationId: number;
  listingMapId: number;
  reviewerName: string;
  guestName: string;
  channelId: number;
  rating: number; // Out of 10
  title: string | null;
  publicReview: string;
  privateFeedback: string | null;
  revieweeResponse: string | null;
  submittedAt: string;
  insertedOn: string;
  updatedOn: string;
  status: string;
  listingName: string;
}

export interface HostawayReviewsResponse {
  status: string;
  result: HostawayReview[];
}
