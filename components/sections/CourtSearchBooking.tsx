'use client';

import React, { useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_COURTS, EGYPT_CITIES } from '../../data';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextAnimate } from '../ui/text-animate';

interface CourtSearchBookingProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  onOpenBookingModal: (courtId: string, slot?: string) => void;
}

export const CourtSearchBooking: React.FC<CourtSearchBookingProps> = ({
  selectedCity,
  setSelectedCity,
  onOpenBookingModal,
}) => {
  const { lang } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredCourts = DEMO_COURTS.filter((court) => {
    return selectedCity === 'all' || court.cityId === selectedCity;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      const isRtl = lang === 'ar';
      const multiplier = direction === 'left' ? (isRtl ? 1 : -1) : (isRtl ? -1 : 1);
      carouselRef.current.scrollBy({ left: scrollAmount * multiplier, behavior: 'smooth' });
    }
  };

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-28 sm:pt-32 pb-16 lg:pb-20 bg-[#02122F] border-b border-slate-800 text-white relative overflow-hidden" id="courts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* Section Title & Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col items-start text-start">

            <TextAnimate
              animation="slideLeft"
              by="word"
              as="h2"
              className="font-cairo font-black text-2xl sm:text-4xl text-white"
            >
              {lang === 'ar' ? 'الملاعب المتاحة للحجز الفوري' : 'Instant Booking Courts'}
            </TextAnimate>
            <p className="font-cairo text-slate-300 text-sm mt-1">
              {lang === 'ar'
                ? 'اختر ملعبك في أسيوط وسوهاج والمنيا وقنا، ملاعب باديل وكرة قدم معتمدة.'
                : 'Choose your court in Assiut, Sohag & Upper Egypt.'}
            </p>
          </div>

          {/* Navigation Controls & City Selector */}
          <div className="flex flex-wrap items-center gap-3 justify-between md:justify-end">
            {/* <div className="flex flex-wrap items-center gap-2">
              {EGYPT_CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCityChange(city.id)}
                  className={`px-3.5 py-1.5 rounded-full font-cairo text-xs transition-all cursor-pointer ${selectedCity === city.id
                    ? 'font-black bg-[#CFF40E] text-[#010A1A] shadow-md border border-[#CFF40E]'
                    : 'font-semibold bg-[#010A1A]/60 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                    }`}
                >
                  {lang === 'ar' ? city.ar : city.en}
                </button>
              ))}
            </div> */}

            {/* Carousel Arrow Navigation Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous"
                className="w-9 h-9 rounded-full bg-[#010A1A] border border-slate-700 hover:border-[#CFF40E] flex items-center justify-center text-white hover:text-[#CFF40E] transition-all cursor-pointer shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />

              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next"
                className="w-9 h-9 rounded-full bg-[#010A1A] border border-slate-700 hover:border-[#CFF40E] flex items-center justify-center text-white hover:text-[#CFF40E] transition-all cursor-pointer shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Court Cards Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 px-1"
        >
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="snap-start shrink-0 w-[290px] sm:w-[320px] lg:w-[340px] cyber-card rounded-2xl group overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-52 w-full overflow-hidden bg-[#010A1A]">
                <img
                  src={court.image}
                  alt={lang === 'ar' ? court.nameAr : court.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B3D] via-transparent to-black/20"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#010A1A]/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-[#CFF40E] flex items-center gap-1 font-grotesk border border-slate-700 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#CFF40E] text-[#CFF40E]" />
                  <span>{court.rating}</span>
                </div>

                {/* Badge Type */}
                <div className="absolute top-3 left-3 bg-[#CFF40E] text-[#010A1A] px-2.5 py-0.5 rounded text-[10px] font-grotesk font-black uppercase shadow-md">
                  {court.type === 'football' ? 'FOOTBALL 5v5' : 'PADEL PANORAMIC'}
                </div>

                {/* Available Slot Pill */}
                <div className="absolute bottom-3 right-3 bg-[#010A1A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/50 text-[11px] font-cairo font-bold text-emerald-400">
                  ⚡ {court.availableSlotAr}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col justify-between flex-1 text-start gap-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-cairo font-black text-lg text-white group-hover:text-[#CFF40E] transition-colors">
                      {lang === 'ar' ? court.nameAr : court.nameEn}
                    </h3>
                  </div>

                  <p className="font-cairo text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#CFF40E] shrink-0" />
                    <span>{lang === 'ar' ? court.locationAr : court.locationEn}</span>
                  </p>
                </div>

                {/* Card Footer Price & Button */}
                <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-grotesk font-black text-xl text-[#CFF40E]">
                      {court.pricePerHour}
                    </span>
                    <span className="font-cairo text-xs text-slate-300 ms-1 font-medium">ج.م/س</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onOpenBookingModal(court.id)}
                  >
                    {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
