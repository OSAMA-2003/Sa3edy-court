'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../i18n/LanguageContext';
import { Header } from '../../../components/sections/Header';
import { Footer } from '../../../components/sections/Footer';
import { DEMO_COURTS } from '../../../data';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Zap,
  Banknote,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Sparkles,
  Tag,
  Lock,
  Phone,
  Check,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Booking, PaymentMethod } from '../../../types/auth';

function BookingConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, createBooking } = useAuth();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowBackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Retrieve pending booking from sessionStorage or query params
  const [bookingData, setBookingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Card form state
  const [cardHolder, setCardHolder] = useState(currentUser?.name || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Mobile wallet state
  const [walletPhone, setWalletPhone] = useState(currentUser?.phone || '');

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('padel_pending_booking');
      if (stored) {
        try {
          setBookingData(JSON.parse(stored));
          return;
        } catch (e) {
          console.error(e);
        }
      }
    }

    const courtId = searchParams.get('courtId') || 'court-1';
    const court = DEMO_COURTS.find((c) => c.id === courtId) || DEMO_COURTS[0];
    const duration = parseFloat(searchParams.get('duration') || '1');
    const total = parseFloat(searchParams.get('total') || `${court.pricePerHour * duration}`);

    setBookingData({
      courtId: court.id,
      courtNameAr: court.nameAr,
      courtNameEn: court.nameEn,
      courtLocationAr: court.locationAr,
      courtLocationEn: court.locationEn,
      courtImage: court.image,
      sportType: court.sportType,
      date: searchParams.get('date') || '2026-09-24',
      timeSlot: searchParams.get('slot') || '7:00 PM',
      durationHours: duration,
      pricePerHour: court.pricePerHour,
      courtTotal: court.pricePerHour * duration,
      addons: {
        rackets: 0,
        balls: false,
        referee: false,
        beverages: false,
      },
      addonsTotal: 0,
      totalAmount: total,
      userName: currentUser?.name || 'أحمد الصعيدي',
      userPhone: currentUser?.phone || '01012345678',
      userEmail: currentUser?.email || 'ahmed@sa3edy.com',
    });
  }, [searchParams, currentUser]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData) return;
    const cleanCode = promoCodeInput.trim().toUpperCase();

    if (cleanCode === 'SA3ED10') {
      const discount = Math.round(bookingData.totalAmount * 0.1);
      setAppliedPromo('SA3ED10');
      setPromoDiscount(discount);
      setPromoMessage(isRtl ? 'تم تطبيق خصم 10% بنجاح!' : '10% discount applied successfully!');
    } else {
      setPromoMessage(isRtl ? 'كوبون الخصم غير صالح' : 'Invalid coupon code');
    }
  };

  const handleConfirmPayment = async () => {
    if (!bookingData) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const finalTotal = Math.max(0, bookingData.totalAmount - promoDiscount);

    const newBooking = await createBooking({
      userId: currentUser?.id || 'guest-user',
      userName: bookingData.userName || currentUser?.name || 'لاعب الصعيد',
      userPhone: bookingData.userPhone || currentUser?.phone || '01012345678',
      userEmail: bookingData.userEmail || currentUser?.email || 'player@padel-egypt.com',
      courtId: bookingData.courtId,
      courtNameAr: bookingData.courtNameAr,
      courtNameEn: bookingData.courtNameEn,
      courtLocationAr: bookingData.courtLocationAr,
      courtLocationEn: bookingData.courtLocationEn,
      courtImage: bookingData.courtImage,
      sportType: bookingData.sportType,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      durationHours: bookingData.durationHours,
      pricePerHour: bookingData.pricePerHour,
      courtTotal: bookingData.courtTotal,
      addons: bookingData.addons,
      addonsTotal: bookingData.addonsTotal,
      discountTotal: promoDiscount,
      promoCode: appliedPromo || undefined,
      totalAmount: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_at_court' ? 'pending' : 'paid',
      bookingStatus: 'confirmed',
    });

    setIsProcessing(false);
    setConfirmedBooking(newBooking);

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('padel_pending_booking');
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500">
        <p>{isRtl ? 'جاري تجهيز بيانات الحجز...' : 'Loading booking details...'}</p>
      </div>
    );
  }

  const finalTotalAmount = Math.max(0, bookingData.totalAmount - promoDiscount);

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedBooking) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
        <Header onOpenBookingModal={() => { }} />

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-28 sm:pt-32 pb-16 flex items-center justify-center">
          <div className="w-full rounded-3xl p-6 sm:p-10 bg-white border border-slate-200/80 shadow-xl text-center relative overflow-hidden">

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <Badge variant="live" className="mb-2">
              {isRtl ? 'تم تأكيد الحجز بنجاح' : 'Booking Confirmed'}
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-black text-[#02122F] mb-2">
              {isRtl ? 'مبروك! موعد مباراتك مؤكد الآن' : 'Your Match is Booked!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {isRtl
                ? 'تم إرسال تفاصيل التذكرة إلى هاتفك المسجل، وتم حفظ الحجز تلقائياً في ملفك الشخصي.'
                : 'Match details have been sent to your phone and saved into your profile.'}
            </p>

            {/* Official Digital Pass Box (Hybrid Dark Inside Light) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#02122F] to-[#041B3D] text-white border border-slate-800 text-start space-y-4 mb-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <span className="text-[11px] text-slate-400 block">{isRtl ? 'كود الحجز الرقمي' : 'Booking Reference'}</span>
                  <span className="text-xl font-mono font-black text-[#CFF40E]">#{confirmedBooking.id}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow">
                  <QrCode className="w-full h-full text-[#02122F]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">{isRtl ? 'الملعب المختار:' : 'Venue:'}</span>
                  <span className="font-bold text-white text-sm">
                    {isRtl ? confirmedBooking.courtNameAr : confirmedBooking.courtNameEn}
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {isRtl ? confirmedBooking.courtLocationAr : confirmedBooking.courtLocationEn}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">{isRtl ? 'الموعد والمدة:' : 'Schedule:'}</span>
                  <span className="font-bold text-[#00D2FF] text-sm block">
                    {confirmedBooking.date} • {confirmedBooking.timeSlot}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {confirmedBooking.durationHours} {isRtl ? 'ساعة لعب' : 'hours playtime'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  {confirmedBooking.paymentMethod === 'card' ? (isRtl ? '💳 مدفوع إلكترونياً بالبطاقة' : 'Paid via Credit Card') :
                    confirmedBooking.paymentMethod === 'vodafone_cash' ? (isRtl ? '📱 مدفوع عبر فودافون كاش' : 'Paid via Vodafone Cash') :
                      confirmedBooking.paymentMethod === 'fawry' ? (isRtl ? '⚡ كود سداد فوري' : 'Fawry Code') :
                        (isRtl ? '💵 الدفع نقداً في الملعب' : 'Pay cash at court')}
                </span>
                <span className="text-lg font-black text-[#CFF40E]">
                  {confirmedBooking.totalAmount} {isRtl ? 'ج.م' : 'EGP'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/profile" className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,244,14,0.3)]">
                  <span>{isRtl ? 'عرض التذكرة في ملفي الشخصي' : 'View Pass in Profile'}</span>
                  <ArrowBackIcon className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/courts" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full font-bold">
                  {isRtl ? 'حجز ملعب آخر' : 'Book Another Court'}
                </Button>
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // CHECKOUT PAYMENT PAGE
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      <Header onOpenBookingModal={() => { }} />

      {/* Dark Luxury Header Banner */}
      <section className="w-full pt-28 sm:pt-32 pb-12 bg-gradient-to-r from-[#02122F] via-[#041B3D] to-[#020B1A] text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-80 h-80 bg-[#CFF40E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-1/4 w-60 h-60 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
          <Link href="/book" className="inline-flex items-center gap-1.5 text-xs text-[#CFF40E] hover:underline mb-3">
            <ArrowBackIcon className="w-3.5 h-3.5" />
            <span>{isRtl ? 'الرجوع لتعديل بيانات الحجز' : 'Back to Court Booking'}</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isRtl ? 'تأكيد الحجز والدفع الإلكتروني' : 'Confirm & Secure Payment'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                {isRtl ? 'اختر وسيلة الدفع المناسبة لتأكيد حجزك فورياً بالصعيد' : 'Select your preferred payment method to guarantee your match slot'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body with Clean Light Background */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Payment Gateway Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Payment Methods Card */}
            <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-base sm:text-lg font-black text-[#02122F] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#04307C]" />
                <span>{isRtl ? 'اختر طريقة الدفع' : 'Payment Method'}</span>
              </h2>

              {/* Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* 1. Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${paymentMethod === 'card'
                      ? 'bg-blue-50 border-2 border-[#04307C] text-[#02122F] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-[#04307C]' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block text-[#02122F]">{isRtl ? 'بطاقة بنكية' : 'Card'}</span>
                    <span className="text-[10px] text-slate-500">Visa / Meeza</span>
                  </div>
                </button>

                {/* 2. Vodafone Cash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vodafone_cash')}
                  className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${paymentMethod === 'vodafone_cash'
                      ? 'bg-blue-50 border-2 border-[#04307C] text-[#02122F] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Smartphone className={`w-5 h-5 ${paymentMethod === 'vodafone_cash' ? 'text-[#04307C]' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block text-[#02122F]">{isRtl ? 'محافظ كاش' : 'E-Wallet'}</span>
                    <span className="text-[10px] text-slate-500">Vodafone / InstaPay</span>
                  </div>
                </button>

                {/* 3. Fawry */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('fawry')}
                  className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${paymentMethod === 'fawry'
                      ? 'bg-blue-50 border-2 border-[#04307C] text-[#02122F] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Zap className={`w-5 h-5 ${paymentMethod === 'fawry' ? 'text-[#04307C]' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block text-[#02122F]">{isRtl ? 'فوري باي' : 'Fawry'}</span>
                    <span className="text-[10px] text-slate-500">POS Kiosks</span>
                  </div>
                </button>

                {/* 4. Cash at Court */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_at_court')}
                  className={`p-3 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between gap-3 ${paymentMethod === 'cash_at_court'
                      ? 'bg-blue-50 border-2 border-[#04307C] text-[#02122F] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Banknote className={`w-5 h-5 ${paymentMethod === 'cash_at_court' ? 'text-[#04307C]' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-bold block text-[#02122F]">{isRtl ? 'كاش بالملعب' : 'Cash at Court'}</span>
                    <span className="text-[10px] text-slate-500">Upon Arrival</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Gateway Inputs */}
              <div className="pt-4 border-t border-slate-100">
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                      <span>{isRtl ? 'بيانات البطاقة البنكية المشفرة (3D Secure)' : 'Encrypted 3D Secure Card'}</span>
                      <div className="flex gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">VISA</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">Mastercard</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">Meeza ميزة</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{isRtl ? 'اسم حامل البطاقة' : 'Cardholder Name'}</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="AHMED MOHAMED"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{isRtl ? 'رقم البطاقة' : 'Card Number'}</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute end-3.5 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">{isRtl ? 'تاريخ الانتهاء' : 'Expiry (MM/YY)'}</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">{isRtl ? 'الرمز السري (CVV)' : 'CVV'}</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'vodafone_cash' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isRtl
                        ? 'أدخل رقم محفظتك الإلكترونية (فودافون كاش، أورنج كاش، إي آند كاش، أو إنستاباي)، وسيصلك طلب الدفع على هاتفك.'
                        : 'Enter your mobile wallet number (Vodafone, Orange, Etisalat Cash, or InstaPay) to authorize payment.'}
                    </p>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">{isRtl ? 'رقم هاتف المحفظة' : 'Wallet Phone Number'}</label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={walletPhone}
                          onChange={(e) => setWalletPhone(e.target.value)}
                          placeholder="01012345678"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none font-mono"
                        />
                        <Smartphone className="w-4 h-4 text-slate-400 absolute end-3.5 top-3" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'fawry' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>{isRtl ? 'سداد فوري عبر أي ماكينة بالصعيد' : 'Fawry Code Settlement'}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {isRtl
                        ? 'عند الضغط على تأكيد، سيتم إصدار كود دفع فوري صالح لمدة ساعتين، يمكنك السداد به في أي سوبرماركت أو كشك فوري بأسيوط وسوهاج وكافة المحافظات.'
                        : 'A 2-hour payment code will be generated upon confirmation, payable at any Fawry terminal in Egypt.'}
                    </p>
                  </div>
                )}

                {paymentMethod === 'cash_at_court' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Banknote className="w-4 h-4 text-emerald-600" />
                      <span>{isRtl ? 'الدفع نقداً عند الوصول للملعب' : 'Pay Cash at Court Reception'}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {isRtl
                        ? 'سيتم حجز موعدك وتأكيده فوراً. يرجى التواجد بالملعب قبل الموعد بـ 15 دقيقة وسداد قيمة الحجز في ريسيبشن النادي.'
                        : 'Your slot is guaranteed immediately. Please arrive 15 minutes before kickoff to pay at court reception.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-sm">
              <h3 className="text-xs font-bold text-[#02122F] mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#04307C]" />
                <span>{isRtl ? 'هل تمتلك كوبون خصم؟' : 'Have a Promo Code?'}</span>
              </h3>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="SA3ED10"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs text-[#02122F] outline-none font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#02122F] hover:bg-[#041B3D] text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {isRtl ? 'تطبيق' : 'Apply'}
                </button>
              </form>

              {promoMessage && (
                <p className={`text-xs mt-2 font-semibold ${appliedPromo ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {promoMessage}
                </p>
              )}
            </div>

          </div>

          {/* Right: Booking Summary Card (5 Cols) - Signature Dark Navy Card */}
          <div className="lg:col-span-5 space-y-4 sticky top-28">
            <div className="rounded-3xl p-6 bg-gradient-to-b from-[#02122F] to-[#041B3D] text-white border border-slate-800 shadow-xl space-y-5">

              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bookingData.courtImage}
                    alt={isRtl ? bookingData.courtNameAr : bookingData.courtNameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">
                    {isRtl ? bookingData.courtNameAr : bookingData.courtNameEn}
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#CFF40E] shrink-0" />
                    <span>{isRtl ? bookingData.courtLocationAr : bookingData.courtLocationEn}</span>
                  </p>
                </div>
              </div>

              {/* Match Specifications */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>{isRtl ? 'تاريخ المباراة:' : 'Date:'}</span>
                  </span>
                  <span className="font-bold text-white">{bookingData.date}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span>{isRtl ? 'الموعد والمدة:' : 'Time Slot:'}</span>
                  </span>
                  <span className="font-bold text-white">{bookingData.timeSlot} ({bookingData.durationHours} {isRtl ? 'ساعة' : 'hr'})</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{isRtl ? 'إيجار الملعب:' : 'Court rental:'}</span>
                  <span className="font-bold text-white">{bookingData.courtTotal} {isRtl ? 'ج.م' : 'EGP'}</span>
                </div>

                {bookingData.addonsTotal > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{isRtl ? 'التجهيزات الإضافية:' : 'Add-ons:'}</span>
                    <span className="font-bold text-[#CFF40E]">+{bookingData.addonsTotal} {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>{isRtl ? 'خصم الكوبون (SA3ED10):' : 'Promo discount:'}</span>
                    <span>-{promoDiscount} {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{isRtl ? 'رسوم الخدمة والمنصة:' : 'Platform Fee:'}</span>
                  <span className="font-bold text-emerald-400">{isRtl ? 'مجاناً 0%' : 'FREE 0%'}</span>
                </div>
              </div>

              {/* Final Amount */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">{isRtl ? 'المبلغ النهائي' : 'Final Total'}</span>
                  <span className="text-[11px] text-emerald-400">{isRtl ? 'شامل الضرائب والإضاءة' : 'Taxes included'}</span>
                </div>
                <div className="text-end">
                  <span className="text-2xl sm:text-3xl font-black text-[#CFF40E]">
                    {finalTotalAmount} <span className="text-xs text-white font-normal">{isRtl ? 'ج.م' : 'EGP'}</span>
                  </span>
                </div>
              </div>

              {/* Confirm & Pay Button */}
              <Button
                size="lg"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,244,14,0.3)]"
              >
                {isProcessing ? (
                  <span className="w-5 h-5 border-2 border-[#010A1A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'cash_at_court'
                        ? (isRtl ? 'تأكيد الحجز والدفع بالملعب' : 'Confirm & Pay at Court')
                        : (isRtl ? `تأكيد ودفع ${finalTotalAmount} ج.م الآن` : `Confirm & Pay ${finalTotalAmount} EGP`)}
                    </span>
                  </>
                )}
              </Button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isRtl ? 'إمكانية الإلغاء المجاني قبل المباراة بـ 4 ساعات' : 'Free cancellation up to 4 hours before'}</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm">جاري تجهيز صفحة الدفع...</div>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}
