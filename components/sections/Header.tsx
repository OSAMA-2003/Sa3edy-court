'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Globe, Menu, X, User, Building2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface HeaderProps {
  onOpenBookingModal?: (courtId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookingModal }) => {
  const { t, lang, toggleLanguage } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
            href="/about"
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

          {/* User Auth or Sign In Button (Desktop Only - hidden on mobile view) */}
          {currentUser ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#CCFF00]/40 bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 text-xs font-bold text-white transition-all cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-[#010A1A] flex items-center justify-center font-black text-[11px]">
                  {currentUser.name.charAt(0)}
                </span>
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute end-0 mt-2 w-48 rounded-2xl bg-[#030E22]/95 border border-white/15 p-2 shadow-2xl backdrop-blur-xl text-xs z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <p className="font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser.phone}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:text-[#CCFF00] hover:bg-white/5 transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'الملف الشخصي وحجوزاتي' : 'Profile & Bookings'}</span>
                  </Link>
                  <Link
                    href="/book"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-200 hover:text-[#00D2FF] hover:bg-white/5 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'حجز ملعب جديد' : 'Book a Court'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors text-start cursor-pointer border-t border-white/5 mt-1"
                  >
                    <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            </Link>
          )}

          {/* Book Now Primary CTA */}
          <Link href="/book">
            <Button size="sm">
              {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
            </Button>
          </Link>

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
          {/* User Auth Section (Mobile View) */}
          {currentUser ? (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <span className="w-10 h-10 rounded-full bg-[#CCFF00] text-[#010A1A] flex items-center justify-center font-black text-sm shadow shrink-0">
                  {currentUser.name.charAt(0)}
                </span>
                <div className="text-start truncate">
                  <p className="font-bold text-white text-sm truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.phone}</p>
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-xs text-center font-bold text-slate-200 hover:text-white border border-white/15 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 text-xs text-center font-bold text-[#010A1A] bg-[#CCFF00] hover:bg-[#b8e600] rounded-xl transition-colors font-cairo flex items-center justify-center"
              >
                {lang === 'ar' ? 'حساب جديد' : 'Sign Up'}
              </Link>
            </div>
          )}

          <nav className="flex flex-col gap-3.5">
            <a href="/courts" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'الملاعب' : 'Courts'}
            </a>
            <a href="/book" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'حجز ملعب' : 'Book a Court'}
            </a>
            <a href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'حسابي وحجوزاتي' : 'My Bookings'}
            </a>
            <a href="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </a>
            <a href="/privacy" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-[#CFF40E] transition-colors">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
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

          <div className="pt-2 border-t border-white/10">
            <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
              <Button fullWidth size="md">
                {lang === 'ar' ? 'احجز الآن' : 'Book Now'}
              </Button>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};
