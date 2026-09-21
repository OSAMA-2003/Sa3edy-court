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
    <section className="w-full pt-20 sm:pt-30 pb-16 lg:pb-20 bg-[#F8FAFC] border-b border-slate-200 text-[#02122F] relative overflow-hidden" id="courts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* Section Title & Controls Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col items-start text-start">

            <TextAnimate
              animation="slideLeft"
              by="word"
              as="h2"
              className="text-2xl sm:text-4xl font-black text-[#02122F]"
            >
              {lang === 'ar' ? 'الملاعب الأكثر حجزًا' : 'Most Popular Courts'}
            </TextAnimate>
            <p className="text-slate-600 text-sm mt-1 max-w-xl font-medium">
              {lang === 'ar'
                ? 'ملاعب باديل وخماسي معتمدة مع أرضيات احترافية وإضاءة ليلية متكاملة.'
                : 'Certified Padel & 5v5 football courts with pro surfaces and floodlit nights.'}
            </p>
          </div>

          {/* Controls: Explore All Link & Carousel Arrows */}
          <div className="flex items-center gap-3">
            <a
              href="/courts"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 hover:border-[#02122F] text-xs font-bold text-[#02122F] transition-all shadow-sm group"
            >
              <span>{lang === 'ar' ? 'عرض جميع الملاعب والفلترة' : 'All Courts & Filters'}</span>
              <span className="text-[#04307C] group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition-transform font-bold">
                {lang === 'ar' ? '←' : '→'}
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#02122F] hover:bg-[#02122F] flex items-center justify-center text-slate-800 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5 rtl:block ltr:hidden" />
                <ChevronLeft className="w-5 h-5 rtl:hidden ltr:block" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 hover:border-[#02122F] hover:bg-[#02122F] flex items-center justify-center text-slate-800 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 rtl:block ltr:hidden" />
                <ChevronRight className="w-5 h-5 rtl:hidden ltr:block" />
              </button>
            </div>
          </div>
        </div>

        {/* Court Cards Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-1"
        >
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="snap-start shrink-0 w-[300px] sm:w-[340px] bg-white border border-slate-200/90 hover:border-[#02122F] rounded-2xl group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image Header ~50-55% height */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={court.image}
                  alt={lang === 'ar' ? court.nameAr : court.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                {/* Sport Type Badge */}
                <div className="absolute top-3 left-3 bg-[#010A1A]/90 backdrop-blur-md text-white border border-white/20 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase">
                  {court.type === 'football' ? 'Football' : 'Padel'}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#010A1A]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-white flex items-center gap-1 border border-white/15 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#CFF40E] text-[#CFF40E]" />
                  <span>{court.rating}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex flex-col justify-between flex-1 text-start gap-4 bg-white">
                <div>
                  <h3 className="font-black text-lg text-[#02122F] group-hover:text-[#04307C] transition-colors leading-snug">
                    {lang === 'ar' ? court.nameAr : court.nameEn}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#04307C] shrink-0" />
                    <span>
                      {lang === 'ar' ? court.locationAr : court.locationEn} · {court.type === 'football' ? 'كرة قدم' : 'بادل'}
                    </span>
                  </p>
                </div>

                {/* Price & Primary CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-montserrat font-black text-2xl text-[#02122F]">
                      {court.pricePerHour}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 ms-1.5">
                      {lang === 'ar' ? 'ج.م / ساعة' : 'EGP / hr'}
                    </span>
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
