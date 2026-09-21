'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { EGYPT_CITIES } from '../../data';
import { Search, MapPin, Calendar, Activity, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface CourtSearchBarProps {
  onSearch: (filters: { city: string; sport: string }) => void;
}

export const CourtSearchBar: React.FC<CourtSearchBarProps> = ({ onSearch }) => {
  const { lang } = useLanguage();
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      city: selectedGovernorate,
      sport: selectedSport,
    });
    // Smooth scroll to courts section
    const el = document.getElementById('courts-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full -mt-4 py-8 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Search Container */}
        <div className="bg-[#041B3D] border-2 border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(1,10,26,0.9)] backdrop-blur-xl">
          
          {/* Section Header & User Journey Hint */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10 text-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-[#CFF40E]" />
                <span>{lang === 'ar' ? 'ابحث عن ملعبك' : 'Find Your Court'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'ar'
                  ? 'اختر المحافظة ← حدد الملعب ← اختر الموعد ← احجز فوراً'
                  : 'Choose Location → Choose Court → Pick Date → Book Instantly'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#CFF40E]">
              <span className="w-2 h-2 rounded-full bg-[#CFF40E] animate-ping"></span>
              <span>{lang === 'ar' ? 'حجز فوري مباشر بدون انتظار' : 'Live Real-time Booking'}</span>
            </div>
          </div>

          {/* Search Inputs Form */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* 1. المحافظة (Governorate) */}
            <div className="lg:col-span-3 text-start">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#CFF40E]" />
                <span>{lang === 'ar' ? 'المحافظة' : 'Governorate'}</span>
              </label>
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full bg-[#010A1A] border border-white/20 hover:border-white/40 focus:border-[#CFF40E] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-medium"
              >
                {EGYPT_CITIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#02122F] text-white">
                    {lang === 'ar' ? c.ar : c.en}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. المدينة / المنطقة (City / District) */}
            <div className="lg:col-span-3 text-start">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{lang === 'ar' ? 'المدينة / المنطقة' : 'City / Area'}</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#010A1A] border border-white/20 hover:border-white/40 focus:border-[#CFF40E] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="all" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'جميع المناطق القريبة' : 'All Nearby Districts'}
                </option>
                <option value="corniche" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'كورنيش النيل' : 'Nile Corniche'}
                </option>
                <option value="university" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'منطقة الجامعة' : 'University District'}
                </option>
                <option value="kawtar" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'حي الكوثر' : 'Al-Kawtar'}
                </option>
                <option value="east" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'الحي الشرقي' : 'East District'}
                </option>
              </select>
            </div>

            {/* 3. نوع الملعب (Sport Type) */}
            <div className="lg:col-span-3 text-start">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#CFF40E]" />
                <span>{lang === 'ar' ? 'نوع الملعب' : 'Court Type'}</span>
              </label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full bg-[#010A1A] border border-white/20 hover:border-white/40 focus:border-[#CFF40E] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="all" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'الكل (بادل وكرة قدم)' : 'All (Padel & Football)'}
                </option>
                <option value="padel" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'ملاعب بادل (Padel Panoramic)' : 'Padel Panoramic'}
                </option>
                <option value="football" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'كرة قدم (Football 5v5 / 7v7)' : 'Football 5v5 / 7v7'}
                </option>
              </select>
            </div>

            {/* 4. التاريخ (Date) */}
            <div className="lg:col-span-3 text-start">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'ar' ? 'التاريخ' : 'Date'}</span>
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#010A1A] border border-white/20 hover:border-white/40 focus:border-[#CFF40E] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="today" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'اليوم (سهرات الليلة)' : 'Today (Tonight)'}
                </option>
                <option value="tomorrow" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'غداً' : 'Tomorrow'}
                </option>
                <option value="weekend" className="bg-[#02122F] text-white">
                  {lang === 'ar' ? 'نهاية الأسبوع (الخميس والجمعة)' : 'This Weekend'}
                </option>
              </select>
            </div>

            {/* Action Submit Button */}
            <div className="sm:col-span-2 lg:col-span-12 pt-2 flex justify-end">
              <Button type="submit" size="lg" className="w-full sm:w-auto px-10 gap-2">
                <Search className="w-5 h-5" />
                <span>{lang === 'ar' ? 'ابحث عن ملعب' : 'Search Courts'}</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
