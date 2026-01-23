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

/**
 * Hostaway Calendar API response
 */
export interface HostawayCalendarResponse {
  status: string;
  result: HostawayCalendarDay[];
}
