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
    <section className="w-full py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200 text-[#02122F] relative overflow-hidden" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#04307C]/10 border border-[#04307C]/20 text-[#04307C] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{lang === 'ar' ? 'مجتمع لاعبي الصعيد' : 'PLAYER COMMUNITY'}</span>
          </div>
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="text-3xl sm:text-4xl font-black text-[#02122F]"
          >
            {lang === 'ar' ? 'آراء وتجارب لاعبينا وأصحاب الملاعب' : 'Player & Venue Experiences'}
          </TextAnimate>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {lang === 'ar'
              ? 'أكتر من 500 ماتش أسبوعياً بيتحجزوا عن طريق المنصة بتأكيد فوري ورضا كامل.'
              : 'Over 500 matches booked weekly through our platform with 100% instant confirmation.'}
          </p>
        </div>

        {/* Double Row Marquee with Wider Cards */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-6">

          {/* Row 1: Forward Marquee */}
          <Marquee pauseOnHover className="[--duration:35s]">
            {firstRow.map((item) => (
              <figure
                key={item.id}
                className="relative w-88 sm:w-[400px] cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#02122F] p-6 transition-all text-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-montserrat text-xs text-slate-400 font-medium">
                      {item.username || '@player'}
                    </span>
                  </div>
                  <blockquote className="text-sm text-slate-700 leading-relaxed mb-4 font-normal">
                    "{lang === 'ar' ? item.commentAr : item.commentEn}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarBg} font-black flex items-center justify-center text-sm shadow-sm shrink-0 text-white`}
                  >
                    {item.avatarLetter}
                  </div>
                  <div className="flex flex-col text-start overflow-hidden">
                    <figcaption className="font-bold text-sm text-[#02122F] truncate">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </figcaption>
                    <span className="text-xs text-slate-500 truncate font-normal">
                      {lang === 'ar' ? item.roleAr : item.roleEn}
                    </span>
                  </div>
                </div>
              </figure>
            ))}
          </Marquee>

          {/* Row 2: Reverse Marquee */}
          <Marquee reverse pauseOnHover className="[--duration:35s]">
            {secondRow.map((item) => (
              <figure
                key={item.id}
                className="relative w-88 sm:w-[400px] cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-[#02122F] p-6 transition-all text-start flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-montserrat text-xs text-slate-400 font-medium">
                      {item.username || '@player'}
                    </span>
                  </div>
                  <blockquote className="text-sm text-slate-700 leading-relaxed mb-4 font-normal">
                    "{lang === 'ar' ? item.commentAr : item.commentEn}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-full ${item.avatarBg} font-black flex items-center justify-center text-sm shadow-sm shrink-0 text-white`}
                  >
                    {item.avatarLetter}
                  </div>
                  <div className="flex flex-col text-start overflow-hidden">
                    <figcaption className="font-bold text-sm text-[#02122F] truncate">
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </figcaption>
                    <span className="text-xs text-slate-500 truncate font-normal">
                      {lang === 'ar' ? item.roleAr : item.roleEn}
                    </span>
                  </div>
                </div>
              </figure>
            ))}
          </Marquee>

          {/* Left & Right Gradient Fades (White / Light Fade instead of dark blue) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10"></div>

        </div>

      </div>
    </section>
  );
};

