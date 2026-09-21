'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Video, Award, CheckCircle2, Flame } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { Button } from '../ui/Button';

interface TrendingShowcaseProps {
  onOpenBookingModal: (courtId?: string) => void;
}

export const TrendingShowcase: React.FC<TrendingShowcaseProps> = ({ onOpenBookingModal }) => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-24 bg-[#02122F] text-white relative overflow-hidden" id="featured-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CFF40E] text-[#010A1A] rounded-md font-grotesk font-bold text-xs uppercase mb-2">
              <Flame className="w-4 h-4 fill-[#010A1A]" />
              <span>{lang === 'ar' ? 'MOST POPULAR THIS WEEK • تريند الأسبوع' : 'MOST POPULAR THIS WEEK'}</span>
            </div>
            <TextAnimate
              animation="blurInUp"
              by="word"
              as="h2"
              className="font-cairo font-black text-3xl sm:text-4xl text-white"
            >
              {lang === 'ar' ? 'الملاعب الأكثر طلباً وإشغالاً' : 'Most In-Demand Venues'}
            </TextAnimate>
          </div>

          <div className="flex items-center gap-2 text-slate-300 text-xs font-cairo">
            <Video className="w-4 h-4 text-[#CFF40E]" />
            <span>
              {lang === 'ar'
                ? 'نوادي مزودة بكاميرات تسجيل فيديو HD وشاشات سكور بورد'
                : 'Clubs equipped with Full HD match video cameras & scoreboards'}
            </span>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Main Featured Court (7 Cols) */}
          <div className="lg:col-span-7 bg-[#041B3D] border border-slate-700/80 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#010A1A]">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000"
                alt="سنتر كورت أرينا"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02122F] via-transparent to-transparent"></div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#CFF40E] text-[#010A1A] font-cairo font-black text-xs shadow-md">
                  {lang === 'ar' ? 'الملعب رقم #1 هذا الشهر' : '#1 Court This Month'}
                </span>
                <span className="px-3 py-1 rounded bg-[#010A1A]/80 backdrop-blur-md text-white font-grotesk font-bold text-xs border border-slate-700">
                  CENTER COURT
                </span>
              </div>

              <div className="absolute bottom-4 right-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#010A1A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-xs font-cairo text-slate-200">
                  <Video className="w-3.5 h-3.5 text-[#CFF40E]" />
                  <span>{lang === 'ar' ? 'كاميرات Full HD للماتش' : 'Full HD Cameras'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#010A1A]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-xs font-cairo text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#0A58CA]"></span>
                  <span>{lang === 'ar' ? 'شاشة سكور بورد رقمية' : 'Digital Scoreboard'}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-cairo font-black text-2xl text-white">
                    {lang === 'ar' ? 'سنتر كورت أرينا - الشيخ زايد' : 'Center Court Arena - Sheikh Zayed'}
                  </h3>
                  <p className="font-cairo text-sm text-slate-300 mt-1">
                    {lang === 'ar'
                      ? 'الملعب الرئيسي لاستضافة بطولات الجمهورية والبادل تورز الأسبوعية، مدرجات 300 متفرج.'
                      : 'Premier stadium for national leagues & tournaments, 300-seat grandstand.'}
                  </p>
                </div>
                <div className="text-start sm:text-end shrink-0">
                  <span className="font-grotesk font-black text-3xl text-[#CFF40E]">500</span>
                  <span className="font-cairo text-xs text-slate-300"> ج.م / ساعة</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-cairo text-slate-300">
                  <Award className="w-4 h-4 text-[#CFF40E]" />
                  <span>
                    {lang === 'ar'
                      ? 'معتمد من الاتحاد المصري للبادل لمباريات التصنيف الرسمية'
                      : 'Certified by Egyptian Padel Federation for official matches'}
                  </span>
                </div>
                <Button
                  size="md"
                  onClick={() => onOpenBookingModal('court-5')}
                >
                  {lang === 'ar' ? 'احجز السنتر كورت' : 'Book Center Court'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Royal Club Waterway */}
            <div className="bg-[#041B3D] border border-slate-700/80 rounded-2xl p-5 flex flex-col gap-4 text-start">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#010A1A]">
                  <img
                    src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000"
                    alt="رويال بادل كلوب ووترواي"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-grotesk text-[10px] font-black text-[#010A1A] bg-[#CFF40E] px-2 py-0.5 rounded self-start uppercase">
                    TOP RATED 5.0
                  </span>
                  <h4 className="font-cairo font-black text-base text-white">
                    {lang === 'ar' ? 'رويال بادل كلوب - ووترواي' : 'Royal Padel Club - Waterway'}
                  </h4>
                  <p className="font-cairo text-xs text-slate-300">
                    {lang === 'ar' ? 'التجمع الخامس • لاونج ومشروبات طاقة' : 'New Cairo • VIP Lounge & Energy Drinks'}
                  </p>
                  <span className="font-grotesk font-black text-sm text-[#CFF40E]">480 ج.م / ساعة</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => onOpenBookingModal('court-6')}
              >
                {lang === 'ar' ? 'عرض مواعيد ووترواي المتاحة' : 'View Waterway Available Slots'}
              </Button>
            </div>

            {/* Official Racket & Turf Gear Specs Card */}
            <div className="bg-gradient-to-br from-[#041B3D] to-[#072654] border-2 border-[#CFF40E]/40 rounded-2xl p-6 flex flex-col justify-between flex-1 text-start relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#CFF40E] text-[#010A1A] flex items-center justify-center font-bold">
                    🎾
                  </div>
                  <span className="font-grotesk font-black text-xs text-[#CFF40E] uppercase tracking-wider">
                    OFFICIAL SPECIFICATIONS
                  </span>
                </div>
                <h4 className="font-cairo font-black text-xl text-white mb-2">
                  {lang === 'ar' ? 'مضارب وكرات أصلية بكل الملاعب' : 'Pro Rackets & Official Balls'}
                </h4>
                <p className="font-cairo text-xs text-slate-300 leading-relaxed mb-4">
                  {lang === 'ar'
                    ? 'تقدر تضيف في حجزك تأجير أحدث إصدارات Bullpadel و Babolat و Nox وتستلمهم جاهزين في الكورت.'
                    : 'Rent top Bullpadel, Babolat & Nox rackets pre-strung and ready at court intake.'}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 space-x-reverse">
                    <span className="w-8 h-8 rounded-full bg-[#CFF40E] text-[#010A1A] font-grotesk font-black text-[10px] flex items-center justify-center border-2 border-[#010A1A]">
                      NOX
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white text-[#010A1A] font-grotesk font-black text-[9px] flex items-center justify-center border-2 border-[#010A1A]">
                      BULL
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#0A58CA] text-white font-grotesk font-black text-[9px] flex items-center justify-center border-2 border-[#010A1A]">
                      BAB
                    </span>
                  </div>
                  <span className="font-cairo text-xs text-slate-300 font-bold">
                    {lang === 'ar' ? 'إمكانية التجربة قبل الشراء في ملاعبنا' : 'Test rackets on court before buying'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <div className="font-cairo text-[11px] text-slate-300">
                  {lang === 'ar' ? 'أبعاد معتمدة: ' : 'Court Bounds: '}
                  <span className="text-white font-grotesk font-bold">20m × 10m</span>
                </div>
                <div className="font-grotesk font-black text-xs text-[#CFF40E]">
                  TURF: MONDO SUPERCOURT X3
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
