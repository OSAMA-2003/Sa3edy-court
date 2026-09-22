'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  User as UserIcon, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  QrCode, 
  LogOut, 
  Edit3, 
  Save, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  Wallet, 
  Tag 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Booking } from '../../types/auth';

export default function ProfilePage() {
  const { currentUser, isLoading, bookings, updateProfile, cancelBooking, logout, demoLogin } = useAuth();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'wallet'>('bookings');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  // Profile edit state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editSport, setEditSport] = useState<'padel' | 'football' | 'both'>('both');
  const [isEditing, setIsEditing] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // QR / Ticket Modal state
  const [ticketModalBooking, setTicketModalBooking] = useState<Booking | null>(null);

  React.useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditPhone(currentUser.phone);
      setEditCity(currentUser.city);
      setEditSport(currentUser.preferredSport || 'both');
    }
  }, [currentUser]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      city: editCity,
      preferredSport: editSport,
    });
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'all') return true;
    return b.bookingStatus === bookingFilter;
  });

  const totalMatches = bookings.length;
  const totalHours = bookings.reduce((sum, b) => sum + (b.durationHours || 1), 0);
  const upcomingCount = bookings.filter((b) => b.bookingStatus === 'confirmed').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#04307C] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold">{isRtl ? 'جاري تحميل ملف اللاعب...' : 'Loading profile...'}</p>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!currentUser) {
    return (
      <div className="w-full flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
        <main className="flex-1 max-w-xl mx-auto w-full px-4 pt-36 pb-20 flex items-center justify-center">
          <div className="w-full text-center p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-5 text-[#04307C]">
              <UserIcon className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-black text-[#02122F] mb-2">
              {isRtl ? 'الملف الشخصي للاعب' : 'Player Profile'}
            </h1>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {isRtl 
                ? 'يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى بياناتك الشخصية وحجوزاتك وسجل مبارياتك بالصعيد.' 
                : 'Please sign in or create an account to view your personal details, bookings, and match history.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-bold">
                  {isRtl ? 'تسجيل الدخول' : 'Sign In'}
                </Button>
              </Link>
              <Link href="/signup" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full font-bold">
                  {isRtl ? 'إنشاء حساب جديد' : 'Create Account'}
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={demoLogin}
                className="text-xs font-bold text-[#04307C] hover:text-[#02122F] flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isRtl ? 'دخول فوري سريع بحساب تجريبي (أحمد الصعيدي)' : 'Instant Demo Login (Ahmed Sa3edy)'}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      {/* Dark Luxury Hero Banner for Player Meta */}
      <section className="w-full pt-28 sm:pt-32 pb-12 bg-gradient-to-r from-[#02122F] via-[#041B3D] to-[#020B1A] text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-80 h-80 bg-[#CFF40E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-1/4 w-60 h-60 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Info Avatar & Meta */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#CFF40E] to-[#00D2FF] text-[#010A1A] flex items-center justify-center font-black text-3xl sm:text-4xl shadow-xl">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -end-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#02122F] flex items-center justify-center text-white" title="Active">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <h1 className="text-xl sm:text-3xl font-black text-white">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#CFF40E] text-[#010A1A] text-[11px] font-black">
                    {isRtl ? 'لاعب معتمد • صعيدي كورت' : 'Verified Player'}
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-300 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span dir="ltr">{currentUser.phone}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>
                      {currentUser.city === 'assiut' ? (isRtl ? 'أسيوط' : 'Assiut') :
                       currentUser.city === 'sohag' ? (isRtl ? 'سوهاج' : 'Sohag') :
                       currentUser.city === 'minya' ? (isRtl ? 'المنيا' : 'Minya') :
                       (isRtl ? 'الصعيد' : 'Upper Egypt')}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {currentUser.preferredSport === 'padel' ? (isRtl ? 'بادل' : 'Padel') :
                       currentUser.preferredSport === 'football' ? (isRtl ? 'كرة قدم' : 'Football') :
                       (isRtl ? 'بادل + كرة قدم' : 'Padel & Football')}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <Link href="/book" className="flex-1 md:flex-initial">
                <Button size="sm" className="w-full font-bold flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(207,244,14,0.3)]">
                  <PlusCircle className="w-4 h-4" />
                  <span>{isRtl ? 'حجز ملعب جديد' : 'Book a Court'}</span>
                </Button>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title={isRtl ? 'تسجيل الخروج' : 'Logout'}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isRtl ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[11px] text-slate-300 font-semibold">{isRtl ? 'المباريات المحجوزة' : 'Matches Booked'}</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{totalMatches}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[11px] text-slate-300 font-semibold">{isRtl ? 'ساعات اللعب' : 'Total Hours'}</p>
              <p className="text-xl sm:text-2xl font-black text-[#CFF40E] mt-1">{totalHours} <span className="text-xs font-normal text-white">{isRtl ? 'ساعة' : 'hrs'}</span></p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[11px] text-slate-300 font-semibold">{isRtl ? 'الحجوزات القادمة' : 'Upcoming'}</p>
              <p className="text-xl sm:text-2xl font-black text-[#00D2FF] mt-1">{upcomingCount}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[11px] text-slate-300 font-semibold">{isRtl ? 'نقاط المكافآت' : 'Reward Points'}</p>
              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">350 <span className="text-xs font-normal text-white">{isRtl ? 'نقطة' : 'pts'}</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Body with Clean Light Background */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {saveToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{isRtl ? 'تم حفظ بياناتك وتحديث ملفك الشخصي بنجاح!' : 'Profile updated successfully!'}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#02122F] text-white shadow-md'
                : 'text-slate-600 hover:text-[#02122F] hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{isRtl ? 'حجوزاتي ومبارياتي' : 'My Bookings'}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'bookings' ? 'bg-[#CFF40E] text-[#010A1A]' : 'bg-slate-200 text-slate-700'
            }`}>
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-[#02122F] text-white shadow-md'
                : 'text-slate-600 hover:text-[#02122F] hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{isRtl ? 'تعديل بيانات الحساب' : 'Edit Profile'}</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'wallet'
                ? 'bg-[#02122F] text-white shadow-md'
                : 'text-slate-600 hover:text-[#02122F] hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>{isRtl ? 'المحفظة والمكافآت' : 'Wallet & Rewards'}</span>
          </button>
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            {/* Filter Sub-Tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <button
                onClick={() => setBookingFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  bookingFilter === 'all'
                    ? 'bg-[#02122F] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? 'جميع الحجوزات' : 'All'} ({bookings.length})
              </button>
              <button
                onClick={() => setBookingFilter('confirmed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  bookingFilter === 'confirmed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? 'القادمة' : 'Upcoming'} ({bookings.filter((b) => b.bookingStatus === 'confirmed').length})
              </button>
              <button
                onClick={() => setBookingFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  bookingFilter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? 'المكتملة' : 'Completed'} ({bookings.filter((b) => b.bookingStatus === 'completed').length})
              </button>
              <button
                onClick={() => setBookingFilter('cancelled')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  bookingFilter === 'cancelled'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? 'الملغاة' : 'Cancelled'} ({bookings.filter((b) => b.bookingStatus === 'cancelled').length})
              </button>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#02122F] mb-1">
                  {isRtl ? 'لا توجد حجوزات في هذا القسم' : 'No bookings found'}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  {isRtl ? 'اختر ملعبك المفضل بالصعيد وابدأ مباراتك القادمة الآن!' : 'Choose your favorite court in Upper Egypt and start playing!'}
                </p>
                <Link href="/book">
                  <Button size="sm" className="font-bold">
                    {isRtl ? 'احجز مباراة جديدة' : 'Book a Match'}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredBookings.map((booking) => {
                  const isUpcoming = booking.bookingStatus === 'confirmed';
                  const isCancelled = booking.bookingStatus === 'cancelled';
                  const isCompleted = booking.bookingStatus === 'completed';

                  return (
                    <div
                      key={booking.id}
                      className="group rounded-3xl p-5 bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                    >
                      {/* Card Top: Image + Info */}
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={booking.courtImage}
                            alt={isRtl ? booking.courtNameAr : booking.courtNameEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-1.5 start-1.5 px-2 py-0.5 rounded-md bg-[#02122F]/90 text-[10px] font-black text-[#CFF40E]">
                            {booking.sportType === 'padel' ? 'PADEL' : 'FOOTBALL'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 text-start">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-mono text-slate-500">
                              #{booking.id}
                            </span>
                            {/* Status Badge */}
                            {isUpcoming && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                {isRtl ? 'حجز مؤكد' : 'Confirmed'}
                              </span>
                            )}
                            {isCompleted && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                {isRtl ? 'مكتمل' : 'Completed'}
                              </span>
                            )}
                            {isCancelled && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                                <XCircle className="w-3 h-3" />
                                {isRtl ? 'ملغي' : 'Cancelled'}
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-base text-[#02122F] truncate mb-1">
                            {isRtl ? booking.courtNameAr : booking.courtNameEn}
                          </h3>

                          <p className="text-xs text-slate-500 flex items-center gap-1 truncate mb-2">
                            <MapPin className="w-3.5 h-3.5 text-[#04307C] shrink-0" />
                            <span>{isRtl ? booking.courtLocationAr : booking.courtLocationEn}</span>
                          </p>

                          <div className="flex items-center gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1 font-bold text-[#04307C]">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{booking.date}</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{booking.timeSlot} ({booking.durationHours} {isRtl ? 'ساعة' : 'hr'})</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Details: Addons & Price */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {booking.paymentMethod === 'card' 
                              ? (isRtl ? '💳 تم الدفع بالبطاقة' : '💳 Paid via Card')
                              : booking.paymentMethod === 'vodafone_cash'
                              ? (isRtl ? '📱 فودافون كاش' : '📱 Vodafone Cash')
                              : booking.paymentMethod === 'fawry'
                              ? (isRtl ? '⚡ فوري باي' : '⚡ Fawry Pay')
                              : (isRtl ? '💵 الدفع نقداً بالملعب' : '💵 Cash at Court')}
                          </p>
                        </div>
                        <div className="text-end">
                          <span className="text-[10px] text-slate-400 block">{isRtl ? 'إجمالي الحساب' : 'Total'}</span>
                          <span className="text-base font-black text-[#02122F]">{booking.totalAmount} {isRtl ? 'ج.م' : 'EGP'}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setTicketModalBooking(booking)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#02122F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#04307C]" />
                          <span>{isRtl ? 'التذكرة والـ QR' : 'Ticket & QR'}</span>
                        </button>

                        {isUpcoming && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(isRtl ? 'هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟' : 'Are you sure you want to cancel this booking?')) {
                                cancelBooking(booking.id);
                              }
                            }}
                            className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                          >
                            {isRtl ? 'إلغاء الحجز' : 'Cancel'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm text-start">
            <h2 className="text-xl font-bold text-[#02122F] mb-2 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#04307C]" />
              <span>{isRtl ? 'تعديل البيانات الشخصية' : 'Personal Details'}</span>
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {isRtl 
                ? 'قم بتحديث بياناتك لتسهيل حجز الملاعب واستلام إشعارات الحجز عبر الرسائل القصيرة والواتساب.' 
                : 'Update your details for faster bookings and match alerts.'}
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isRtl ? 'اسم اللاعب' : 'Full Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'المحافظة' : 'Governorate'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] outline-none cursor-pointer"
                    >
                      <option value="assiut">{isRtl ? 'أسيوط' : 'Assiut'}</option>
                      <option value="sohag">{isRtl ? 'سوهاج' : 'Sohag'}</option>
                      <option value="minya">{isRtl ? 'المنيا' : 'Minya'}</option>
                      <option value="qena">{isRtl ? 'قنا والأقصر' : 'Qena & Luxor'}</option>
                      <option value="aswan">{isRtl ? 'أسوان' : 'Aswan'}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isRtl ? 'الرياضة المفضلة' : 'Preferred Sport'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditSport('both')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      editSport === 'both'
                        ? 'border-[#04307C] bg-blue-50 text-[#04307C]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    🎾 + ⚽ {isRtl ? 'الاثنان' : 'Both'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditSport('padel')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      editSport === 'padel'
                        ? 'border-[#04307C] bg-blue-50 text-[#04307C]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    🎾 {isRtl ? 'بادل فقط' : 'Padel Only'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditSport('football')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      editSport === 'football'
                        ? 'border-[#04307C] bg-blue-50 text-[#04307C]'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    ⚽ {isRtl ? 'كرة قدم فقط' : 'Football Only'}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full font-bold flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>{isRtl ? 'حفظ التغييرات' : 'Save Changes'}</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: WALLET & REWARDS */}
        {activeTab === 'wallet' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#02122F] to-[#041B3D] text-white border border-slate-800 shadow-xl relative overflow-hidden text-start">
              <div className="absolute top-0 end-0 p-6 opacity-10">
                <Wallet className="w-32 h-32 text-white" />
              </div>

              <span className="px-3 py-1 rounded-full bg-white/10 text-[#CFF40E] text-xs font-bold border border-white/15 inline-block mb-3">
                {isRtl ? 'محفظة صعيدي كورت' : 'Sa3edy Court Wallet'}
              </span>

              <h3 className="text-xs text-slate-300 font-semibold">{isRtl ? 'الرصيد المتاح' : 'Available Balance'}</h3>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                150.00 <span className="text-base text-[#CFF40E] font-normal">{isRtl ? 'ج.م كاش باك' : 'EGP Cash'}</span>
              </p>

              <div className="mt-6 flex gap-3">
                <Button size="sm" className="font-bold">
                  {isRtl ? 'شحن المحفظة' : 'Top-up Balance'}
                </Button>
                <Button variant="secondary" size="sm" className="font-bold">
                  {isRtl ? 'سجل العمليات' : 'History'}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-sm text-start">
              <h3 className="text-sm font-bold text-[#02122F] mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#04307C]" />
                <span>{isRtl ? 'كوبونات الخصم النشطة' : 'Active Promo Codes'}</span>
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
                <div>
                  <span className="font-mono font-black text-[#04307C] tracking-wider text-sm">SA3ED10</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isRtl ? 'خصم 10% على أي حجز بادل أو خماسي في الصعيد' : '10% off any booking in Upper Egypt'}
                  </p>
                </div>
                <button
                  onClick={() => alert(isRtl ? 'تم نسخ الكوبون: SA3ED10' : 'Coupon copied: SA3ED10')}
                  className="px-3 py-1.5 rounded-lg bg-[#02122F] hover:bg-[#041B3D] text-xs font-bold text-white cursor-pointer"
                >
                  {isRtl ? 'نسخ' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Digital Pass Modal */}
      {ticketModalBooking && (
        <Modal
          isOpen={!!ticketModalBooking}
          onClose={() => setTicketModalBooking(null)}
          title={isRtl ? 'تذكرة دخول الملعب الرقمية' : 'Digital Match Pass'}
        >
          <div className="p-6 text-center space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mx-auto w-48 h-48 flex items-center justify-center shadow-sm">
              <div className="w-full h-full flex flex-col items-center justify-center p-2 border-2 border-[#02122F] rounded-xl bg-white">
                <div className="grid grid-cols-5 gap-1 w-32 h-32">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                          ? 'bg-[#02122F]'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-black text-[#02122F] mt-1">
                  #{ticketModalBooking.id}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#02122F]">
                {isRtl ? ticketModalBooking.courtNameAr : ticketModalBooking.courtNameEn}
              </h3>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#04307C]" />
                <span>{isRtl ? ticketModalBooking.courtLocationAr : ticketModalBooking.courtLocationEn}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-start text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">{isRtl ? 'اسم اللاعب:' : 'Player:'}</span>
                <span className="font-bold text-[#02122F]">{ticketModalBooking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isRtl ? 'التاريخ والوقت:' : 'Date & Time:'}</span>
                <span className="font-bold text-[#04307C]">{ticketModalBooking.date} • {ticketModalBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isRtl ? 'المدة:' : 'Duration:'}</span>
                <span className="font-bold text-[#02122F]">{ticketModalBooking.durationHours} {isRtl ? 'ساعة' : 'hrs'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isRtl ? 'حالة الحساب:' : 'Payment:'}</span>
                <span className="font-bold text-emerald-600">
                  {ticketModalBooking.paymentStatus === 'paid' ? (isRtl ? 'مدفوع بالكامل' : 'Fully Paid') : (isRtl ? 'الدفع عند الاستقبال' : 'Pay at Reception')}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              onClick={() => setTicketModalBooking(null)}
              className="w-full font-bold"
            >
              {isRtl ? 'إغلاق التذكرة' : 'Close Pass'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
