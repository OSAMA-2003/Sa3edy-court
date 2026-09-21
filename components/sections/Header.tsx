'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Globe, Menu, X, User, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onOpenBookingModal: (courtId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const { t, lang, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible if near the very top of page or if mobile menu is open
      if (currentScrollY <= 50 || mobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <header className={`fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      }`}>

      {/* Floating Rounded Glass Navbar Capsule */}
      <div className="pointer-events-auto bg-[#010A1A]/85 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_15px_45px_rgba(0,0,0,0.7)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 transition-all hover:border-white/30">

        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Padel & Football Egypt Logo"
              className="w-20 md:w-30 object-contain group-hover:scale-105 transition-transform"
            />

          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className="font-cairo text-xs font-bold text-[#CFF40E] bg-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#CFF40E]/30"
          >
            <span className="w-2 h-2 rounded-full bg-[#CFF40E] animate-pulse"></span>
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </a>
          <a
            href="#courts-section"
            className="font-cairo text-xs font-semibold text-slate-200 hover:text-[#CFF40E] hover:bg-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ar' ? 'الملاعب' : 'Courts'}
          </a>
          <a
            href="#how-it-works"
            className="font-cairo text-xs font-semibold text-slate-200 hover:text-[#CFF40E] hover:bg-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ar' ? 'إزاي تحجز؟' : 'How It Works'}
          </a>
          <a
            href="#featured-showcase"
            className="font-cairo text-xs font-semibold text-slate-200 hover:text-[#CFF40E] hover:bg-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ar' ? 'ملاعب تريند' : 'Trending'}
          </a>
          <a
            href="#court-owners-section"
            className="font-cairo text-xs font-semibold text-slate-200 hover:text-[#CFF40E] hover:bg-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ar' ? 'لأصحاب الملاعب' : 'For Owners'}
          </a>
          <a
            href="#reviews-section"
            className="font-cairo text-xs font-semibold text-slate-200 hover:text-[#CFF40E] hover:bg-white/5 px-3 py-1.5 rounded-full transition-all"
          >
            {lang === 'ar' ? 'آراء اللاعبين' : 'Reviews'}
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-[#CFF40E]/50 text-xs font-bold text-white transition-all font-cairo cursor-pointer backdrop-blur-md"
          >
            <Globe className="w-3.5 h-3.5 text-[#CFF40E]" />
            <span>{t('langToggle')}</span>
          </button>

          {/* Register Venue Button */}
          <a
            href="#court-owners-section"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 text-xs font-bold text-white transition-all font-cairo backdrop-blur-md"
          >
            <Building2 className="w-3.5 h-3.5 text-[#CFF40E]" />
            <span>{lang === 'ar' ? 'سجّل ملعبك' : 'Register Venue'}</span>
          </a>

          {/* Book Court Primary CTA */}
          <Button
            size="sm"
            onClick={() => onOpenBookingModal()}
          >
            {lang === 'ar' ? 'احجز ملعب' : 'Book Court'}
          </Button>

          {/* Profile Icon */}
          <button
            aria-label="Profile"
            className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-slate-200 hover:text-[#CFF40E] hover:border-[#CFF40E]/50 transition-colors backdrop-blur-md cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white bg-white/10 rounded-full border border-white/15 cursor-pointer backdrop-blur-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Floating Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-3 bg-[#010A1A]/95 border border-white/20 rounded-3xl p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 font-cairo backdrop-blur-2xl text-white shadow-2xl">
          <nav className="flex flex-col gap-3">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#CFF40E]">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </a>
            <a href="#courts-section" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200 hover:text-[#CFF40E]">
              {lang === 'ar' ? 'الملاعب' : 'Courts'}
            </a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200 hover:text-[#CFF40E]">
              {lang === 'ar' ? 'إزاي تحجز؟' : 'How It Works'}
            </a>
            <a href="#featured-showcase" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200 hover:text-[#CFF40E]">
              {lang === 'ar' ? 'ملاعب تريند' : 'Trending'}
            </a>
            <a href="#court-owners-section" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200 hover:text-[#CFF40E]">
              {lang === 'ar' ? 'لأصحاب الملاعب' : 'For Owners'}
            </a>
            <a href="#reviews-section" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-200 hover:text-[#CFF40E]">
              {lang === 'ar' ? 'آراء اللاعبين' : 'Reviews'}
            </a>
          </nav>
          <div className="pt-4 border-t border-white/15 flex flex-col gap-3">
            <button
              onClick={toggleLanguage}
              className="py-2.5 text-xs font-bold text-white bg-white/10 border border-white/20 rounded-full"
            >
              {t('langToggle')}
            </button>
            <Button
              fullWidth
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
            >
              {lang === 'ar' ? 'احجز ملعبك الآن' : 'Book Your Court'}
            </Button>
          </div>
        </div>
      )}

    </header>
  );
};
