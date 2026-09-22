'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Booking } from '../types/auth';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  bookings: Booking[];
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: Omit<User, 'id' | 'createdAt'> & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  demoLogin: () => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_SESSION_KEY = 'padel_user_session';
const STORAGE_USERS_KEY = 'padel_registered_users';
const STORAGE_BOOKINGS_KEY = 'padel_user_bookings';

const DEFAULT_DEMO_USER: User = {
  id: 'user-demo-1',
  name: 'أحمد الصعيدي',
  email: 'ahmed@sa3edy.com',
  phone: '01012345678',
  city: 'assiut',
  preferredSport: 'both',
  createdAt: '2026-09-01T10:00:00.000Z',
};

const DEFAULT_INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'PAD-2026-9841',
    userId: 'user-demo-1',
    userName: 'أحمد الصعيدي',
    userPhone: '01012345678',
    userEmail: 'ahmed@sa3edy.com',
    courtId: 'court-1',
    courtNameAr: 'بادل سكوير أسيوط',
    courtNameEn: 'Padel Square Assiut',
    courtLocationAr: 'أسيوط • كورنيش النيل بجوار النادي الرياضي',
    courtLocationEn: 'Nile Corniche, Assiut City',
    courtImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000',
    sportType: 'padel',
    date: '2026-09-24',
    timeSlot: '7:00 PM - 9:00 PM',
    durationHours: 2,
    pricePerHour: 350,
    courtTotal: 700,
    addons: {
      rackets: 2,
      balls: true,
    },
    addonsTotal: 100,
    discountTotal: 0,
    totalAmount: 625,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2026-09-21T14:30:00.000Z',
  },
  {
    id: 'FOT-2026-7732',
    userId: 'user-demo-1',
    userName: 'أحمد الصعيدي',
    userPhone: '01012345678',
    userEmail: 'ahmed@sa3edy.com',
    courtId: 'court-2',
    courtNameAr: 'ملعب خماسي سوهاج الرياضي',
    courtNameEn: 'Sohag Football Arena 5v5',
    courtLocationAr: 'سوهاج • حي الكوثر الرئيسي',
    courtLocationEn: 'Al-Kawtar District, Sohag',
    courtImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
    sportType: 'football',
    date: '2026-09-18',
    timeSlot: '21:00',
    durationHours: 1,
    pricePerHour: 280,
    courtTotal: 280,
    addons: {
      referee: true,
    },
    addonsTotal: 70,
    discountTotal: 0,
    totalAmount: 350,
    paymentMethod: 'cash_at_court',
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdAt: '2026-09-15T19:00:00.000Z',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // 1. Load active session
        const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
        if (savedSession) {
          setCurrentUser(JSON.parse(savedSession));
        }

        // 2. Load bookings or initialize with default
        const savedBookings = localStorage.getItem(STORAGE_BOOKINGS_KEY);
        if (savedBookings) {
          setBookings(JSON.parse(savedBookings));
        } else {
          localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(DEFAULT_INITIAL_BOOKINGS));
          setBookings(DEFAULT_INITIAL_BOOKINGS);
        }

        // 3. Ensure registered users array exists
        const savedUsers = localStorage.getItem(STORAGE_USERS_KEY);
        if (!savedUsers) {
          localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
        }
      }
    } catch (err) {
      console.error('Error loading auth from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const cleanInput = emailOrPhone.trim().toLowerCase();
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const registeredUsers: User[] = rawUsers ? JSON.parse(rawUsers) : [DEFAULT_DEMO_USER];

      // Match user by email or phone
      const foundUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === cleanInput || u.phone.replace(/\s+/g, '') === cleanInput.replace(/\s+/g, '')
      );

      if (foundUser) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(foundUser));
        setCurrentUser(foundUser);
        return { success: true };
      } else {
        // Auto-register convenience fallback for testing
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: cleanInput.includes('@') ? cleanInput.split('@')[0] : `لاعب الصعيد`,
          email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@padel-egypt.com`,
          phone: cleanInput.includes('@') ? '01000000000' : cleanInput,
          city: 'assiut',
          preferredSport: 'both',
          createdAt: new Date().toISOString(),
        };
        const updatedUsers = [...registeredUsers, newUser];
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));
        setCurrentUser(newUser);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً.' };
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'> & { password?: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      const registeredUsers: User[] = rawUsers ? JSON.parse(rawUsers) : [];

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email.toLowerCase().trim(),
        phone: userData.phone.trim(),
        city: userData.city,
        preferredSport: userData.preferredSport || 'both',
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(updatedUsers));
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'تعذر إنشاء الحساب. يرجى التحقق من صحة البيانات.' };
    }
  };

  const demoLogin = () => {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(DEFAULT_DEMO_USER));
    setCurrentUser(DEFAULT_DEMO_USER);
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      setCurrentUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated: User = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updated));

    // Also update in registered users list
    try {
      const rawUsers = localStorage.getItem(STORAGE_USERS_KEY);
      if (rawUsers) {
        const registeredUsers: User[] = JSON.parse(rawUsers);
        const nextUsers = registeredUsers.map((u) => (u.id === updated.id ? updated : u));
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(nextUsers));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> => {
    const code = Math.floor(1000 + Math.random() * 9000);
    const prefix = bookingData.sportType === 'padel' ? 'PAD' : 'FOT';
    const newBooking: Booking = {
      ...bookingData,
      id: `${prefix}-2026-${code}`,
      createdAt: new Date().toISOString(),
    };

    const nextBookings = [newBooking, ...bookings];
    setBookings(nextBookings);
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(nextBookings));
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const nextBookings = bookings.map((b) =>
      b.id === bookingId ? { ...b, bookingStatus: 'cancelled' as const } : b
    );
    setBookings(nextBookings);
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(nextBookings));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        bookings,
        login,
        signup,
        demoLogin,
        logout,
        updateProfile,
        createBooking,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
