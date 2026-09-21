'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MapPin, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="w-full bg-[#010A1A] text-white border-t border-slate-800 py-16 text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Col */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Padel & Football Egypt Logo"
                className="w-30 object-contain"
              />

            </div>

            <p className="font-cairo text-xs text-slate-400 leading-relaxed">
              {lang === 'ar'
                ? 'المنصة الأولى المعتمدة لحجز ملاعب البادِل وكرة القدم بالصعيد (أسيوط وسوهاج). دقة في المواعيد، بطولات، وتجربة رياضية متكاملة.'
                : 'Upper Egypt’s #1 official platform for Padel & Football court bookings across Assiut, Sohag, Minya & beyond.'}
            </p>

            <div className="flex items-center gap-2 text-slate-300 text-xs font-cairo pt-2">
              <Users className="w-4 h-4 text-[#CFF40E]" />
              <span>
                {lang === 'ar'
                  ? 'مجتمع يضم أكثر من 5,000 لاعب نشط بالصعيد'
                  : 'Community of 5,000+ active Upper Egypt players'}
              </span>
            </div>
          </div>

          {/* Cities Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-cairo font-black text-sm text-white">
              {lang === 'ar' ? 'المدن والملاعب' : 'Cities & Locations'}
            </h4>
            <ul className="flex flex-col gap-2 font-cairo text-xs text-slate-400">
              <li>
                <a href="#courts-section" className="hover:text-[#CFF40E] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CFF40E]" />
                  {lang === 'ar' ? 'أسيوط' : 'Assiut'}
                </a>
              </li>
              <li>
                <a href="#courts-section" className="hover:text-[#CFF40E] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CFF40E]" />
                  {lang === 'ar' ? 'سوهاج ' : 'Sohag'}
                </a>
              </li>
              <li>
                <a href="#courts-section" className="hover:text-[#CFF40E] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CFF40E]" />
                  {lang === 'ar' ? 'المنيا' : 'Minya'}
                </a>
              </li>
              <li>
                <a href="#courts-section" className="hover:text-[#CFF40E] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CFF40E]" />
                  {lang === 'ar' ? 'قنا والأقصر' : 'Qena & Luxor'}
                </a>
              </li>
              <li>
                <a href="#courts-section" className="hover:text-[#CFF40E] transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CFF40E]" />
                  {lang === 'ar' ? 'أسوان' : 'Aswan'}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-cairo font-black text-sm text-white">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="flex flex-col gap-2 font-cairo text-xs text-slate-400">
              <li><a href="#featured-showcase" className="hover:text-[#CFF40E] transition-colors">{lang === 'ar' ? 'ملاعب تريند' : 'Trending Courts'}</a></li>
              <li><a href="#how-it-works" className="hover:text-[#CFF40E] transition-colors">{lang === 'ar' ? 'إزاي تحجز؟' : 'How It Works'}</a></li>
              <li><a href="#court-owners-section" className="hover:text-[#CFF40E] transition-colors">{lang === 'ar' ? 'سجّل ملعبك' : 'Register Venue'}</a></li>
              <li><a href="#reviews-section" className="hover:text-[#CFF40E] transition-colors">{lang === 'ar' ? 'آراء اللاعبين' : 'Reviews'}</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div className="flex flex-col gap-3">
            <h4 className="font-cairo font-black text-sm text-white">
              {lang === 'ar' ? 'خدمة اللاعبين والدعم' : 'Player Support'}
            </h4>
            <div className="p-4 rounded-xl bg-[#041B3D] border border-slate-700 space-y-2 text-xs font-cairo">
              <div className="font-bold text-[#CFF40E]">
                {lang === 'ar' ? 'الخط الساخن: 19880' : 'Hotline: 19880 (Cairo)'}
              </div>
              <p className="text-slate-300">
                {lang === 'ar' ? 'دعم فني وتأكيد حجز على مدار 24 ساعة.' : '24/7 Booking Support & Live Verification.'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-cairo text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} PADEL.EGYPT. {t('rights')}
          </div>
          <div>
            Made for Egyptian Padel Community 🇪🇬
          </div>
        </div>

      </div>
    </footer>
  );
};
