'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CalendarCheck, Award, Users, Trophy } from 'lucide-react';

export const HeroStats: React.FC = () => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      id: 'stat-1',
      num: '12K+',
      labelAr: 'حجز مؤكد بالمنصة',
      labelEn: 'Confirmed Bookings',
      icon: CalendarCheck,
      descAr: 'خلال الأشهر الأخيرة بمحافظات الصعيد',
      descEn: 'Across Upper Egypt governorates',
    },
    {
      id: 'stat-2',
      num: '99%',
      labelAr: 'نسبة رضا اللاعبين',
      labelEn: 'Player Satisfaction',
      icon: Award,
      descAr: 'تقييمات موثقة من لاعبي الصعيد',
      descEn: 'Verified player reviews & ratings',
    },
    {
      id: 'stat-3',
      num: '5K+',
      labelAr: 'لاعب نشط بالصعيد',
      labelEn: 'Active Players',
      icon: Users,
      descAr: 'مجتمع رياضي متنامي أسبوعياً',
      descEn: 'Fast growing local sports community',
    },
    {
      id: 'stat-4',
      num: '28+',
      labelAr: 'ملعب بادل وخماسي',
      labelEn: 'Certified Venues',
      icon: Trophy,
      descAr: 'ملاعب معتمدة بأسيوط وسوهاج',
      descEn: 'Approved courts in Assiut & Sohag',
    },
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-white border-b border-slate-200 text-[#02122F] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">

        {/* Intro 3-Card Row (Matching reference image "About Playdel" layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Card 1: Dark Navy Feature Card with Cut Corners */}
          <div className="hidden lg:col-span-5 p-7 rounded-2xl bg-[#041B3D] text-white shadow-xl md:flex flex-col justify-between gap-6 text-start [clip-path:polygon(0%_1rem,1rem_0%,100%_0%,100%_calc(100%-1rem),calc(100%-1rem)_100%,0%_100%)] border border-white/10">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#04307C] flex items-center justify-center text-[#CFF40E] mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white leading-snug">
                {lang === 'ar'
                  ? 'ملاعب صلبة وبانورامية بمعايير البطولات الرسمية وأرضيات موندو الدولية'
                  : 'Professional panoramic & turf courts with tournament-grade lighting'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-normal">
                {lang === 'ar'
                  ? 'تحكم كامل بالمناخ والإضاءة الليلية للعب في أفضل الظروف طوال فصول العام.'
                  : 'Play in perfect condition with pro LED lighting, anytime, in any season.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-xs text-[#CFF40E] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CFF40E] animate-pulse"></span>
              <span>{lang === 'ar' ? 'نظام الحجز المباشر • 24/7' : 'Live Booking System • 24/7'}</span>
            </div>
          </div>

          {/* Card 2: Photo Card with Cut Corners */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-lg min-h-[200px] border border-slate-200 [clip-path:polygon(1rem_0%,100%_0%,100%_calc(100%-1rem),calc(100%-1rem)_100%,0%_100%,0%_1rem)] group">
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
              alt="Padel & Football Training"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02122F]/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 inset-x-4 text-start">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#CFF40E] block mb-1">
                {lang === 'ar' ? 'مباريات وتدريبات' : 'Training & Matches'}
              </span>
              <h4 className="text-base font-bold text-white leading-tight">
                {lang === 'ar' ? 'حجوزات فردية وجماعية وبطولات شهرية' : 'Private & Group Squad Matches'}
              </h4>
            </div>
          </div>

          {/* Card 3: Platform Quality Metrics */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hidden md:flex flex-col justify-between text-start">
            <div>
              <div className="text-3xl font-black text-[#02122F] font-montserrat">
                100<span className="text-[#04307C]">+</span>
              </div>
              <h4 className="text-sm font-bold text-[#02122F] mt-1">
                {lang === 'ar' ? 'حكم ومنسق معتمد' : 'Certified Officials'}
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-normal">
                {lang === 'ar' ? 'إدارة تنظيمية للمباريات والمنافسات بالصعيد.' : 'Dedicated field coordinators across Upper Egypt.'}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>{lang === 'ar' ? 'بادل بانورامي' : 'Padel Pro'}</span>
                <span className="text-[#04307C]">98%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full rounded-full bg-[#04307C] w-[98%]"></div>
              </div>
            </div>
          </div>

        </div>

        {/* The 4 Core Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200">
          {stats.map((item) => (
            <div key={item.id} className="text-start flex flex-col gap-1">
              <div className="text-3xl sm:text-5xl font-black text-[#02122F] tracking-tight font-montserrat flex items-baseline gap-1">
                <span>{item.num}</span>
                <span className="w-2 h-2 rounded-full bg-[#CFF40E]"></span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </h4>
              <p className="text-xs text-slate-500 font-normal">
                {lang === 'ar' ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
