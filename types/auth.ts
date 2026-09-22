export type SportType = 'padel' | 'football' | 'both';

export type GovernorateId = 'assiut' | 'sohag' | 'minya' | 'qena' | 'aswan';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: GovernorateId | string;
  avatar?: string;
  preferredSport?: SportType;
  createdAt: string;
}

export type PaymentMethod = 'card' | 'vodafone_cash' | 'fawry' | 'cash_at_court';

export type PaymentStatus = 'paid' | 'pending';

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

export interface BookingAddons {
  rackets?: number; // count of rackets
  balls?: boolean;
  referee?: boolean;
  beverages?: boolean;
}

export interface Booking {
  id: string; // e.g. "PAD-2026-8941"
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  courtId: string;
  courtNameAr: string;
  courtNameEn: string;
  courtLocationAr: string;
  courtLocationEn: string;
  courtImage: string;
  sportType: 'padel' | 'football';
  date: string; // "2026-09-23"
  timeSlot: string; // "19:00"
  durationHours: number; // 1 | 1.5 | 2
  pricePerHour: number;
  courtTotal: number;
  addons: BookingAddons;
  addonsTotal: number;
  discountTotal: number;
  promoCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdAt: string;
}
