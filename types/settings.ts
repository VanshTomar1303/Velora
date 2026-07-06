export interface BusinessHours {
  day: string;
  hours: string;
}

export interface Settings {
  brand: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
  };
  hours: BusinessHours[];
  stats: {
    years: number;
    customers: number;
    awards: number;
    employees: number;
    branches: number;
    orders: number;
  };
  map: {
    lat: number;
    lng: number;
  };
  taxRate: number;
  deliveryFee: number;
  currency: string;
}
