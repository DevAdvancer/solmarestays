import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/data/properties';
import { createRoot } from 'react-dom/client';

// Fix for default marker icon
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface PropertyMapProps {
  properties: Property[];
  height?: string;
}

export function PropertyMap({ properties, height = '500px' }: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const defaultCenter: [number, number] = properties.length > 0
      ? [properties[0].lat, properties[0].lng]
      : [35.1798, -120.7331];

    const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: true
    }).setView(defaultCenter, 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run once on mount

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (properties.length === 0) return;

    // Add new markers
    const bounds = L.latLngBounds([]);

    properties.forEach((property) => {
      const marker = L.marker([property.lat, property.lng]).addTo(map);
      bounds.extend([property.lat, property.lng]);

      // Create a popup DOM node
      const popupDiv = document.createElement('div');
      const root = createRoot(popupDiv);

      // We use a small static HTML strcture for speed/simplicity inside popup,
      // or we can render React portal. For simplicity, we'll use HTML string or simple React render.
      // Since we need <Link> which relies on Router context, we can't easily render fully interactive React tree inside L.popup without Portal.
      // BUT: L.popup accepts HTML string. We can just build a simple HTML string with a standard href.

      const popupHtml = `
        <div class="min-w-[200px]">
          <a href="/property/${property.slug}" class="block group text-inherit no-underline">
            <div class="aspect-video w-full rounded-md overflow-hidden mb-2">
              <img
                src="${property.image}"
                alt="${property.name}"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
              ${property.name}
            </h3>
            <div class="flex justify-between items-center mt-2">
                <p class="text-xs text-gray-500">${property.location}</p>
                <p class="font-medium text-primary text-sm">$${property.startingPrice}/night</p>
            </div>
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, {
          className: 'property-map-popup',
          minWidth: 220
      });

      markersRef.current.push(marker);
    });

    // Fit bounds
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }, [properties]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-elevated z-0 isolate">
      <div
        ref={mapContainerRef}
        style={{ height, width: '100%' }}
        className="bg-secondary"
      />

      {/* Property List Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16 z-[1000] pointer-events-none">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide pointer-events-auto">
          {properties.slice(0, 6).map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.slug}`}
              className="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg hover:scale-105 transition-transform duration-200 min-w-[200px]"
            >
              <div className="flex gap-3">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate">
                    {property.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {property.location}
                  </p>
                  <p className="text-sm font-medium text-primary mt-1">
                    ${property.startingPrice}/night
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
