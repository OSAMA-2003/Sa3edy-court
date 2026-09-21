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

      {/* Floating Rounded Glassy Dark Navbar Capsule */}
      <div className="pointer-events-auto bg-[#02122F] backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.4)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 transition-all hover:border-white/25">

        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Padel & Football Egypt Logo"
              className="w-20 md:w-28 object-contain group-hover:scale-105 transition-transform drop-shadow-md"
            />
          </a>
        </div>

        {/* Desktop Navigation Links (with Language Toggle inside Menu List) */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="/courts"
            className="text-xs font-bold text-slate-200 hover:text-[#CFF40E] transition-colors relative py-1 group"
          >
            <span>{lang === 'ar' ? 'الملاعب' : 'Courts'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFF40E] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#matches"
            className="text-xs font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors relative py-1 group"
          >
            <span>{lang === 'ar' ? 'المباريات' : 'Matches'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFF40E] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#store"
            className="text-xs font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors relative py-1 group"
          >
            <span>{lang === 'ar' ? 'المتجر' : 'Store'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFF40E] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#tournaments"
            className="text-xs font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors relative py-1 group"
          >
            <span>{lang === 'ar' ? 'البطولات' : 'Tournaments'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFF40E] transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#about"
            className="text-xs font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors relative py-1 group"
          >
            <span>{lang === 'ar' ? 'من نحن' : 'About Us'}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CFF40E] transition-all group-hover:w-full"></span>
          </a>

          {/* Language Toggle in Menu List */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 hover:border-white/30 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer ms-2"
          >
            <Globe className="w-3.5 h-3.5 text-[#CFF40E]" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </nav>

        {/* Right Action Bar (Sign In + Book Now CTA + Mobile Hamburger) */}
        <div className="flex items-center gap-3">

          {/* Sign In Button */}
          <button
            onClick={() => onOpenBookingModal()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
          </button>

          {/* Book Now Primary CTA */}
          <Button
            size="sm"
            onClick={() => onOpenBookingModal()}
          >
            {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 rounded-full border border-white/15 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Floating Mobile Drawer (Glassy Dark) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-3 bg-[#02122F]/95 border border-white/15 rounded-3xl p-6 space-y-4 animate-in slide-in-from-top-4 duration-200 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <nav className="flex flex-col gap-3.5">
            <a href="/courts" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'الملاعب' : 'Courts'}
            </a>
            <a href="/#matches" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'المباريات' : 'Matches'}
            </a>
            <a href="/#store" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'المتجر' : 'Store'}
            </a>
            <a href="/#tournaments" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'البطولات' : 'Tournaments'}
            </a>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </a>

            {/* Language Toggle in Mobile Menu List */}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-bold text-[#CFF40E] hover:text-white transition-colors py-1 cursor-pointer text-start"
            >
              <Globe className="w-4 h-4 text-[#CFF40E]" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="py-2.5 px-4 text-xs font-bold text-slate-200 hover:text-white border border-white/15 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>

            <Button
              fullWidth
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
            >
              {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
            </Button>
          </div>
        </div>
      )}

    </header>
  );
};
