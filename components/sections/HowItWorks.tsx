'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MapPin, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';

export const HowItWorks: React.FC = () => {
  const { lang } = useLanguage();

  const steps = [
    {
      num: '01',
      titleAr: 'اختر الملعب',
      titleEn: 'Choose Court',
      descAr: 'تصفح ملاعب البادل وكرة القدم بالصعيد مع صور حقيقية، نوع الأرضية، والتقييم.',
      descEn: 'Browse Padel & Football courts in Upper Egypt with real photos, turf type & ratings.',
      icon: MapPin,
    },
    {
      num: '02',
      titleAr: 'حدد الموعد',
      titleEn: 'Pick Time Slot',
      descAr: 'اختر الساعة المناسبة لفرقتك من جدول المواعيد المباشر الشاغر لحظياً.',
      descEn: 'Select the best time slot for your squad from real-time live availability.',
      icon: Calendar,
    },
    {
      num: '03',
      titleAr: 'احجز والعب',
      titleEn: 'Book & Play',
      descAr: 'ادفع إلكترونياً وتأكيد فوري بالرسائل القصيرة، ادخل الملعب بدون مكالمات هاتفية.',
      descEn: 'Instant confirmation & mobile payment, show up at the court ready to play.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-slate-200 text-[#02122F] relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#04307C]/10 border border-[#04307C]/20 text-[#04307C] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{lang === 'ar' ? 'خطوات الحجز السريعة' : 'HOW IT WORKS'}</span>
          </div>
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="text-3xl sm:text-4xl font-black text-[#02122F]"
          >
            {lang === 'ar' ? 'إزاي تحجز في ثواني؟' : 'How To Book In Seconds?'}
          </TextAnimate>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {lang === 'ar' ? 'ثلاث خطوات بسيطة ومباشرة تضمن لك وقتك بالملعب.' : '3 simple steps to secure your match without phone calls.'}
          </p>
        </div>

        {/* 3-Step Connected Journey */}
        <div className="relative">
          
          {/* Subtle Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-y-6 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-7 rounded-2xl bg-white border border-slate-200 hover:border-[#02122F] hover:shadow-xl transition-all text-start flex flex-col gap-4 shadow-sm group hover:-translate-y-1 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-black text-4xl text-[#02122F] group-hover:text-[#04307C] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#04307C] border border-white/10 flex items-center justify-center text-[#CFF40E] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#02122F] group-hover:text-[#04307C] transition-colors">
                      {lang === 'ar' ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                      {lang === 'ar' ? step.descAr : step.descEn}
                    </p>
                  </div>

                  {idx < 2 && (
                    <div className="md:hidden flex justify-center pt-2 text-[#04307C]">
                      ↓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

