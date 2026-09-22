'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_COURTS, EGYPT_CITIES } from '../../data';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  Search,
  MapPin,
  Star,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { GiSoccerBall, GiTennisBall } from 'react-icons/gi';


function CourtsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialSportParam = searchParams.get('sport') || 'all';
  const initialCityParam = searchParams.get('city') || 'all';

  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter States
  const [selectedSport, setSelectedSport] = useState<string>(initialSportParam);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>(initialCityParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');

  // Counts
  const footballCourtsCount = useMemo(
    () => DEMO_COURTS.filter((c) => c.sportType === 'football').length,
    []
  );
  const padelCourtsCount = useMemo(
    () => DEMO_COURTS.filter((c) => c.sportType === 'padel').length,
    []
  );

  // Filtered Courts
  const filteredCourts = useMemo(() => {
    return DEMO_COURTS.filter((court) => {
      // Sport Filter
      if (selectedSport !== 'all' && court.sportType !== selectedSport) {
        return false;
      }

      // Governorate Filter
      if (selectedGovernorate !== 'all' && court.cityId !== selectedGovernorate) {
        return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesNameAr = court.nameAr?.toLowerCase().includes(q);
        const matchesNameEn = court.nameEn?.toLowerCase().includes(q);
        const matchesLocAr = court.locationAr?.toLowerCase().includes(q);
        const matchesLocEn = court.locationEn?.toLowerCase().includes(q);
        const matchesSurface =
          court.surfaceAr?.toLowerCase().includes(q) ||
          court.surfaceEn?.toLowerCase().includes(q);

        if (!matchesNameAr && !matchesNameEn && !matchesLocAr && !matchesLocEn && !matchesSurface) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price-desc') return b.pricePerHour - a.pricePerHour;
      return 0; // default recommended
    });
  }, [selectedSport, selectedGovernorate, searchQuery, sortBy]);

  const handleSelectSport = (sport: 'football' | 'padel') => {
    setSelectedSport((prev) => (prev === sport ? 'all' : sport));
    setTimeout(() => {
      const section = document.getElementById('courts-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleResetFilters = () => {
    setSelectedSport('all');
    setSelectedGovernorate('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">

      {/* 1. HERO BANNER WITH THE TWO MAIN SPORT SELECTION BUTTONS */}
      <section className="relative w-full pt-28 sm:pt-34 pb-14 sm:pb-18 bg-[#010A1A] text-white border-b border-white/10 overflow-hidden">
        {/* Stadium Glowing Atmosphere & Radial Mesh */}
        <div className="absolute top-0 start-1/4 w-[420px] h-[420px] bg-[#04307C]/40 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-4 end-10 w-80 h-80 bg-[#CFF40E]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 font-cairo">
            {isRtl ? 'اختر رياضتك واستكشف الملاعب' : 'Choose Your Sport & Explore Courts'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            {isRtl
              ? 'ملاعب كرة قدم خماسي وسباعي نجيل معتمد، وملاعب باديل بانورامية زجاجية في أسيوط وسوهاج وكافة محافظات الصعيد.'
              : 'Verified 5v5/7v7 football turf and panoramic glass padel courts across Upper Egypt.'}
          </p>

          {/* 2 BIG PROMINENT SPORT BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-2xl mx-auto">
            {/* 1. Football Button */}
            <Button
              variant={selectedSport === 'football' ? 'primary' : 'secondary'}
              size="lg"
              onClick={() => handleSelectSport('football')}
              className={`w-full sm:flex-1 py-4 sm:py-5 px-6 sm:px-7 flex items-center justify-between transition-all duration-300 ${selectedSport === 'football'
                ? 'scale-[1.04] ring-2 ring-[#CFF40E]/60 shadow-[0_0_30px_rgba(207,244,14,0.4)]'
                : 'opacity-90 hover:opacity-100 hover:scale-[1.02]'
                }`}
            >
              <div className="flex items-center gap-3.5 text-start">
                <span className="text-2xl sm:text-3xl shrink-0 flex items-center justify-center">
                  <GiSoccerBall className="w-7 h-7 sm:w-8 sm:h-8" />
                </span>
                <div className="flex flex-col text-start">
                  <span className="text-base sm:text-lg font-black tracking-tight leading-tight">
                    {isRtl ? 'كرة قدم' : 'Football'}
                  </span>
                </div>
              </div>
              {selectedSport === 'football' && (
                <span className="w-6 h-6 rounded-full bg-[#CFF40E] text-[#010A1A] flex items-center justify-center text-xs font-black shrink-0 ms-2 shadow">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </Button>

            {/* 2. Padel Button */}
            <Button
              variant={selectedSport === 'padel' ? 'primary' : 'secondary'}
              size="lg"
              onClick={() => handleSelectSport('padel')}
              className={`w-full sm:flex-1 py-4 sm:py-5 px-6 sm:px-7 flex items-center justify-between transition-all duration-300 ${selectedSport === 'padel'
                ? 'scale-[1.04] ring-2 ring-[#CFF40E]/60 shadow-[0_0_30px_rgba(207,244,14,0.4)]'
                : 'opacity-90 hover:opacity-100 hover:scale-[1.02]'
                }`}
            >
              <div className="flex items-center gap-3.5 text-start">
                <span className="text-2xl sm:text-3xl shrink-0 flex items-center justify-center">
                  <GiTennisBall className="w-7 h-7 sm:w-8 sm:h-8" />
                </span>
                <div className="flex flex-col text-start">
                  <span className="text-base sm:text-lg font-black tracking-tight leading-tight">
                    {isRtl ? 'باديل' : 'Padel'}
                  </span>
                </div>
              </div>
              {selectedSport === 'padel' && (
                <span className="w-6 h-6 rounded-full bg-[#CFF40E] text-[#010A1A] flex items-center justify-center text-xs font-black shrink-0 ms-2 shadow">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
            </Button>
          </div>



        </div>
      </section>

      {/* 2. CITIES DROPDOWN SELECTOR & SEARCH CONTROLS */}
      <main id="courts-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-24">

        {/* Floating Controls Bar */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">

            {/* 1. Cities Dropdown Selector (5 cols on desktop) */}
            <div className="lg:col-span-5 flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-[#02122F] focus-within:bg-white rounded-2xl px-3.5 py-2.5 transition-all">
              <MapPin className="w-4 h-4 text-[#04307C] shrink-0" />
              <div className="flex flex-col flex-1 text-start">
                <label htmlFor="city-dropdown-selector" className="text-[10px] text-slate-400 font-bold block leading-none mb-0.5">
                  {isRtl ? 'المحافظة / المدينة:' : 'Governorate / City:'}
                </label>
                <select
                  id="city-dropdown-selector"
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#02122F] outline-none cursor-pointer w-full"
                >
                  {EGYPT_CITIES.map((city) => {
                    const count =
                      city.id === 'all'
                        ? selectedSport === 'all'
                          ? DEMO_COURTS.length
                          : DEMO_COURTS.filter((c) => c.sportType === selectedSport).length
                        : DEMO_COURTS.filter(
                          (c) =>
                            (selectedSport === 'all' || c.sportType === selectedSport) &&
                            c.cityId === city.id
                        ).length;

                    return (
                      <option key={city.id} value={city.id} className="text-slate-800 bg-white py-1">
                        {isRtl
                          ? city.id === 'all'
                            ? `جميع محافظات الصعيد (${count} ملاعب)`
                            : `محافظة ${city.ar} (${count} ملاعب)`
                          : city.id === 'all'
                            ? `All Upper Egypt (${count} courts)`
                            : `${city.en} (${count} courts)`}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* 2. Instant Search Input (4 cols on desktop) */}
            <div className="lg:col-span-4 relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#02122F] focus-within:bg-white rounded-2xl px-3.5 py-2.5 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0 me-2" />
              <div className="flex flex-col flex-1 text-start">
                <label className="text-[10px] text-slate-400 font-bold block leading-none mb-0.5">
                  {isRtl ? 'بحث سريع:' : 'Quick Search:'}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? 'اسم الملعب أو النادي...' : 'Court or club name...'}
                  className="bg-transparent text-xs font-bold text-[#02122F] outline-none w-full placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-black p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 3. Sort Selector (3 cols on desktop) */}
            <div className="lg:col-span-3 flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#02122F] focus-within:bg-white rounded-2xl px-3.5 py-2.5 transition-all">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 me-2" />
              <div className="flex flex-col flex-1 text-start">
                <label htmlFor="sort-dropdown-selector" className="text-[10px] text-slate-400 font-bold block leading-none mb-0.5">
                  {isRtl ? 'ترتيب النتائج:' : 'Sort By:'}
                </label>
                <select
                  id="sort-dropdown-selector"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-[#02122F] outline-none cursor-pointer w-full"
                >
                  <option value="recommended">{isRtl ? 'الأكثر طلباً' : 'Recommended'}</option>
                  <option value="rating">{isRtl ? 'الأعلى تقييماً ⭐' : 'Top Rated'}</option>
                  <option value="price-asc">{isRtl ? 'السعر: الأقل أولاً' : 'Price: Low to High'}</option>
                  <option value="price-desc">{isRtl ? 'السعر: الأعلى أولاً' : 'Price: High to Low'}</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* 3. COURTS GRID (FULL WIDTH 3-COLUMN MODERN SHOWCASE) */}
        <section className="space-y-6">
          {/* Header info row */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-bold text-[#02122F] text-sm">
              {isRtl ? 'قائمة الملاعب المتاحة' : 'Available Courts'} ({filteredCourts.length})
            </span>
            {(selectedSport !== 'all' || selectedGovernorate !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isRtl ? 'إعادة ضبط الفلاتر' : 'Reset filters'}</span>
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredCourts.length === 0 && (
            <div className="p-12 text-center bg-white border border-slate-200/90 rounded-3xl flex flex-col items-center gap-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-black text-[#02122F]">
                {isRtl ? 'لا توجد ملاعب مطابقة لاختياراتك حالياً' : 'No Courts Match Your Selection'}
              </h3>
              <p className="text-slate-500 text-xs max-w-md">
                {isRtl
                  ? 'جرّب اختيار محافظة أخرى، أو قم بإلغاء تحديد الرياضة لرؤية كافة الملاعب المتاحة بالصعيد.'
                  : 'Try selecting a different city or clearing your filters to see all courts.'}
              </p>
              <Button size="sm" onClick={handleResetFilters}>
                {isRtl ? 'عرض كل الملاعب' : 'Show All Courts'}
              </Button>
            </div>
          )}

          {/* Courts Cards Grid */}
          {filteredCourts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourts.map((court) => {
                const isFootball = court.sportType === 'football';

                return (
                  <Card
                    key={court.id}
                    className="text-start group"
                  >
                    {/* Court Image Container */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={court.image}
                        alt={isRtl ? court.nameAr : court.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Sport Badge Top Left */}
                      <div className="absolute top-3.5 start-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black shadow-md border ${isFootball
                            ? 'bg-[#02122F] text-[#CFF40E] border-[#CFF40E]/40'
                            : 'bg-[#02122F] text-[#00D2FF] border-[#00D2FF]/40'
                            }`}
                        >
                          {isFootball ? (
                            <>
                              <GiSoccerBall className="w-3.5 h-3.5 shrink-0" />
                              <span>{isRtl ? 'كرة قدم' : 'Football'}</span>
                            </>
                          ) : (
                            <>
                              <GiTennisBall className="w-3.5 h-3.5 shrink-0" />
                              <span>{isRtl ? 'باديل' : 'Padel'}</span>
                            </>
                          )}
                        </span>
                      </div>



                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                          <MapPin className="w-3.5 h-3.5 text-[#04307C] shrink-0" />
                          <span className="truncate">{isRtl ? court.locationAr : court.locationEn}</span>
                        </div>

                        {/* Court Name */}
                        <Link href={`/book?courtId=${court.id}`}>
                          <h3 className="text-lg font-black text-[#02122F] hover:text-[#04307C] transition-colors leading-snug">
                            {isRtl ? court.nameAr : court.nameEn}
                          </h3>
                        </Link>

                        {/* Key Facilities Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(isRtl ? court.facilitiesAr : court.facilities)?.slice(0, 3).map((fac, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md"
                            >
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Booking Button Action */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-1">
                        <div>
                          <div className="text-xl font-black text-[#02122F] font-montserrat tracking-tight leading-none">
                            {court.pricePerHour}{' '}
                            <span className="text-xs font-bold text-slate-500">
                              {isRtl ? 'ج.م' : 'EGP'}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {isRtl ? 'سعر الساعة شامل الإضاءة' : 'per hour incl. lights'}
                          </span>
                        </div>

                        <Link href={`/book?courtId=${court.id}`}>
                          <Button size="sm" className="font-bold flex items-center gap-1.5 shadow-sm">
                            <span>{isRtl ? 'احجز الآن' : 'Book Now'}</span>
                            <ArrowIcon className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function CourtsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm">
          جاري تحميل دليل الملاعب...
        </div>
      }
    >
      <CourtsDirectoryContent />
    </Suspense>
  );
}
