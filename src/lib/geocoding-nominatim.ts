/**
 * geocoding-nominatim.ts
 * Geocoding via OpenStreetMap Nominatim (free, no API key required).
 * Returns lat/lng and UTC offset estimate from country code.
 */

export interface GeoResult {
  lat: number;
  lng: number;
  /** Estimated standard UTC offset in hours based on country */
  utcOffset: number;
}

/** Rough standard UTC offset per country code (covers common birth locations) */
const COUNTRY_UTC: Record<string, number> = {
  VN: 7, TH: 7, ID: 7, KH: 7, LA: 7, MM: 6.5,
  SG: 8, MY: 8, PH: 8, CN: 8, TW: 8, HK: 8, MO: 8,
  JP: 9, KR: 9, AU: 10, NZ: 12,
  IN: 5.5, BD: 6, PK: 5, LK: 5.5,
  AE: 4, SA: 3, TR: 3,
  DE: 1, FR: 1, IT: 1, ES: 1, NL: 1, BE: 1, CH: 1, AT: 1, PL: 1,
  GB: 0, PT: 0, IE: 0,
  BR: -3, AR: -3, CL: -4, CO: -5, PE: -5,
  US: -5, CA: -5, MX: -6,
};

/**
 * Geocode an address string using Nominatim.
 * Throws on network error or no results found.
 */
export async function geocodeAddress(address: string): Promise<GeoResult> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: { "Accept-Language": "vi,en" },
  });

  if (!res.ok) throw new Error("Nominatim request failed");

  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Không tìm thấy địa chỉ");

  const item = data[0];
  const lat = parseFloat(item.lat);
  const lng = parseFloat(item.lon);

  // Extract country code from display_name or address details
  const countryCode: string = item.address?.country_code?.toUpperCase() ?? "";
  const utcOffset = COUNTRY_UTC[countryCode] ?? 0;

  return { lat, lng, utcOffset };
}
