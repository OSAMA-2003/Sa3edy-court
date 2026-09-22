'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Trophy, Calendar, Users, Award, Flame, Medal, ArrowUpRight, MapPin, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { Button } from '../ui/Button';

interface TrendingShowcaseProps {
  onOpenBookingModal?: (courtId?: string) => void;
}

export const TrendingShowcase: React.FC<TrendingShowcaseProps> = ({ onOpenBookingModal }) => {
  const { lang } = useLanguage();
  const [registeredTournament, setRegisteredTournament] = useState<string | null>(null);

  const handleRegister = (tournamentName: string, courtId: string = 'court-1') => {
    setRegisteredTournament(tournamentName);
    if (onOpenBookingModal) {
      onOpenBookingModal(courtId);
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-[#CFF40E] text-[#010A1A] relative overflow-hidden" id="tournaments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-start text-start mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#010A1A] text-[#CFF40E] text-xs font-black uppercase tracking-wider mb-3 shadow-lg">
            <Trophy className="w-4 h-4 text-[#CFF40E]" />
            <span>{lang === 'ar' ? 'بطولات ومنافسات الصعيد الرسمية' : 'OFFICIAL UPPER EGYPT CHAMPIONSHIPS'}</span>
          </div>

          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="text-3xl sm:text-5xl font-black text-[#010A1A] tracking-tight"
          >
            {lang === 'ar' ? 'بطولات حصرية تُقام على ملاعبنا' : 'Exclusive Tournaments Hosted at Our Courts'}
          </TextAnimate>

          <p className="text-[#010A1A]/85 text-sm sm:text-base mt-2 max-w-2xl font-semibold leading-relaxed">
            {lang === 'ar'
              ? 'سجّل فرقتك أو شارك في بطولات البادل وكرة القدم الخماسية بالصعيد، نافس على جوائز مالية ضخمة وكؤوس رسمية، وعيش أجواء الاحتراف مع تحكيم وتصوير Full HD وبث مباشر.'
              : 'Compete in official Padel & 5v5 Football tournaments across Upper Egypt with cash prizes, certified referees and live 4K streaming.'}
          </p>
        </div>

        {/* Tournament Showcase Grid: Flagship Championship Card + 3 Upcoming Tournaments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Column 1: Flagship Grand Championship Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#041B3D] text-white rounded-3xl overflow-hidden shadow-2xl border-2 border-black/10 flex flex-col justify-between [clip-path:polygon(0%_1.5rem,1.5rem_0%,100%_0%,100%_calc(100%-1.5rem),calc(100%-1.5rem)_100%,0%_100%)]">

            {/* Championship Banner & Image */}
            <div className="relative h-64 sm:h-76 w-full overflow-hidden bg-[#010A1A] group">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200"
                alt="بطولة الصعيد الكبرى للبادل"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041B3D] via-transparent to-black/40"></div>

              {/* Live Status Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#010A1A]/90 backdrop-blur-md text-[#CFF40E] border border-white/20 text-xs font-black">
                  <Flame className="w-4 h-4 text-[#CFF40E] animate-pulse" />
                  <span>{lang === 'ar' ? 'باب التسجيل مفتوح الآن' : 'REGISTRATION OPEN'}</span>
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-[#CFF40E] text-[#010A1A] text-xs font-black shadow-md">
                  {lang === 'ar' ? '🏆 الجائزة: 50,000 ج.م' : 'PRIZE: 50,000 EGP'}
                </span>
              </div>

              {/* Tournament Surface & Category Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-lg bg-[#010A1A]/90 text-white border border-white/15 font-bold">
                  {lang === 'ar' ? '🎾 بادل • الفئة المفتوحة A & B' : '🎾 Padel • Open Division'}
                </span>
                <span className="text-[#CFF40E] font-bold font-montserrat flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>10 - 15 {lang === 'ar' ? 'أكتوبر 2026' : 'Oct 2026'}</span>
                </span>
              </div>
            </div>

            {/* Championship Details Body */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6 text-start">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {lang === 'ar' ? 'دوري أبطال الصعيد للخماسي ' : 'Upper Egypt Grand Padel Championship'}
                  </h3>
                  <div className="inline-flex items-center gap-1 text-[#CFF40E] font-black text-sm bg-white/10 px-3 py-1 rounded-lg border border-white/10 shrink-0">
                    <Trophy className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'النسخة الثالثة' : 'Edition 3'}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#CFF40E] shrink-0" />
                  <span>{lang === 'ar' ? 'المستضيف: سنتر كورت أرينا • كورنيش النيل بأسيوط' : 'Host: Center Court Arena • Assiut Nile Corniche'}</span>
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mt-3">
                  {lang === 'ar'
                    ? 'أقوى بطولة بادل رسمية بالصعيد بمشاركة 32 فريقاً بنظام خروج المغلوب. جوائز مالية لأصحاب المراكز الثلاثة الأولى، كؤوس وميداليات معتمدة، مع تغطية إعلامية وتحكيم معتمد من الاتحاد.'
                    : 'Upper Egypt’s top certified padel tournament featuring 32 squads in single-elimination knockout format with official trophies, referees and cash awards.'}
                </p>

                {/* Tournament Features Badges */}
                <div className="pt-4 flex flex-wrap gap-2 text-xs text-slate-200">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span>32 فريق كحد أقصى</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span>ميداليات وكأس رسمي</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span>حكام معتمدون + تقنية VAR</span>
                  </span>
                </div>
              </div>

              {/* Tournament CTA Bar */}
              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 block">
                    {lang === 'ar' ? 'رسوم اشتراك الفريق (لاعبين):' : 'Team Registration Fee:'}
                  </span>
                  <div className="text-2xl font-black text-[#CFF40E] font-montserrat">
                    1,200 <span className="text-xs text-white font-semibold">{lang === 'ar' ? 'ج.م / فريق' : 'EGP / squad'}</span>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    fullWidth
                    onClick={() => handleRegister('بطولة الصعيد الكبرى للبادل', 'court-1')}
                  >
                    {lang === 'ar' ? 'سجّل فريقك في البطولة الآن' : 'Register Your Team Now'}
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: 3 Upcoming Tournaments & Cups (5 cols) (With Cut Corners) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">

            {/* Tournament 1: Football 5v5 Champions Cup */}
            <div className="p-6 rounded-2xl bg-white text-[#010A1A] shadow-xl border border-black/10 flex flex-col justify-between gap-3 text-start [clip-path:polygon(0%_0.8rem,0.8rem_0%,100%_0%,100%_calc(100%-0.8rem),calc(100%-0.8rem)_100%,0%_100%)] group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#04307C] flex items-center gap-1">
                    <span>⚽</span>
                    <span>{lang === 'ar' ? 'كرة قدم خماسي • بطولات الأندية' : 'FOOTBALL 5V5 CUP'}</span>
                  </span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'متاح 6 مقاعد' : '6 Slots Left'}
                  </span>
                </div>

                <h4 className="text-lg font-black text-[#010A1A] group-hover:text-[#04307C] transition-colors">
                  {lang === 'ar' ? 'دوري أبطال الصعيد للبادل' : 'Upper Egypt 5v5 Champions Cup'}
                </h4>

                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  {lang === 'ar' ? '16 فريق يتنافسون على نجيل ترتان دولي مع شاشات سكور بورد وتصوير فيديو.' : '16 squads competing on FIFA-grade turf with video highlights.'}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-700 mt-2 font-semibold">
                  <span>📍 ملاعب سيتي كورت • سوهاج</span>
                  <span className="text-[#04307C] font-bold">24 أكتوبر 2026</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">الجائزة الأولى:</span>
                  <span className="text-base font-black text-[#04307C] font-montserrat">25,000 ج.م</span>
                </div>

                <button
                  onClick={() => handleRegister('دوري أبطال الصعيد للخماسي', 'court-3')}
                  className="px-4 py-2 rounded-xl bg-[#010A1A] hover:bg-[#04307C] text-white text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'اشترك بالفرقة' : 'Join Squad'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tournament 2: Padel Rookie Challenge Cup */}
            <div className="p-6 rounded-2xl bg-white text-[#010A1A] shadow-xl border border-black/10 flex flex-col justify-between gap-3 text-start [clip-path:polygon(0%_0.8rem,0.8rem_0%,100%_0%,100%_calc(100%-0.8rem),calc(100%-0.8rem)_100%,0%_100%)] group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#04307C] flex items-center gap-1">
                    <span>🎾</span>
                    <span>{lang === 'ar' ? 'بادل • فئة الهواة والمبتدئين' : 'PADEL ROOKIE CUP'}</span>
                  </span>
                  <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'فئة C & D' : 'Category C & D'}
                  </span>
                </div>

                <h4 className="text-lg font-black text-[#010A1A] group-hover:text-[#04307C] transition-colors">
                  {lang === 'ar' ? 'كأس التحدي للبادل للمبتدئين' : 'Padel Rookie Challenge Cup'}
                </h4>

                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  {lang === 'ar' ? 'منافسة مخصصة للاعبين الجدد لتجربة أجواء البطولات وتحسين التصنيف.' : 'Designed for amateurs & newcomers to gain ranking points.'}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-700 mt-2 font-semibold">
                  <span>📍 كورتس إيليت • المنيا</span>
                  <span className="text-[#04307C] font-bold">كل يوم جمعة</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">الجائزة:</span>
                  <span className="text-base font-black text-[#04307C] font-montserrat">15,000 ج.م + مضارب</span>
                </div>

                <button
                  onClick={() => handleRegister('كأس التحدي للبادل للمبتدئين', 'court-2')}
                  className="px-4 py-2 rounded-xl bg-[#010A1A] hover:bg-[#04307C] text-white text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'سجّل الآن' : 'Register'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tournament 3: Universities & Youth Super Cup (Dark Accent Card) */}
            <div className="p-6 rounded-2xl bg-[#010A1A] text-white shadow-xl border border-black/20 flex flex-col justify-between gap-3 text-start [clip-path:polygon(0%_0.8rem,0.8rem_0%,100%_0%,100%_calc(100%-0.8rem),calc(100%-0.8rem)_100%,0%_100%)] group hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#CFF40E] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#CFF40E]" />
                    <span>{lang === 'ar' ? 'بطولة الجامعات ومراكز الشباب' : 'VARSITY SUPER CUP'}</span>
                  </span>
                  <span className="text-[10px] font-black bg-[#CFF40E] text-[#010A1A] px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'تخفيض 30% للطلاب' : '30% Student Off'}
                  </span>
                </div>

                <h4 className="text-lg font-black text-white group-hover:text-[#CFF40E] transition-colors">
                  {lang === 'ar' ? 'سوبر جامعات الصعيد (بادل وخماسي)' : 'Upper Egypt Universities Super Cup'}
                </h4>

                <p className="text-xs text-slate-300 mt-1 font-normal leading-relaxed">
                  {lang === 'ar' ? 'بطولة سنوية كبرى تجمع طلاب جامعات أسيوط وسوهاج وجنوب الوادي.' : 'Annual championship bringing universities together across Upper Egypt.'}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-300 mt-2 font-medium">
                  <span>📍 قنا والأقصر • مجمع الملاعب الأولمبي</span>
                  <span className="text-[#CFF40E] font-bold">نوفمبر 2026</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">إجمالي الجوائز:</span>
                  <span className="text-base font-black text-[#CFF40E] font-montserrat">40,000 ج.م</span>
                </div>

                <button
                  onClick={() => handleRegister('سوبر جامعات الصعيد', 'court-4')}
                  className="px-4 py-2 rounded-xl bg-[#CFF40E] hover:bg-white text-[#010A1A] text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'سجّل جامعتك' : 'Join Varsity'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
