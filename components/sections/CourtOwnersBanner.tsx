'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { TextAnimate } from '../ui/text-animate';
import { Button } from '../ui/Button';

export const CourtOwnersBanner: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-20 bg-white border-b border-slate-200" id="court-owners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#04307C] via-[#041B3D] to-[#010A1A] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-start shadow-2xl border border-white/10 [clip-path:polygon(0%_1.5rem,1.5rem_0%,100%_0%,100%_calc(100%-1.5rem),calc(100%-1.5rem)_100%,0%_100%)]">
          <div>
            <span className="font-bold text-xs text-[#CFF40E] mb-2 block uppercase tracking-wider">
              {lang === 'ar' ? 'لأصحاب الملاعب والأندية' : 'FOR VENUE OWNERS & CLUBS'}
            </span>
            <TextAnimate
              animation="slideRight"
              by="word"
              as="h2"
              className="font-black text-2xl sm:text-4xl text-white mb-3"
            >
              {lang === 'ar' ? 'انضم لأكبر شبكة ملاعب باديل وخماسي بالصعيد' : 'Join Upper Egypt’s Largest Venue Network'}
            </TextAnimate>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed font-normal">
              {lang === 'ar'
                ? 'أدر حجوزات ناديك رقمياً بالكامل، امنع تضارب المواعيد، وضاعف معدل الإشغال مع نظام دفع مسبق 24/7.'
                : 'Digitize 100% of your club bookings, eliminate schedule overlaps, and boost occupancy with 24/7 prepayments.'}
            </p>
          </div>
          <div className="shrink-0">
            <Button
              size="lg"
              onClick={() => alert('Opening Venue Partner Registration Form...')}
            >
              {lang === 'ar' ? 'سجّل ملعبك مجاناً' : 'Register Your Venue Free'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
