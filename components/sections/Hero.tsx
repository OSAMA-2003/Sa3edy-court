'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';
import { TextAnimate } from '../ui/text-animate';
import { Compass, Sparkles, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onSearch: () => void;
  onOpenBookingModal: (courtId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenBookingModal }) => {
  const { lang } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-white text-[#02122F] pt-28 sm:pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-slate-200">

      {/* Background subtle court lines & athletic mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CFF40E]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-slate-100 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left / Text & Booking Badge Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">

            {/* Top Verified Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#02122F] text-xs font-bold mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#04307C] animate-pulse"></span>
              <span>{lang === 'ar' ? 'المنصة الرسمية المعتمدة لحجز ملاعب الصعيد' : 'OFFICIAL UPPER EGYPT SPORTS PLATFORM'}</span>
            </div>

            {/* Giant Bold Headline (Matching Reference "WHERE YOUR GAME START") */}
            <TextAnimate
              animation="blurInUp"
              by="word"
              as="h1"
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#02122F] leading-[1.08] tracking-tight mb-4 uppercase"
            >
              {lang === 'ar'
                ? 'احجز ماتشك في ملاعب البادل وكرة القدم بالصعيد'
                : 'WHERE YOUR GAME START'}
            </TextAnimate>

            {/* Sub-headline */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-7 font-normal">
              {lang === 'ar'
                ? 'عندما تشعر بالرغبة في التراجع، تلك هي اللحظة التي يجب أن تستمر فيها! جداول فورية، حجز مؤكد بدون مكالمات، وملاعب دولية بأسيوط وسوهاج والمنيا.'
                : "When You Feel Like Giving Up, That's Actually When You Should Keep Going! Live court schedules across Upper Egypt."}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <Button size="lg" onClick={() => onOpenBookingModal()}>
                {lang === 'ar' ? 'احجز ملعبك الآن' : 'Book Your Court'}
              </Button>

              <button
                onClick={onSearch}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#02122F] bg-white hover:bg-slate-50 text-[#02122F] font-black text-sm sm:text-base transition-all cursor-pointer shadow-sm"
              >
                <span>{lang === 'ar' ? ' صاحب ملعب' : 'Owner Court'}</span>
              </button>
            </div>

            {/* Floating Electric Lime Promo Card (Matching Reference: "BOOK ONLINE! 25% OFF >>") */}
            <div
              onClick={() => onOpenBookingModal('court-1')}
              className="w-full sm:w-80 bg-[#CFF40E] text-[#010A1A] p-5 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 [clip-path:polygon(0%_1.2rem,1.2rem_0%,100%_0%,100%_calc(100%-1.2rem),calc(100%-1.2rem)_100%,0%_100%)] border border-black/10"
            >
              <div className="flex items-start gap-4">
                {/* Tennis Racket / Sport Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#010A1A] text-[#CFF40E] flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-6 h-6 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M12 14v8" />
                    <path d="M9 22h6" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="12" y1="5" x2="12" y2="11" />
                  </svg>
                </div>

                <div className="text-start">
                  <div className="text-lg font-black tracking-tight uppercase leading-none">
                    {lang === 'ar' ? 'احجز أونلاين!' : 'BOOK ONLINE!'}
                  </div>
                  <p className="text-[11px] text-[#010A1A]/80 font-semibold mt-1 leading-snug">
                    {lang === 'ar'
                      ? 'اختر ميعادك المناسب في أي وقت وتأكيد فوري للحجز.'
                      : 'Practice at any convenient time, instant court confirmation.'}
                  </p>
                </div>
              </div>

              {/* Dark Pill Badge at bottom */}
              <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#010A1A] text-white text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-[#CFF40E] animate-pulse"></span>
                  <span>{lang === 'ar' ? 'خصم 25% للحجز الأول' : '25% OFF >>'}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#010A1A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Right / Photo Collage Column with Polygon Cuts (5 cols) (Matching Reference Layout) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">

            {/* Collage Container */}
            <div className="relative w-full max-w-md h-[480px] sm:h-[540px]">

              {/* Image 1: Football Player (Mohamed Salah) with Polygon Cut */}
              <div className="absolute top-0 left-0 w-[66%] h-[84%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white [clip-path:polygon(0%_2rem,2rem_0%,100%_0%,100%_calc(100%-2rem),calc(100%-2rem)_100%,0%_100%)] bg-slate-900 group z-10">
                <img
                  src="/hero1.jpg"
                  alt="Football Player"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Subtle Football Tag inside card */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                  ⚽ FOOTBALL
                </div>
              </div>

              {/* Floating 3D Soccer Ball on Salah's Foot */}
              <div className="absolute bottom-[39%] md:bottom-[37%] left-[10%] z-30 flex flex-col items-center pointer-events-none group">
                <img
                  src="/soccer.png"
                  alt="Soccer Ball"
                  className=" w-15 md:w-17 drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] animate-bounce"
                />
                {/* 3D Ball Shadow beneath */}
                <div className="w-12 h-2.5 bg-black/40 rounded-full blur-xs -mt-1 scale-x-90"></div>
              </div>

              {/* Image 2: Padel Athlete (Cut corner slice) */}
              <div className="absolute bottom-0 right-1 sm:right-2 w-[52%] h-[76%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white [clip-path:polygon(2rem_0%,100%_0%,100%_calc(100%-2rem),calc(100%-2rem)_100%,0%_100%,0%_2rem)] bg-slate-900 group z-20">
                <img
                  src="/hero2.jpg"
                  alt="Padel Player"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Subtle Padel Tag inside card */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#CFF40E] uppercase tracking-wider border border-white/10">
                  🎾 PADEL
                </div>
              </div>

              {/* Floating 3D Padel Ball on the Racket */}
              <div className="absolute bottom-[30%] right-[3%] sm:bottom-[30%] sm:right-[5%] z-40 flex flex-col items-center pointer-events-none">
                <img
                  src="/badel-ball.png"
                  alt="Padel Ball"
                  className="w-10  sm:w-12 drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] animate-bounce"
                />
                {/* 3D Ball Glow / Impact Highlight */}
                <div className="w-8 h-2 bg-[#CFF40E]/40 rounded-full blur-xs -mt-1"></div>
              </div>

              {/* Floating Electric Lime Hexagon Badge: "PUSH THE LIMITS" between the two athletes */}
              {/* <div className="absolute top-[38%] left-[48%] -translate-x-1/2 z-30">
                <div className="px-3.5 py-2 bg-[#CFF40E] text-[#010A1A] font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-xl shadow-2xl border-2 border-[#010A1A] text-center leading-tight whitespace-nowrap [clip-path:polygon(0%_0.5rem,0.5rem_0%,100%_0%,100%_calc(100%-0.5rem),calc(100%-0.5rem)_100%,0%_100%)] hover:scale-105 transition-transform">
                  {lang === 'ar' ? 'تحدّى أصحابك' : 'PUSH THE LIMITS'}
                </div>
              </div> */}

              {/* Background Athletic Accent Geometry */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[#CFF40E] -z-10 rounded-3xl opacity-80"></div>
              <div className="absolute -top-4 right-10 w-20 h-20 bg-[#04307C] -z-10 rounded-2xl opacity-20"></div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
