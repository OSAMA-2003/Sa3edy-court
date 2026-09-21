'use client';

import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';
import { DEMO_COURTS, EGYPT_CITIES } from '../../data';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { BookingModal } from '../../components/BookingModal';
import { Button } from '../../components/ui/Button';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

function CourtsDirectoryContent() {
  const { lang } = useLanguage();

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedFeature, setSelectedFeature] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Booking Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeCourtId, setActiveCourtId] = useState<string>('court-1');
  const [activeSlot, setActiveSlot] = useState<string>('19:00');

  const handleOpenBookingModal = (courtId?: string, slot?: string) => {
    if (courtId) setActiveCourtId(courtId);
    if (slot) setActiveSlot(slot);
    setBookingModalOpen(true);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGovernorate('all');
    setSelectedSport('all');
    setSelectedFeature('all');
    setMaxPrice(500);
    setSortBy('recommended');
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim() !== '') count++;
    if (selectedGovernorate !== 'all') count++;
    if (selectedSport !== 'all') count++;
    if (selectedFeature !== 'all') count++;
    if (maxPrice < 500) count++;
    return count;
  }, [searchQuery, selectedGovernorate, selectedSport, selectedFeature, maxPrice]);

  // Filtered & Sorted Courts List
  const filteredCourts = useMemo(() => {
    return DEMO_COURTS.filter((court) => {
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesNameAr = court.nameAr?.toLowerCase().includes(q);
        const matchesNameEn = court.nameEn?.toLowerCase().includes(q);
        const matchesLocAr = court.locationAr?.toLowerCase().includes(q);
        const matchesLocEn = court.locationEn?.toLowerCase().includes(q);
        const matchesSurface = court.surfaceAr?.toLowerCase().includes(q) || court.surfaceEn?.toLowerCase().includes(q);
        if (!matchesNameAr && !matchesNameEn && !matchesLocAr && !matchesLocEn && !matchesSurface) {
          return false;
        }
      }

      // Governorate filter
      if (selectedGovernorate !== 'all' && court.cityId !== selectedGovernorate) {
        return false;
      }

      // Sport filter
      if (selectedSport !== 'all' && court.sportType !== selectedSport) {
        return false;
      }

      // Feature filter
      if (selectedFeature === 'indoor' && !court.typeEn?.toLowerCase().includes('indoor') && !court.typeAr?.includes('مغطى')) {
        return false;
      }
      if (selectedFeature === 'panoramic' && !court.typeEn?.toLowerCase().includes('panoramic') && !court.typeAr?.includes('بانورام')) {
        return false;
      }

      // Price filter
      if (court.pricePerHour > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price-desc') return b.pricePerHour - a.pricePerHour;
      return 0; // default recommended order
    });
  }, [searchQuery, selectedGovernorate, selectedSport, selectedFeature, maxPrice, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      
      {/* Floating Header */}
      <Header onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

          {/* Breadcrumbs & Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-b border-slate-200/80 pb-8 text-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <a href="/" className="hover:text-[#02122F] transition-colors">
                  {lang === 'ar' ? 'الرئيسية' : 'Home'}
                </a>
                <span>/</span>
                <span className="text-[#04307C] font-bold">
                  {lang === 'ar' ? 'استكشاف الملاعب' : 'Courts Directory'}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#02122F] text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === 'ar' ? 'شبكة ملاعب الصعيد المعتمدة' : 'Upper Egypt Verified Venues'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#02122F] tracking-tight">
                {lang === 'ar' ? 'ملاعب البادل وكرة القدم بالصعيد' : 'Upper Egypt Padel & Football Courts'}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
                {lang === 'ar'
                  ? 'تصفح، قارن بالأسعار والمواصفات، واحجز ملعبك في أسيوط، سوهاج، المنيا، وقنا بتأكيد فوري ودفع إلكتروني آمن.'
                  : 'Browse, compare pricing and specs, and book verified courts across Assiut, Sohag, Minya & Qena.'}
              </p>
            </div>

            {/* Live Counter Badge */}
            <div className="shrink-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#04307C]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-start">
                <span className="text-xs text-slate-500 font-medium block">
                  {lang === 'ar' ? 'الملاعب المتاحة' : 'Available Courts'}
                </span>
                <span className="text-lg font-black text-[#02122F] font-montserrat">
                  {filteredCourts.length} <span className="text-xs font-normal text-slate-400">/ {DEMO_COURTS.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar & Quick Filters Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute right-3.5 rtl:right-3.5 ltr:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث باسم الملعب، المنطقة، نوع النجيل (مثل: موندو، كورنيش)...' : 'Search by name, district, turf type...'}
                className="w-full bg-[#F8FAFC] border border-slate-200 focus:border-[#02122F] focus:bg-white rounded-xl py-3 pr-11 pl-10 rtl:pr-11 rtl:pl-10 ltr:pl-11 ltr:pr-10 text-sm text-[#02122F] placeholder:text-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#02122F] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Sport Selector Buttons */}
            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              {[
                { id: 'all', labelAr: 'جميع الرياضات', labelEn: 'All Sports' },
                { id: 'padel', labelAr: '🎾 بادل', labelEn: '🎾 Padel' },
                { id: 'football', labelAr: '⚽ كرة قدم', labelEn: '⚽ Football' },
              ].map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSport === sport.id
                      ? 'bg-[#CFF40E] text-[#010A1A] shadow-sm font-black'
                      : 'bg-[#F8FAFC] text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-[#02122F]'
                  }`}
                >
                  {lang === 'ar' ? sport.labelAr : sport.labelEn}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-between lg:justify-start">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap hidden sm:inline">
                {lang === 'ar' ? 'ترتيب:' : 'Sort:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8FAFC] border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 focus:border-[#02122F] focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                <option value="recommended">{lang === 'ar' ? 'الأكثر طلباً' : 'Recommended'}</option>
                <option value="rating">{lang === 'ar' ? 'الأعلى تقييماً ⭐' : 'Highest Rated ⭐'}</option>
                <option value="price-asc">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              </select>

              {/* Mobile Filter Drawer Button */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#02122F] text-white text-xs font-bold shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#CFF40E]" />
                <span>{lang === 'ar' ? 'الفلاتر' : 'Filters'}</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#CFF40E] text-[#010A1A] text-[10px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

          </div>

          {/* Main Grid & Filters Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Desktop Filters Sidebar (3 cols) */}
            <aside
              className={`lg:col-span-3 bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col gap-6 shadow-sm ${
                mobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto bg-white' : 'hidden lg:flex'
              }`}
            >
              {/* Mobile Drawer Header */}
              <div className="flex items-center justify-between lg:hidden border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#04307C]" />
                  <span className="text-base font-bold text-[#02122F]">
                    {lang === 'ar' ? 'تصفية الملاعب' : 'Filter Courts'}
                  </span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sidebar Header with Reset */}
              <div className="hidden lg:flex items-center justify-between border-b border-slate-200/80 pb-4 text-start">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#04307C]" />
                  <span className="text-sm font-black text-[#02122F] uppercase tracking-wider">
                    {lang === 'ar' ? 'تصفية النتائج' : 'Filters'}
                  </span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#04307C] hover:underline flex items-center gap-1 font-bold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
                  </button>
                )}
              </div>

              {/* 1. المحافظة / المدينة (Governorate) */}
              <div className="text-start">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {lang === 'ar' ? 'المحافظة / المدينة' : 'Governorate'}
                </label>
                <div className="flex flex-col gap-1.5">
                  {EGYPT_CITIES.map((c) => {
                    const count = c.id === 'all'
                      ? DEMO_COURTS.length
                      : DEMO_COURTS.filter((item) => item.cityId === c.id).length;
                    
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedGovernorate(c.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-start cursor-pointer ${
                          selectedGovernorate === c.id
                            ? 'bg-[#02122F] text-white font-bold shadow-sm'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{lang === 'ar' ? c.ar : c.en}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-md font-montserrat ${
                          selectedGovernorate === c.id
                            ? 'bg-white/20 text-[#CFF40E]'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. نوع التجهيز (Court Features) */}
              <div className="border-t border-slate-100 pt-5 text-start">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {lang === 'ar' ? 'المواصفات والتجهيزات' : 'Court Features'}
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', labelAr: 'الكل (داخلي وخارجي)', labelEn: 'All Types' },
                    { id: 'panoramic', labelAr: 'بانورامي زجاجي حديث', labelEn: 'Panoramic Glass' },
                    { id: 'indoor', labelAr: 'مغطى ومكيف بالكامل', labelEn: 'Indoor Air-Conditioned' },
                  ].map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => setSelectedFeature(feat.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-start cursor-pointer ${
                        selectedFeature === feat.id
                          ? 'bg-[#02122F] text-white font-bold shadow-sm'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{lang === 'ar' ? feat.labelAr : feat.labelEn}</span>
                      {selectedFeature === feat.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#CFF40E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. الحد الأقصى للسعر (Price per Hour Slider) */}
              <div className="border-t border-slate-100 pt-5 text-start">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {lang === 'ar' ? 'أقصى سعر للساعة' : 'Max Hourly Rate'}
                  </label>
                  <span className="text-xs font-black text-[#04307C] font-montserrat">
                    {maxPrice} {lang === 'ar' ? 'ج.م' : 'EGP'}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="500"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#02122F] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-montserrat">
                  <span>200 ج.م</span>
                  <span>500 ج.م</span>
                </div>
              </div>

              {/* Mobile Drawer Submit Button */}
              <div className="mt-auto pt-4 border-t border-slate-200 lg:hidden">
                <Button
                  fullWidth
                  size="md"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  {lang === 'ar' ? `عرض (${filteredCourts.length}) ملاعب` : `Show (${filteredCourts.length}) Courts`}
                </Button>
              </div>

            </aside>

            {/* Courts Grid Section (9 cols) */}
            <section className="lg:col-span-9 flex flex-col gap-6">

              {/* Active Filter Badges Bar */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
                  <span className="text-slate-500 font-semibold text-start">
                    {lang === 'ar' ? 'الفلاتر النشطة:' : 'Active filters:'}
                  </span>

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span>"{searchQuery}"</span>
                      <button onClick={() => setSearchQuery('')} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedGovernorate !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span>{EGYPT_CITIES.find(c => c.id === selectedGovernorate)?.ar}</span>
                      <button onClick={() => setSelectedGovernorate('all')} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedSport !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span>{selectedSport === 'padel' ? 'بادل' : 'كرة قدم'}</span>
                      <button onClick={() => setSelectedSport('all')} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedFeature !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span>{selectedFeature === 'panoramic' ? 'بانورامي' : 'مغطى ومكيف'}</span>
                      <button onClick={() => setSelectedFeature('all')} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {maxPrice < 500 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span>حتى {maxPrice} ج.م</span>
                      <button onClick={() => setMaxPrice(500)} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-rose-500 hover:text-rose-600 font-bold ml-auto rtl:mr-auto rtl:ml-0"
                  >
                    {lang === 'ar' ? 'مسح الكل' : 'Clear all'}
                  </button>
                </div>
              )}

              {/* No Results Found Empty State */}
              {filteredCourts.length === 0 && (
                <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl flex flex-col items-center gap-4 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-black text-[#02122F]">
                    {lang === 'ar' ? 'لم نجد ملاعب مطابقة لخيارات البحث' : 'No Courts Match Your Search'}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md">
                    {lang === 'ar'
                      ? 'جرّب تغيير الكلمات المفتاحية، اختيار محافظة أخرى، أو زيادة حد السعر الأقصى.'
                      : 'Try broadening your filters or resetting search keywords.'}
                  </p>
                  <Button size="md" onClick={handleResetFilters}>
                    {lang === 'ar' ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}
                  </Button>
                </div>
              )}

              {/* Courts Grid */}
              {filteredCourts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourts.map((court) => (
                    <div
                      key={court.id}
                      className="bg-white border border-slate-200/90 hover:border-[#02122F] rounded-2xl group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-sm hover:shadow-xl"
                    >
                      {/* Court Image (~52% height) */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <img
                          src={court.image}
                          alt={lang === 'ar' ? court.nameAr : court.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                        {/* Top Left Sport Tag */}
                        <div className="absolute top-3 left-3 rtl:right-auto rtl:left-3 ltr:left-auto ltr:right-3 bg-[#010A1A]/90 backdrop-blur-md text-white border border-white/20 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase">
                          {court.sportType === 'football' ? '⚽ Football' : '🎾 Padel'}
                        </div>

                        {/* Top Right Rating Badge */}
                        <div className="absolute top-3 right-3 rtl:left-auto rtl:right-3 ltr:right-auto ltr:left-3 bg-[#010A1A]/90 backdrop-blur-md text-[#CFF40E] border border-white/20 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 font-montserrat">
                          <Star className="w-3.5 h-3.5 fill-[#CFF40E] text-[#CFF40E]" />
                          <span>{court.rating}</span>
                          <span className="text-slate-300 font-normal">({court.reviewsCount})</span>
                        </div>

                        {/* Bottom Surface Badge on Image */}
                        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] text-white">
                          <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20 font-semibold truncate max-w-[200px]">
                            {lang === 'ar' ? court.surfaceAr : court.surfaceEn}
                          </span>
                          <span className="text-[#CFF40E] font-bold bg-[#010A1A]/80 px-2 py-0.5 rounded">
                            {court.badgeAr}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4 text-start bg-white">
                        
                        <div>
                          {/* Location with City Icon */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#04307C] shrink-0" />
                            <span className="truncate">{lang === 'ar' ? court.locationAr : court.locationEn}</span>
                          </div>

                          {/* Court Name */}
                          <h3 className="text-lg font-black text-[#02122F] group-hover:text-[#04307C] transition-colors leading-tight">
                            {lang === 'ar' ? court.nameAr : court.nameEn}
                          </h3>

                          {/* Facilities Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {(lang === 'ar' ? court.facilitiesAr : court.facilities)?.slice(0, 3).map((fac, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded"
                              >
                                {fac}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Available Slots Quick Picker */}
                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#04307C]" />
                              <span>{lang === 'ar' ? 'المواعيد الشاغرة الليلة:' : 'Available tonight:'}</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {court.availableSlots?.map((slot, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => handleOpenBookingModal(court.id, slot)}
                                className="py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-[#CFF40E] text-slate-800 hover:text-[#010A1A] border border-slate-200 text-[11px] font-montserrat font-bold transition-colors cursor-pointer text-center"
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Hourly Price & Booking CTA */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <div>
                            <div className="text-xl font-black text-[#02122F] font-montserrat tracking-tight leading-none">
                              {court.pricePerHour} <span className="text-xs font-semibold text-slate-500">{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {lang === 'ar' ? 'لكل 60 دقيقة' : 'per hour'}
                            </span>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => handleOpenBookingModal(court.id)}
                          >
                            {lang === 'ar' ? 'احجز الملعب' : 'Book Court'}
                          </Button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </section>

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courtId={activeCourtId}
        initialSlot={activeSlot}
      />

    </div>
  );
}

export default function CourtsPage() {
  return (
    <LanguageProvider>
      <CourtsDirectoryContent />
    </LanguageProvider>
  );
}
