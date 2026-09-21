'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { Button } from '../ui/Button';

interface FinalCallToActionProps {
  onOpenBookingModal: (courtId?: string) => void;
}

export const FinalCallToAction: React.FC<FinalCallToActionProps> = ({ onOpenBookingModal }) => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-gradient-to-r from-[#04307C] via-[#041B3D] to-[#010A1A] border border-white/15 rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-6 shadow-2xl overflow-hidden [clip-path:polygon(0%_1.5rem,1.5rem_0%,100%_0%,100%_calc(100%-1.5rem),calc(100%-1.5rem)_100%,0%_100%)]">

          {/* Subtle lime accent top highlight */}
          <div className="absolute top-0 inset-x-1/3 h-1 bg-[#CFF40E]/80 rounded-full shadow-[0_0_15px_rgba(207,244,14,0.6)]"></div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#02122F] border border-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider">
            <span>🎾</span>
            <span>{lang === 'ar' ? 'جاهز تنزل الكورت؟' : 'READY TO PLAY?'}</span>
          </div>

          <TextAnimate
            animation="scaleUp"
            by="word"
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold text-white max-w-2xl leading-tight"
          >
            {lang === 'ar' ? 'ماتشك الجاي مستنيك.' : 'Your Next Match Awaits.'}
          </TextAnimate>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
            {lang === 'ar'
              ? 'احجز ملعبك في دقائق والعب مع صحابك.'
              : 'Book your court in minutes and play with your squad.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button size="lg" onClick={() => onOpenBookingModal()}>
              {lang === 'ar' ? 'احجز ملعبك الآن' : 'Book Your Court Now'}
            </Button>

            <a
              href="https://wa.me/201004889211"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                <MessageSquare className="w-5 h-5 text-[#CFF40E]" />
                <span>{lang === 'ar' ? 'تواصل مع الدعم عبر واتساب' : 'WhatsApp Support'}</span>
              </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

