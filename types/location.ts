export interface Location {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  mapLat: number;
  mapLng: number;
  flagship?: boolean;
  image?: string;
}
