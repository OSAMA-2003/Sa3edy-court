'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MessageSquare } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';
import { Button } from '../ui/Button';

interface FinalCallToActionProps {
  onOpenBookingModal: (courtId?: string) => void;
}

export const FinalCallToAction: React.FC<FinalCallToActionProps> = ({ onOpenBookingModal }) => {
  const { lang } = useLanguage();

  return (
    <section className="w-full py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-gradient-to-r from-[#010A1A] via-[#04307C] to-[#010A1A] rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center gap-6 shadow-2xl overflow-hidden border-2 border-[#CFF40E]/50">
          
          {/* Top accent bar */}
          <div className="absolute top-0 inset-x-1/4 h-1.5 bg-[#CFF40E] rounded-full"></div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#02122F] border border-[#CFF40E] text-[#CFF40E] font-grotesk font-black text-xs uppercase tracking-wider">
            <span>🎾</span>
            <span>{lang === 'ar' ? 'READY TO PLAY? • جاهز تنزل الكورت؟' : 'READY TO PLAY?'}</span>
          </div>

          <TextAnimate
            animation="scaleUp"
            by="word"
            as="h2"
            className="font-cairo font-black text-3xl sm:text-5xl text-white max-w-2xl leading-tight"
          >
            {lang === 'ar' ? 'ماتشك الجاي مستنيك بالصعيد.. ماتضيعش وقت!' : 'Your Next Match Awaits.. Don’t Waste Time!'}
          </TextAnimate>

          <p className="font-cairo text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
            {lang === 'ar'
              ? 'أكتر من 500 ماتش بيتلعبوا أسبوعياً عن طريق المنصة في كافة أنحاء مصر. جهز مضربك، لم فرقتك، واحجز في دقيقة.'
              : 'Over 500 matches played weekly across Egypt via Padel Egypt. Grab your racket, assemble your squad, and book in 1 minute.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button size="lg" onClick={() => onOpenBookingModal()}>
              {lang === 'ar' ? 'احجز ملعبك دلوقتي' : 'Book Your Court Now'}
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
