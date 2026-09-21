'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PLATFORM_STATS } from '../../data';
import { Button } from '../ui/Button';
import { TextAnimate } from '../ui/text-animate';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Trophy, Users, CalendarCheck, Zap, Sparkles } from 'lucide-react';

const STAT_ICONS: Record<string, React.ElementType> = {
  'stat-1': Trophy,
  'stat-2': Users,
  'stat-3': CalendarCheck,
  'stat-4': Zap,
};

interface HeroProps {
  onSearch: () => void;
  onOpenBookingModal: (courtId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenBookingModal }) => {
  const { lang } = useLanguage();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* HERO SECTION WITH EXPLICIT RESPONSIVE BACKGROUND & FULL VIEWPORT HEIGHT */
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center hero-bg pt-28 sm:pt-32 pb-24 sm:pb-28 border-b border-slate-800/80">

      {/* Soft Dark Overlay to enhance contrast while keeping the background image crisp and visible */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-[#010A1A]/85 via-[#010A1A]/60 to-[#010A1A]/40 backdrop-blur-[1px]"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">

          {/* Left Column Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">



            <TextAnimate
              animation="blurInUp"
              by="word"
              as="h1"
              className="text-center md:text-start font-cairo font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 drop-shadow-md"
            >
              {lang === 'ar'
                ? 'احجز ماتشك في ملاعب البادل وكرة القدم بالصعيد'
                : 'Book Padel & Football Courts in Assiut, Sohag & Upper Egypt'}
            </TextAnimate>

            <p className="hidden md:block font-cairo text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl mb-7 font-medium drop-shadow-sm bg-[#010A1A]/60 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
              {lang === 'ar'
                ? 'منصة حجز ملاعب البادل وكرة القدم (خماسي وسباعي) الأولى بأسيوط وسوهاج والصعيد. جداول موعدك بالدقيقة بدون مكالمات هاتفية.'
                : 'Upper Egypt’s premier Padel & Football 5v5/7v7 court booking platform across Assiut, Sohag & Upper Egypt. Instant confirmation.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start pt-20 md:pt-5 gap-4 w-full sm:w-auto">
              <Button size="lg" onClick={() => onOpenBookingModal()}>
                {lang === 'ar' ? 'احجز ملعبك الآن' : 'Book Your Court Now'}
              </Button>

              <a href="#court-owners-section">
                <Button variant="secondary" size="lg">
                  {lang === 'ar' ? 'سجّل ملعبك' : 'Register Venue'}
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column Featured Card Preview */}
          {/* <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 bg-[#010A1A]/80 shadow-2xl backdrop-blur-md">
                <div className="h-80 sm:h-96 w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1000"
                    alt="ملعب بادل معتمد بمصر"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010A1A] via-[#010A1A]/30 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 bg-[#010A1A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-cairo text-[#CFF40E] font-bold flex items-center gap-2 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{lang === 'ar' ? 'بادل أرينا • متاح الليلة' : 'Padel Arena • Available Tonight'}</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#010A1A]/90 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-lg">
                    <div className="text-start">
                      <h3 className="font-cairo font-bold text-white text-sm">
                        {lang === 'ar' ? 'سنتر كورت أرينا' : 'Center Court Arena'}
                      </h3>
                      <p className="font-cairo text-xs text-slate-300">
                        {lang === 'ar' ? 'الشيخ زايد • أرضية بانوراما WPT' : 'Sheikh Zayed • WPT Panoramic Turf'}
                      </p>
                    </div>
                    <div className="text-end">
                      <span className="font-grotesk font-black text-[#CFF40E] text-xl">
                        450 <span className="text-xs text-slate-300 font-cairo font-normal">ج.م/ساعة</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

        </div>

      </div>
      {/* ABSOLUTE FLOATING PROGRESS BAR RIBBON OVERLAPPING HERO & NEXT SECTION */}
      <div className="absolute bottom-0 translate-y-1/2 inset-x-0 mx-auto w-full max-w-6xl px-3 sm:px-6 z-30">
        <div className="bg-[#CFF40E] text-[#010A1A] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-lime-300/80 backdrop-blur-xl">


          {/* 4 Animated Progress Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {PLATFORM_STATS.map((st, index) => {
              const Icon = STAT_ICONS[st.id] || Trophy;
              return (
                <div
                  key={st.id}
                  // Added `index >= 2 ? 'hidden lg:flex' : 'flex'` to hide items 3 and 4 on small screens
                  className={`flex-col justify-between gap-2 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#010A1A]/10 border border-[#010A1A]/15 backdrop-blur-md transition-all duration-300 hover:bg-[#010A1A]/15 hover:shadow-md hover:-translate-y-0.5 group ${index >= 2 ? 'hidden lg:flex' : 'flex'
                    }`}
                >
                  {/* Top Row: Icon + Value & Animated Percentage Badge */}
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#010A1A] text-[#CFF40E] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-grotesk font-black text-lg sm:text-2xl text-[#010A1A] tracking-tight leading-none">
                        <AnimatedCounter
                          end={st.value}
                          prefix={st.prefix}
                          suffix={st.suffix}
                          duration={1600}
                          trigger={animated}
                        />
                      </span>
                    </div>

                    {/* Animated Percentage Badge */}
                    <span className="font-grotesk font-black text-[10px] sm:text-[11px] bg-[#010A1A] text-[#CFF40E] px-2 py-0.5 rounded-full shadow-md shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CFF40E] animate-pulse" />
                      <AnimatedCounter
                        end={st.progress}
                        suffix="%"
                        duration={1600}
                        trigger={animated}
                      />
                    </span>
                  </div>

                  {/* The Animated Progress Bar Track with Guideline Notches & Glowing Tip */}
                  <div className="relative w-full my-0.5">
                    <div className="w-full bg-[#010A1A]/20 rounded-full h-2 sm:h-2.5 overflow-hidden p-[2px] border border-[#010A1A]/15 shadow-inner relative">
                      {/* Animated Fill Bar */}
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#010A1A] via-[#04307C] to-[#010A1A] relative shadow-sm"
                        style={{
                          width: animated ? `${st.progress}%` : '0%',
                          transition: 'width 1600ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {/* Shimmer light sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[pulse_2s_infinite] rounded-full" />

                        {/* Glowing Tip Indicator Dot */}
                        <span className="absolute top-1/2 -translate-y-1/2 end-0.5 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#CFF40E] border border-[#010A1A] shadow-[0_0_6px_#CFF40E]" />
                      </div>
                    </div>
                  </div>

                  {/* Metric Label & Growth Badge */}
                  <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px]">
                    <span className="font-cairo font-black text-[#010A1A] tracking-wide truncate">
                      {lang === 'ar' ? st.labelAr : st.labelEn}
                    </span>
                    <span className="font-grotesk font-extrabold text-[#010A1A]/80 bg-[#010A1A]/10 px-1.5 py-0.5 rounded-md shrink-0">
                      {lang === 'ar' ? st.growthAr : st.growthEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
