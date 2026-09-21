'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_TESTIMONIALS } from '../../data';
import { Star } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { Marquee } from '../ui/marquee';

export const Testimonials: React.FC = () => {
  const { lang } = useLanguage();

  const firstRow = DEMO_TESTIMONIALS.slice(0, Math.ceil(DEMO_TESTIMONIALS.length / 2));
  const secondRow = DEMO_TESTIMONIALS.slice(Math.ceil(DEMO_TESTIMONIALS.length / 2));

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-slate-200 relative overflow-hidden" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-cairo font-bold text-xs text-[#0A58CA] uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            {lang === 'ar' ? 'مجتمع الصعيد الرياضي' : 'UPPER EGYPT COMMUNITY'}
          </span>
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="font-cairo font-black text-3xl sm:text-4xl text-[#02122F] mt-3"
          >
            {lang === 'ar' ? 'آراء وتجارب لاعبينا وأصحاب الملاعب بالصعيد' : 'Player & Owner Experiences'}
          </TextAnimate>
          <p className="font-cairo text-slate-600 text-sm sm:text-base mt-2">
            {lang === 'ar'
              ? 'أكتر من 500 ماتش أسبوعياً بيتحجزوا عن طريق المنصة برضا كامل وتأكيد فوري.'
              : 'Over 500 matches booked weekly through our platform with 100% instant confirmation.'}
          </p>
        </div>

        {/* Magic UI Marquee Double Row */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
          
          {/* Row 1: Forward Marquee */}
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((item) => (
              <figure
                key={item.id}
                className="relative w-80 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/90 p-5 transition-all text-start flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="font-grotesk text-[10px] text-slate-400 font-medium">
                      {item.username || '@user'}
                    </span>
                  </div>
                  <blockquote className="font-cairo text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    "{lang === 'ar' ? item.commentAr : item.commentEn}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                  <div
                    className={`w-9 h-9 rounded-full ${item.avatarBg} font-cairo font-black flex items-center justify-center text-sm shadow-xs shrink-0`}
                  >
                    {item.avatarLetter}
                  </div>
                  <div className="flex flex-col text-start overflow-hidden">
                    <figcaption className="font-cairo font-bold text-xs text-[#02122F] truncate">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </figcaption>
                    <span className="font-cairo text-[11px] text-slate-500 truncate">
                      {lang === 'ar' ? item.roleAr : item.roleEn}
                    </span>
                  </div>
                </div>
              </figure>
            ))}
          </Marquee>

          {/* Row 2: Reverse Marquee */}
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {secondRow.map((item) => (
              <figure
                key={item.id}
                className="relative w-80 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/90 p-5 transition-all text-start flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="font-grotesk text-[10px] text-slate-400 font-medium">
                      {item.username || '@user'}
                    </span>
                  </div>
                  <blockquote className="font-cairo text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    "{lang === 'ar' ? item.commentAr : item.commentEn}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                  <div
                    className={`w-9 h-9 rounded-full ${item.avatarBg} font-cairo font-black flex items-center justify-center text-sm shadow-xs shrink-0`}
                  >
                    {item.avatarLetter}
                  </div>
                  <div className="flex flex-col text-start overflow-hidden">
                    <figcaption className="font-cairo font-bold text-xs text-[#02122F] truncate">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </figcaption>
                    <span className="font-cairo text-[11px] text-slate-500 truncate">
                      {lang === 'ar' ? item.roleAr : item.roleEn}
                    </span>
                  </div>
                </div>
              </figure>
            ))}
          </Marquee>

          {/* Left & Right Gradient Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent z-10"></div>

        </div>

      </div>
    </section>
  );
};
