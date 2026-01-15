import propertyHummingbird from '@/assets/property-hummingbird.jpg';
import propertyPierside from '@/assets/property-pierside.jpg';
import propertyCoral from '@/assets/property-coral.jpg';
import propertyCasita from '@/assets/property-casita.jpg';
import propertyMonterey from '@/assets/property-monterey.jpg';
import propertyBungalow from '@/assets/property-bungalow.jpg';

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  unitType: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  startingPrice: number;
  image: string;
  images: { src: string; alt: string }[];
  description: string;
  amenities: string[];
  hostawayListingId?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    slug: 'hummingbird-house',
    name: 'Hummingbird House',
    location: 'Avila Beach',
    unitType: 'Two Bedroom House',
    sleeps: 5,
    bedrooms: 2,
    bathrooms: 2,
    startingPrice: 400,
    image: propertyHummingbird,
    images: [
      { src: propertyHummingbird, alt: 'Hummingbird House exterior' },
      { src: propertyPierside, alt: 'Living room with ocean view' },
      { src: propertyCoral, alt: 'Modern kitchen' },
      { src: propertyCasita, alt: 'Master bedroom' },
      { src: propertyBungalow, alt: 'Private patio' },
      { src: propertyMonterey, alt: 'Bathroom with luxury finishes' },
    ],
    description: 'A sophisticated stay steps from the sand in Avila Beach. Tucked in the heart of Avila Beach, this upscale two-bedroom retreat offers the perfect blend of relaxed coastal living and refined comfort.',
    amenities: ['Ocean View', 'Full Kitchen', 'Private Patio', 'WiFi', 'Smart TV', 'A/C'],
    hostawayListingId: '391355',
  },
  {
    id: '2',
    slug: 'pierside-apartment',
    name: 'Pierside Apartment',
    location: 'Avila Beach',
    unitType: 'One Bedroom Apartment',
    sleeps: 4,
    bedrooms: 1,
    bathrooms: 1,
    startingPrice: 275,
    image: propertyPierside,
    images: [
      { src: propertyPierside, alt: 'Pierside Apartment exterior' },
      { src: propertyHummingbird, alt: 'Cozy living space' },
      { src: propertyCoral, alt: 'Compact kitchen' },
      { src: propertyCasita, alt: 'Comfortable bedroom' },
      { src: propertyBungalow, alt: 'Pier views from balcony' },
    ],
    description: 'Wake up to stunning pier views in this beautifully appointed one-bedroom apartment. Steps from the beach and local dining.',
    amenities: ['Pier View', 'Full Kitchen', 'WiFi', 'Smart TV', 'Washer/Dryer'],
    hostawayListingId: '391356',
  },
  {
    id: '3',
    slug: 'coral-house',
    name: 'Coral House',
    location: 'Avila Beach',
    unitType: 'Three Bedroom House',
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    startingPrice: 450,
    image: propertyCoral,
    images: [
      { src: propertyCoral, alt: 'Coral House exterior' },
      { src: propertyHummingbird, alt: 'Spacious living room' },
      { src: propertyPierside, alt: 'Chef kitchen' },
      { src: propertyCasita, alt: 'Master suite' },
      { src: propertyMonterey, alt: 'Beautiful garden' },
      { src: propertyBungalow, alt: 'BBQ area' },
    ],
    description: 'A charming coastal cottage with vibrant character. Perfect for families or groups looking for space and style near the beach.',
    amenities: ['Garden', 'Full Kitchen', 'BBQ Grill', 'WiFi', 'Pet Friendly', 'Parking'],
    hostawayListingId: '391357',
  },
  {
    id: '4',
    slug: 'la-casita',
    name: 'La Casita',
    location: 'San Luis Obispo',
    unitType: 'One Bedroom Casita',
    sleeps: 2,
    bedrooms: 1,
    bathrooms: 1,
    startingPrice: 225,
    image: propertyCasita,
    images: [
      { src: propertyCasita, alt: 'La Casita exterior' },
      { src: propertyHummingbird, alt: 'Mediterranean style interior' },
      { src: propertyPierside, alt: 'Cozy kitchen' },
      { src: propertyCoral, alt: 'Romantic bedroom' },
      { src: propertyBungalow, alt: 'Courtyard access' },
    ],
    description: 'A cozy Spanish-style retreat in the heart of San Luis Obispo. Terracotta tiles, arched doorways, and warm Mediterranean charm.',
    amenities: ['Private Entrance', 'Full Kitchen', 'WiFi', 'A/C', 'Courtyard Access'],
    hostawayListingId: '391358',
  },
  {
    id: '5',
    slug: 'monterey-heights',
    name: 'Monterey Heights',
    location: 'San Luis Obispo',
    unitType: 'Four Bedroom House',
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    startingPrice: 600,
    image: propertyMonterey,
    images: [
      { src: propertyMonterey, alt: 'Monterey Heights exterior' },
      { src: propertyHummingbird, alt: 'Panoramic mountain views' },
      { src: propertyPierside, alt: 'Modern open kitchen' },
      { src: propertyCoral, alt: 'Luxurious master bedroom' },
      { src: propertyCasita, alt: 'Hot tub with views' },
      { src: propertyBungalow, alt: 'Game room' },
    ],
    description: 'A modern hilltop retreat with panoramic mountain views. Floor-to-ceiling windows and contemporary design for an elevated escape.',
    amenities: ['Mountain Views', 'Hot Tub', 'Full Kitchen', 'WiFi', 'Game Room', 'Parking'],
    hostawayListingId: '391359',
  },
  {
    id: '6',
    slug: 'bungalow-1',
    name: 'Bungalow #1',
    location: 'Avila Beach',
    unitType: 'Studio Bungalow',
    sleeps: 2,
    bedrooms: 0,
    bathrooms: 1,
    startingPrice: 195,
    image: propertyBungalow,
    images: [
      { src: propertyBungalow, alt: 'Bungalow #1 exterior' },
      { src: propertyHummingbird, alt: 'Cozy studio interior' },
      { src: propertyPierside, alt: 'Kitchenette area' },
      { src: propertyCoral, alt: 'Comfortable bed' },
      { src: propertyCasita, alt: 'Outdoor shower' },
    ],
    description: 'A charming beach bungalow with exposed wood beams and coastal California style. Perfect for a romantic getaway.',
    amenities: ['Beach Access', 'Kitchenette', 'WiFi', 'Outdoor Shower', 'Bikes Included'],
    hostawayListingId: '391360',
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
