'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck, Zap, CreditCard, Headphones } from 'lucide-react';
import { TextAnimate } from '../ui/text-animate';

export const WhyChooseUs: React.FC = () => {
  const { lang } = useLanguage();

  const benefits = [
    {
      id: 'benefit-1',
      titleAr: 'ملاعب موثوقة',
      titleEn: 'Verified Courts',
      descAr: 'ملاعب بادل وكرة قدم معتمدة ومطابقة للمواصفات الرسمية ومعايير السلامة.',
      descEn: 'Official certified Padel and Football venues with pro surfaces and safety standards.',
      icon: ShieldCheck,
    },
    {
      id: 'benefit-2',
      titleAr: 'حجز سريع',
      titleEn: 'Instant Booking',
      descAr: 'تأكيد فوري وحجز مباشر في ثوانٍ بدون مكالمات هاتفية أو انتظار طويل.',
      descEn: 'Instant confirmation and real-time court reservation without phone calls.',
      icon: Zap,
    },
    {
      id: 'benefit-3',
      titleAr: 'أسعار واضحة',
      titleEn: 'Transparent Pricing',
      descAr: 'تسعير شفاف ومحدد لكل ساعة بدون أي رسوم خفية أو زيادات مفاجئة.',
      descEn: 'Clear hourly rates displayed upfront with zero hidden fees or surprises.',
      icon: CreditCard,
    },
    {
      id: 'benefit-4',
      titleAr: 'دعم مستمر',
      titleEn: '24/7 Support',
      descAr: 'فريق دعم فني وخدمة عملاء متواجد على مدار الساعة لضمان راحتك وحل أي استفسار.',
      descEn: 'Dedicated customer support team available around the clock to assist you.',
      icon: Headphones,
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-b border-slate-200 text-[#02122F] relative overflow-hidden" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#04307C]/10 border border-[#04307C]/20 text-[#04307C] text-xs font-bold uppercase tracking-wider mb-3">
            <span>{lang === 'ar' ? 'مميزات المنصة' : 'WHY CHOOSE US'}</span>
          </div>
          <TextAnimate
            animation="blurInUp"
            by="word"
            as="h2"
            className="text-3xl sm:text-4xl font-black text-[#02122F]"
          >
            {lang === 'ar' ? 'ليه تحجز من خلالنا؟' : 'Why Book With Us?'}
          </TextAnimate>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            {lang === 'ar'
              ? 'صممنا المنصة لتوفر لك تجربة حجز سلسة ومضمونة بالكامل في ملاعب الصعيد.'
              : 'Built to deliver the fastest, most reliable sports court booking across Upper Egypt.'}
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#02122F] hover:shadow-xl transition-all flex flex-col gap-4 text-start group hover:-translate-y-1 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#04307C] border border-white/10 flex items-center justify-center text-[#CFF40E] group-hover:scale-110 transition-transform shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#02122F] group-hover:text-[#04307C] transition-colors">
                    {lang === 'ar' ? b.titleAr : b.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal">
                    {lang === 'ar' ? b.descAr : b.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
