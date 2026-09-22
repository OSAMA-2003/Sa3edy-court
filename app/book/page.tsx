'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_COURTS } from '../../data';
import {
  CalendarWithTime,
  formatHour12,
  parseSlotToHour24,
} from '../../components/ui/calendar-with-time';
import {
  MapPin,
  Star,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  User as UserIcon,
  Clock,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

function SimpleBookWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCourtId = searchParams.get('courtId') || 'court-1';
  const rawSlotParam = searchParams.get('slot') || '7:00 PM';
  const rawDurationParam = searchParams.get('duration');

  const { currentUser } = useAuth();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  // Selected Court
  const [selectedCourtId, setSelectedCourtId] = useState(initialCourtId);
  const selectedCourt = DEMO_COURTS.find((c) => c.id === selectedCourtId) || DEMO_COURTS[0];
  const [showCourtPicker, setShowCourtPicker] = useState(false);

  // Duration State: strictly 1, 2, or 3 hours maximum
  const initialDuration = useMemo(() => {
    const parsed = parseInt(rawDurationParam || '1', 10);
    if (parsed === 2) return 2;
    if (parsed === 3) return 3;
    return 1;
  }, [rawDurationParam]);

  const [durationHours, setDurationHours] = useState<number>(initialDuration);

  // Start & End Time State in 12h format (e.g. 7:00 PM / 7:00 م)
  const [date, setDate] = useState<Date>(new Date());

  const initialStartHour = useMemo(() => parseSlotToHour24(rawSlotParam), [rawSlotParam]);
  const [startTime, setStartTime] = useState<string>(() => formatHour12(initialStartHour, lang));
  const [endTime, setEndTime] = useState<string>(() =>
    formatHour12((initialStartHour + initialDuration) % 24, lang)
  );

  // Sync 12h localization if language changes
  useEffect(() => {
    const currentStartHour = parseSlotToHour24(startTime);
    setStartTime(formatHour12(currentStartHour, lang));
    setEndTime(formatHour12((currentStartHour + durationHours) % 24, lang));
  }, [lang]);

  // Player Contact Details
  const [playerName, setPlayerName] = useState(currentUser?.name || '');
  const [playerPhone, setPlayerPhone] = useState(currentUser?.phone || '');

  useEffect(() => {
    if (currentUser) {
      if (!playerName) setPlayerName(currentUser.name);
      if (!playerPhone) setPlayerPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Price calculations
  const pricePerHour = selectedCourt.pricePerHour || 350;
  const courtSubtotal = pricePerHour * durationHours;
  const totalAmount = courtSubtotal;

  // Format Date for URL & Display
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const isoDate = `${yyyy}-${mm}-${dd}`;

  const formattedDateString = date.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleProceedToConfirmation = () => {
    if (!playerName.trim() || !playerPhone.trim()) {
      alert(
        isRtl
          ? 'يرجى إدخال اسم اللاعب ورقم الهاتف لتأكيد الحجز'
          : 'Please provide player name and phone number'
      );
      return;
    }

    const pendingBooking = {
      courtId: selectedCourt.id,
      courtNameAr: selectedCourt.nameAr,
      courtNameEn: selectedCourt.nameEn,
      courtLocationAr: selectedCourt.locationAr,
      courtLocationEn: selectedCourt.locationEn,
      courtImage: selectedCourt.image,
      sportType: selectedCourt.sportType,
      date: isoDate,
      timeSlot: `${startTime} - ${endTime}`,
      durationHours,
      pricePerHour,
      courtTotal: courtSubtotal,
      addons: {
        rackets: 0,
        balls: false,
        beverages: false,
      },
      addonsTotal: 0,
      totalAmount,
      userName: playerName.trim(),
      userPhone: playerPhone.trim(),
      userEmail: currentUser?.email || `${playerPhone.replace(/\s+/g, '')}@sa3edy-padel.com`,
    };

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('padel_pending_booking', JSON.stringify(pendingBooking));
    }

    const params = new URLSearchParams({
      courtId: selectedCourt.id,
      date: isoDate,
      slot: startTime,
      duration: String(durationHours),
      total: String(totalAmount),
    });

    router.push(`/book/confirmation?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">

      {/* Dark Luxury Header Banner */}
      <section className="w-full pt-28 sm:pt-32 pb-10 bg-gradient-to-r from-[#02122F] via-[#041B3D] to-[#020B1A] text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-80 h-80 bg-[#CFF40E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-1/4 w-60 h-60 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              {isRtl ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-500" />
            <Link href="/courts" className="hover:text-white transition-colors">
              {isRtl ? 'الملاعب' : 'Courts'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-500" />
            <span className="text-[#CFF40E] font-bold">{isRtl ? 'حجز موعد' : 'Book Court'}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isRtl ? 'حجز ملعبك بالصعيد' : 'Reserve Your Match Slot'}
              </h1>

            </div>

            {/* Quick Stats Pill */}
            <div className="p-3 px-4 rounded-2xl bg-white/10 border border-white/15 text-start backdrop-blur-md">
              <span className="text-[11px] text-slate-300 block">{isRtl ? 'سعر الساعة:' : 'Rate:'}</span>
              <span className="text-xl font-black text-[#CFF40E]">
                {selectedCourt.pricePerHour} {isRtl ? 'ج.م' : 'EGP'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calendar & Time (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Court Selection Summary Pill */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedCourt.image}
                    alt={isRtl ? selectedCourt.nameAr : selectedCourt.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#02122F] text-[#CFF40E]">
                    {selectedCourt.sportType === 'padel' ? 'PADEL' : 'FOOTBALL'}
                  </span>
                  <h3 className="text-base font-black text-[#02122F] mt-1">
                    {isRtl ? selectedCourt.nameAr : selectedCourt.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#04307C]" />
                    <span>{isRtl ? selectedCourt.locationAr : selectedCourt.locationEn}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCourtPicker(!showCourtPicker)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#02122F] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                {isRtl ? 'تغيير الملعب' : 'Change'}
              </button>
            </div>

            {/* Collapsible Court Selector List */}
            {showCourtPicker && (
              <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 max-h-56 overflow-y-auto">
                {DEMO_COURTS.map((court) => (
                  <button
                    key={court.id}
                    type="button"
                    onClick={() => {
                      setSelectedCourtId(court.id);
                      setShowCourtPicker(false);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-start flex items-center justify-between transition-colors cursor-pointer ${selectedCourtId === court.id
                      ? 'bg-blue-50 border-[#04307C] text-[#02122F]'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{isRtl ? court.nameAr : court.nameEn}</p>
                      <p className="text-[10px] text-slate-500">{court.pricePerHour} ج.م / ساعة</p>
                    </div>
                    {selectedCourtId === court.id && (
                      <Check className="w-4 h-4 text-[#04307C]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* 1. CALENDAR WITH TIME COMPONENT */}
            <div className="rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 shadow-sm text-start space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#02122F] text-[#CFF40E] font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-[#02122F]">
                    {isRtl ? 'حدد اليوم والوقت والمدة' : 'Pick Date, Time & Duration'}
                  </h2>
                </div>


              </div>

              {/* The CalendarWithTime component */}
              <CalendarWithTime
                selectedDate={date}
                onDateChange={setDate}
                startTime={startTime}
                onStartTimeChange={(t) => setStartTime(t)}
                endTime={endTime}
                onEndTimeChange={(t) => setEndTime(t)}
                durationHours={durationHours}
                onDurationChange={(d) => setDurationHours(d)}
                lang={lang}
              />
            </div>

            {/* 2. PLAYER CONTACT DETAILS CARD */}
            <div className="rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 shadow-sm text-start space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-6 h-6 rounded-full bg-[#02122F] text-[#CFF40E] font-black text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-base font-black text-[#02122F]">
                    {isRtl ? 'بيانات اللاعب لتأكيد الحجز' : 'Player Contact Details'}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {isRtl
                      ? 'يرجى كتابة الاسم ورقم الهاتف لإصدار التذكرة وإرسال كود التأكيد'
                      : 'Enter player name and phone to confirm and generate your match pass'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#04307C]" />
                    <span>{isRtl ? 'اسم اللاعب / الكابتن *' : 'Player / Captain Name *'}</span>
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder={isRtl ? 'أحمد الصعيدي' : 'Ahmed Mohamed'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#04307C]" />
                    <span>{isRtl ? 'رقم الهاتف (واتساب) *' : 'Phone Number (WhatsApp) *'}</span>
                  </label>
                  <input
                    type="tel"
                    value={playerPhone}
                    onChange={(e) => setPlayerPhone(e.target.value)}
                    placeholder="01012345678"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-xs sm:text-sm text-[#02122F] outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            {/* Sticky Dark Navy Order Summary Card */}
            <div className="rounded-3xl p-6 bg-gradient-to-b from-[#02122F] to-[#041B3D] text-white border border-slate-800 shadow-xl space-y-4 text-start">
              <h3 className="text-base font-black text-white flex items-center gap-2 pb-3 border-b border-white/10">
                <Sparkles className="w-4 h-4 text-[#CFF40E]" />
                <span>{isRtl ? 'ملخص الحجز' : 'Booking Summary'}</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>{isRtl ? 'الملعب:' : 'Court:'}</span>
                  <span className="font-bold text-white truncate max-w-[160px]">
                    {isRtl ? selectedCourt.nameAr : selectedCourt.nameEn}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>{isRtl ? 'التاريخ:' : 'Date:'}</span>
                  <span className="font-bold text-[#00D2FF]">{formattedDateString}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>{isRtl ? 'الموعد والمدة:' : 'Time & Duration:'}</span>
                  <span className="font-bold text-white">
                    {startTime} - {endTime} (
                    {durationHours}{' '}
                    {isRtl
                      ? durationHours === 1
                        ? 'ساعة'
                        : durationHours === 2
                          ? 'ساعتان'
                          : '3 ساعات'
                      : durationHours === 1
                        ? 'hr'
                        : 'hrs'}
                    )
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>{isRtl ? 'سعر الساعة:' : 'Hourly Rate:'}</span>
                  <span className="font-bold text-slate-200">
                    {pricePerHour} {isRtl ? 'ج.م' : 'EGP'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>{isRtl ? 'إيجار الملعب:' : 'Court rent:'}</span>
                  <span className="font-bold text-white">
                    {courtSubtotal} {isRtl ? 'ج.م' : 'EGP'}
                  </span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">{isRtl ? 'الإجمالي المستحق' : 'Total'}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    {isRtl ? 'شامل الإضاءة وكامل الخدمات' : 'Floodlights included'}
                  </span>
                </div>
                <div className="text-end">
                  <span className="text-2xl sm:text-3xl font-black text-[#CFF40E]">
                    {totalAmount} <span className="text-xs text-white font-normal">{isRtl ? 'ج.م' : 'EGP'}</span>
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                onClick={handleProceedToConfirmation}
                className="w-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(207,244,14,0.3)]"
              >
                <span>{isRtl ? 'المتابعة لتأكيد الحجز والدفع' : 'Proceed to Payment'}</span>
                <ArrowIcon className="w-4 h-4" />
              </Button>

              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isRtl ? 'تأكيد فوري وإمكانية الدفع بالملعب أو أونلاين' : 'Instant booking & flexible payment'}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm">
          جاري تحميل صفحة الحجز...
        </div>
      }
    >
      <SimpleBookWizardContent />
    </Suspense>
  );
}
