'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';
import { Smartphone, QrCode, ShieldCheck, Zap, Download } from 'lucide-react';

export const MobileAppPromo: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="app" className="py-16 bg-[#000d28] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1e6fff]/15 blur-3xl pointer-events-none rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0f1f3c] via-[#04307c] to-[#0f1f3c] border border-white/20 shadow-[0_20px_60px_rgba(2,18,47,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Content left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#cff40e] text-[#02122f] text-xs font-black uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5" />
                iOS & Android App
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {t('appPromoTitle')}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {t('appPromoSubtitle')}
              </p>

              {/* Payment Methods Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="text-slate-400">Supported Payments:</span>
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 text-white">Fawry Pay</span>
                <span className="bg-[#e60000]/20 px-3 py-1 rounded-lg border border-[#e60000]/40 text-red-300">Vodafone Cash</span>
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 text-white">InstaPay</span>
                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 text-white">Visa / Mastercard</span>
              </div>

              {/* Download Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold gap-3"
                  onClick={() => alert('Redirecting to App Store...')}
                >
                  <Download className="w-5 h-5" />
                  <span>{t('downloadAppStore')}</span>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-bold gap-3"
                  onClick={() => alert('Redirecting to Google Play...')}
                >
                  <Download className="w-5 h-5" />
                  <span>{t('downloadGooglePlay')}</span>
                </Button>
              </div>
            </div>

            {/* QR Code & Phone Mockup right */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-[#02122f]/90 border border-white/20 text-center space-y-4 shadow-2xl backdrop-blur-md max-w-xs">
                <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl flex items-center justify-center shadow-inner">
                  {/* SVG Mock QR Code */}
                  <svg className="w-full h-full text-[#02122f]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h30 v10 h-30 z M60,40 h40 v10 h-40 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,60 h20 v20 h-20 z M70,70 h20 v10 h-20 z M90,80 h10 v20 h-10 z" />
                  </svg>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#cff40e]">
                  <QrCode className="w-4 h-4" />
                  <span>{t('scanQr')}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
