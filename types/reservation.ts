export interface ReservationInput {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
}

export interface ReservationResult extends ReservationInput {
  id: string;
  confirmedAt: string;
}
