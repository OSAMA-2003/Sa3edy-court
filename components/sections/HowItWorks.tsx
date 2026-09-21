'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Calendar, ShieldCheck, Zap } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';

export const HowItWorks: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-20 bg-white border-b border-slate-200" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

        <div className="flex flex-col items-center text-center">
          <span className="font-grotesk text-xs font-bold text-[#0A58CA] tracking-wider uppercase bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            {lang === 'ar' ? 'خطوات الحجز' : 'BOOKING STEPS'}
          </span>
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="font-cairo font-black text-2xl sm:text-3xl text-[#02122F] mt-3"
          >
            {lang === 'ar' ? 'إزاي تحجز في ثواني؟' : 'How To Book In Seconds?'}
          </TextAnimate>
          <p className="font-cairo text-slate-500 text-sm mt-2">
            {lang === 'ar' ? 'ثلاث خطوات سهلة لضمان وقتك في الملعب.' : '3 easy steps to lock your court time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Step 1 */}
          <div className="p-7 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-[#0A58CA]/40 text-start flex flex-col gap-4 transition-all shadow-sm hover:shadow-md">
            <span className="font-grotesk font-black text-4xl text-[#0A58CA]">01</span>
            <h3 className="font-cairo font-bold text-lg text-[#02122F]">
              {lang === 'ar' ? 'اختار الملعب والمنطقة' : 'Select Venue & Location'}
            </h3>
            <p className="font-cairo text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'استعرض ملاعب القاهرة الكبرى والساحل مع صور حقيقية ومواصفات الأرضية.'
                : 'Browse Greater Cairo & Sahel courts with authentic photos & surface specs.'}
            </p>
          </div>

          {/* Step 2 (Highlighted Royal Navy Card) */}
          <div className="p-7 rounded-2xl bg-[#04307C] text-white border-2 border-[#04307C] text-start flex flex-col gap-4 shadow-lg relative overflow-hidden">
            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-[#CFF40E]/10"></div>
            <span className="font-grotesk font-black text-4xl text-[#CFF40E]">02</span>
            <h3 className="font-cairo font-bold text-lg text-white">
              {lang === 'ar' ? 'حدد الميعاد المتاح' : 'Pick Available Time Slot'}
            </h3>
            <p className="font-cairo text-xs text-slate-200 leading-relaxed">
              {lang === 'ar'
                ? 'جدول مواعيد شاغرة لحظي ومباشر بدون تضارب أو مكالمات تأكيد.'
                : 'Live real-time slot schedule without conflict or confirmation calls.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-[#0A58CA]/40 text-start flex flex-col gap-4 transition-all shadow-sm hover:shadow-md">
            <span className="font-grotesk font-black text-4xl text-[#0A58CA]">03</span>
            <h3 className="font-cairo font-bold text-lg text-[#02122F]">
              {lang === 'ar' ? 'ادفع بالتليفون علطول ' : 'Enter With QR Code'}
            </h3>
            <p className="font-cairo text-xs text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'ادفع بالهاتف المحمول بكل سهولة وأمان عبر نظام فوري مع تأكيد فوري عبر الرسائل القصيرة.'
                : 'Pay by mobile phone with ease and security through an instant system with immediate confirmation via SMS.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
