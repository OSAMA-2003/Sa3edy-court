'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '../../i18n/LanguageContext';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { BookingModal } from '../../components/BookingModal';
import { Button } from '../../components/ui/Button';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { TextAnimate } from '../../components/ui/text-animate';
import {
  Trophy,
  MapPin,
  Users,
  CalendarCheck,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Target,
  Award,
  Compass,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Zap,
  Phone,
  Building2,
  ChevronRight,
} from 'lucide-react';

function AboutPageContent() {
  const { lang } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeCourtId, setActiveCourtId] = useState<string>('court-1');

  const handleOpenBookingModal = (courtId?: string) => {
    if (courtId) setActiveCourtId(courtId);
    setBookingModalOpen(true);
  };

  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const CITIES_COVERAGE = [
    {
      id: 'assiut',
      nameAr: 'أسيوط',
      nameEn: 'Assiut',
      courtsCount: 14,
      descAr: 'عاصمة البادل الأولى بالصعيد، ملاعب كورنيش النيل والجامعة والملاعب البانورامية المغطاة.',
      descEn: 'Upper Egypt’s padel capital with premium Nile corniche and covered panoramic venues.',
      badgeAr: 'المقر الرئيسي',
      badgeEn: 'Headquarters',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'sohag',
      nameAr: 'سوهاج',
      nameEn: 'Sohag',
      courtsCount: 8,
      descAr: 'مركز بطولات كرة القدم الخماسية والسباعية وأحدث ملاعب البادل بحي الكوثر والشرقي.',
      descEn: 'Hub for 5v5 & 7v7 football leagues and brand new padel courts in Al-Kawtar district.',
      badgeAr: 'أسرع نمو',
      badgeEn: 'Fastest Growing',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'minya',
      nameAr: 'المنيا',
      nameEn: 'Minya',
      courtsCount: 4,
      descAr: 'ملاعب موندو زرقاء معتمدة مع أحدث أنظمة الإضاءة الليلية وغرف استراحة فندقية.',
      descEn: 'Official Mondo blue turf with advanced floodlighting and player clubhouses.',
      badgeAr: 'توسع جديد',
      badgeEn: 'New Expansion',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'qena-aswan',
      nameAr: 'قنا والأقصر وأسوان',
      nameEn: 'Qena, Luxor & Aswan',
      courtsCount: 2,
      descAr: 'توسع مستمر لتغطية أقصى الصعيد وربط مجتمع الرياضيين عبر منصة رقمية موحدة.',
      descEn: 'Expanding across south Upper Egypt to connect players via one seamless platform.',
      badgeAr: 'قريباً بالكامل',
      badgeEn: 'Coming Soon',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const CORE_VALUES = [
    {
      icon: Clock,
      titleAr: 'دقة المواعيد الفورية',
      titleEn: 'Instant Booking Precision',
      descAr: 'وداعاً للمكالمات الهاتفية وانتظار الرد. جدول المواعيد متاح بالدقيقة وحجزك مؤكد فورياً.',
      descEn: 'No more waiting on hold or broken appointments. Live time slots confirmed in seconds.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'ملاعب معتمدة ومطابقة',
      titleEn: 'Certified Court Standards',
      descAr: 'نختار فقط الملاعب المعتمدة دولياً بأرضيات Mondo الرسمية وإضاءة الـ LED غير العاكسة.',
      descEn: 'Every venue meets pro criteria with certified Mondo turf, glass walls, and tournament lighting.',
    },
    {
      icon: Users,
      titleAr: 'مجتمع رياضي حقيقي',
      titleEn: 'Vibrant Local Community',
      descAr: 'ربط آلاف اللاعبين في الصعيد، وتنظيم بطولات شهرية، وتوفير نظام منافسات وتصنيف رسمي.',
      descEn: 'Connecting thousands of local athletes with monthly championships and competitive rankings.',
    },
    {
      icon: HeartHandshake,
      titleAr: 'شفافية وأسعار عادلة',
      titleEn: 'Fair Pricing & Transparency',
      descAr: 'أسعار واضحة بدون أي رسوم خفية، مع خصومات حصرية لحصص واشتراكات الصعيد الرياضية.',
      descEn: 'Clear pricing with zero hidden fees, plus exclusive seasonal package discounts.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      {/* Top Floating Glass Header */}
      <Header onOpenBookingModal={handleOpenBookingModal} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. ABOUT HERO SECTION                                                     */}
        {/* ========================================================================= */}
        <section className="relative w-full pt-32 sm:pt-40 pb-20 sm:pb-24 bg-[#010A1A] text-white overflow-hidden border-b border-white/10">
          {/* Subtle Atmospheric Glowing Gradients */}
          <div className="absolute top-0 start-1/4 w-96 h-96 bg-[#04307C]/40 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 end-1/4 w-80 h-80 bg-[#CFF40E]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
              <a href="/" className="hover:text-[#CFF40E] transition-colors">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </a>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-600" />
              <span className="text-[#CFF40E]">{lang === 'ar' ? 'من نحن' : 'About Us'}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 flex flex-col items-start text-start">
                {/* Upper Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#CFF40E] text-xs font-black tracking-wide mb-5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? 'المنصة الرياضية الأولى بالصعيد'
                      : "UPPER EGYPT'S #1 SPORTS PLATFORM"}
                  </span>
                </div>

                {/* Animated Headline */}
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  as="h1"
                  className="font-cairo font-black text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
                >
                  {lang === 'ar'
                    ? 'نُعيد ابتكار ثقافة الرياضة وحجز الملاعب في صعيد مصر'
                    : 'Pioneering Padel & Football Sports Culture Across Upper Egypt'}
                </TextAnimate>

                <p className="font-cairo text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8 font-normal">
                  {lang === 'ar'
                    ? 'انطلقت منصتنا من قلب الصعيد بهدف واحد واضح: تمكين عشاق البادل وكرة القدم من الوصول الفوري للملاعب الاحترافية في أسيوط وسوهاج وكافة محافظات الصعيد، وتنظيم مجتمع رياضي وبطولات رسمية ترتقي بالمستوى الرياضي لشبابنا.'
                    : 'Born in the heart of Upper Egypt with one clear mission: empower padel and football enthusiasts with instant access to certified venues across Assiut, Sohag, and beyond, fostering an elite local community.'}
                </p>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <Button size="lg" onClick={() => handleOpenBookingModal()}>
                    <span className="flex items-center gap-2">
                      <span>{lang === 'ar' ? 'احجز ملعبك الآن' : 'Book a Court Now'}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </span>
                  </Button>

                  <a
                    href="/courts"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-sm font-bold text-white transition-all backdrop-blur-md"
                  >
                    <span>{lang === 'ar' ? 'استكشف الملاعب' : 'Explore All Courts'}</span>
                  </a>
                </div>
              </div>

              {/* Hero Right Visual Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 group [clip-path:polygon(0%_1.5rem,1.5rem_0%,100%_0%,100%_calc(100%-1.5rem),calc(100%-1.5rem)_100%,0%_100%)]">
                  <img
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=900"
                    alt="Upper Egypt Padel Courts"
                    className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010A1A] via-[#010A1A]/40 to-transparent" />

                  {/* Floating Metric Card inside Image */}
                  <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#010A1A]/90 backdrop-blur-xl border border-white/15 text-start">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-black text-[#CFF40E] uppercase tracking-wider">
                        {lang === 'ar' ? 'معايير دولية معتمدة' : 'Official WPT / FIFA'}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#CFF40E] animate-ping" />
                    </div>
                    <p className="text-xs text-slate-200 font-bold leading-relaxed">
                      {lang === 'ar'
                        ? 'أرضيات نجيل موندو أزرق، زجاج بانورامي مقاوم للصدمات، وإضاءة ليلية بدون ظلال.'
                        : 'Mondo Supercourt turf, panoramic glass, and tournament floodlights.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. IMPACT NUMBERS RIBBON                                                  */}
        {/* ========================================================================= */}
        <section className="w-full py-10 bg-[#CFF40E] text-[#010A1A] border-b-2 border-[#010A1A]/15 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="font-grotesk font-black text-3xl sm:text-5xl tracking-tight leading-none mb-1">
                  <AnimatedCounter end={28} prefix="+" duration={1800} />
                </div>
                <span className="font-cairo font-black text-xs sm:text-sm text-[#010A1A]/80">
                  {lang === 'ar' ? 'ملعب بادل وخماسي معتمد' : 'Approved Courts'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="font-grotesk font-black text-3xl sm:text-5xl tracking-tight leading-none mb-1">
                  <AnimatedCounter end={5} prefix="+" suffix="K" duration={1800} />
                </div>
                <span className="font-cairo font-black text-xs sm:text-sm text-[#010A1A]/80">
                  {lang === 'ar' ? 'لاعب نشط بالصعيد' : 'Active Players'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="font-grotesk font-black text-3xl sm:text-5xl tracking-tight leading-none mb-1">
                  <AnimatedCounter end={12} prefix="+" suffix="K" duration={1800} />
                </div>
                <span className="font-cairo font-black text-xs sm:text-sm text-[#010A1A]/80">
                  {lang === 'ar' ? 'ساعة لعب مؤكدة' : 'Hours Booked'}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="font-grotesk font-black text-3xl sm:text-5xl tracking-tight leading-none mb-1">
                  <AnimatedCounter end={100} suffix="%" duration={1800} />
                </div>
                <span className="font-cairo font-black text-xs sm:text-sm text-[#010A1A]/80">
                  {lang === 'ar' ? 'تأكيد فوري ودقة مواعيد' : 'Instant Confirmation'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR STORY & THE PROBLEM WE SOLVED                                      */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Image Collage */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=900"
                    alt="Football match in Upper Egypt"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02122F]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-6 inset-x-6 text-start text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#CFF40E] text-[#010A1A] font-extrabold text-xs mb-2">
                      {lang === 'ar' ? 'من الصعيد ولكل الصعيد' : 'From Upper Egypt to Upper Egypt'}
                    </span>
                    <h3 className="text-lg font-bold">
                      {lang === 'ar'
                        ? 'حل مشكلة الحجز العشوائي وتداخل المواعيد نهائياً'
                        : 'Eliminating manual booking friction forever'}
                    </h3>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -end-4 bg-[#041B3D] text-white p-4 rounded-2xl shadow-xl border border-white/15 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#04307C] flex items-center justify-center text-[#CFF40E]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-start">
                    <span className="block text-sm font-black text-[#CFF40E]">100,000+ ج.م</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {lang === 'ar' ? 'جوائز بطولات الصعيد' : 'Tournament Prizes'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column Story Details */}
              <div className="lg:col-span-7 flex flex-col items-start text-start">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#04307C]/10 border border-[#04307C]/20 text-[#04307C] text-xs font-bold uppercase tracking-wider mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'قصتنا وبدايتنا' : 'OUR ORIGIN STORY'}</span>
                </div>

                <h2 className="font-cairo font-black text-2xl sm:text-4xl text-[#02122F] leading-tight mb-5">
                  {lang === 'ar'
                    ? 'بدأنا لأن الصعيد يستحق تجربة رياضية ترتقي لطموح شبابه'
                    : 'We started because Upper Egypt athletes deserve world-class tech'}
                </h2>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    {lang === 'ar'
                      ? 'لسنوات طويلة، كان تنظيم ماتش بادل أو حجز ملعب خماسي في أسيوط أو سوهاج بمثابة رحلة شاقة: مكالمات هاتفية لا يُرد عليها، ومواعيد متضاربة، وحجوزات تُلغى فجأة بدون إنذار مسبق.'
                      : 'For years, arranging a padel match or football session in Assiut or Sohag was frustrating: unanswered phone calls, double-booked slots, and unexpected cancellations.'}
                  </p>
                  <p>
                    {lang === 'ar'
                      ? 'قررنا بناء المنصة كفريق من شباب الصعيد المتخصصين في البرمجيات والرياضة، لنجمع الملاعب المعتمدة تحت سقف واحد بنظام إلكتروني لحظي بالدقيقة، مع توفير كل ما يحتاجه اللاعب من معدات، واشتراكات، وبطولات رسمية.'
                      : 'We built this platform as local sports and tech engineers, uniting approved venues under one real-time booking engine, complete with pro gear, passes, and official championships.'}
                  </p>
                </div>

                {/* 3 Bullet Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-xs text-[#02122F]">
                      {lang === 'ar' ? 'تأكيد حجز في 10 ثوانٍ' : '10-Sec Booking'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-xs text-[#02122F]">
                      {lang === 'ar' ? 'دعم فني صعيدي 24/7' : '24/7 Local Support'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-xs text-[#02122F]">
                      {lang === 'ar' ? 'مضارب وكرات مجانية' : 'Complimentary Gear'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MISSION, VISION & PRO STANDARDS (3 CARDS)                              */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CFF40E]/30 border border-[#CFF40E] text-[#010A1A] text-xs font-black uppercase tracking-wider mb-3">
                <Target className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'رؤيتنا ورسالتنا' : 'OUR MISSION & VISION'}</span>
              </div>
              <h2 className="font-cairo font-black text-2xl sm:text-4xl text-[#02122F]">
                {lang === 'ar' ? 'الركائز التي نبني عليها مستقبل الرياضة' : 'Foundations for the Future of Sports'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Mission */}
              <div className="p-8 rounded-3xl bg-[#02122F] text-white shadow-xl flex flex-col justify-between text-start border border-white/10 relative overflow-hidden group">
                <div className="absolute -top-12 -end-12 w-32 h-32 bg-[#04307C]/50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#04307C] text-[#CFF40E] flex items-center justify-center mb-6 shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {lang === 'ar' ? 'رسالتنا (Mission)' : 'Our Mission'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {lang === 'ar'
                      ? 'تمكين كل رياضي وشاب في محافظات الصعيد من ممارسة رياضته المفضلة في ملاعب عالمية وبأقصى درجات السهولة والراحة الرقمية، وبدون أي عوائق إدارية.'
                      : 'Empower every athlete across Upper Egypt to play on international-standard courts with complete digital ease and zero friction.'}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-xs font-bold text-[#CFF40E] flex items-center gap-2">
                  <span>{lang === 'ar' ? 'خدمة شباب الصعيد أولاً' : 'Serving Youth First'}</span>
                </div>
              </div>

              {/* Card 2: Vision */}
              <div className="p-8 rounded-3xl bg-[#041B3D] text-white shadow-xl flex flex-col justify-between text-start border border-white/10 relative overflow-hidden group">
                <div className="absolute -top-12 -end-12 w-32 h-32 bg-[#CFF40E]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#04307C] text-[#CFF40E] flex items-center justify-center mb-6 shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {lang === 'ar' ? 'رؤيتنا (Vision)' : 'Our Vision'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {lang === 'ar'
                      ? 'أن تصبح محافظات الصعيد الوجهة الأولى لبطولات البادل وكرة القدم الإقليمية في مصر، وخلق منظومة رياضية متكاملة تكتشف المواهب وترعاها.'
                      : 'To make Upper Egypt the leading hub for regional padel & football tournaments in Egypt, discovering and fostering local talent.'}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 text-xs font-bold text-[#CFF40E] flex items-center gap-2">
                  <span>{lang === 'ar' ? 'بطولات وجوائز رسمية' : 'Official Leagues & Cups'}</span>
                </div>
              </div>

              {/* Card 3: Quality Guarantee */}
              <div className="p-8 rounded-3xl bg-slate-50 text-[#02122F] shadow-lg flex flex-col justify-between text-start border border-slate-200 relative overflow-hidden group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#02122F] text-[#CFF40E] flex items-center justify-center mb-6 shadow-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-[#02122F] mb-3">
                    {lang === 'ar' ? 'معايير الجودة (Standards)' : 'Our Standards'}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {lang === 'ar'
                      ? 'لا نقبل أي ملعب لا يطابق اشتراطات السلامة: أرضيات موندو أو نجيل هولندي معتمد، زجاج سيكوريت عالي المقاومة، وإضاءة LED معتمدة للمباريات الليلية.'
                      : 'Strict venue vetting: official Mondo or Dutch turf, high-impact glass walls, and tournament-grade non-glare LED illumination.'}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-200 text-xs font-bold text-[#04307C] flex items-center gap-2">
                  <span>{lang === 'ar' ? 'فحص دوري لكل ملعب' : 'Regular Venue Audits'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CITIES & GEOGRAPHIC EXPANSION ACROSS UPPER EGYPT                       */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 bg-[#010A1A] text-white border-b border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#CFF40E] text-xs font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'التغطية الجغرافية' : 'REGIONAL COVERAGE'}</span>
                </div>
                <h2 className="font-cairo font-black text-2xl sm:text-4xl text-white">
                  {lang === 'ar' ? 'ملاعبنا في صعيد مصر' : 'Venues Across Upper Egypt'}
                </h2>
              </div>

              <a
                href="/courts"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#CFF40E] hover:underline"
              >
                <span>{lang === 'ar' ? 'تصفح جميع ملاعب المدن' : 'Browse All Cities'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CITIES_COVERAGE.map((city) => (
                <div
                  key={city.id}
                  className="rounded-3xl bg-[#02122F] border border-white/15 overflow-hidden flex flex-col justify-between shadow-xl group hover:border-[#CFF40E]/50 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.nameAr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02122F] via-transparent to-transparent" />
                    <span className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-[#010A1A]/80 backdrop-blur-md text-[11px] font-extrabold text-[#CFF40E] border border-white/10">
                      {lang === 'ar' ? city.badgeAr : city.badgeEn}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1 text-start">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-black text-white">
                          {lang === 'ar' ? city.nameAr : city.nameEn}
                        </h3>
                        <span className="text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                          {city.courtsCount} {lang === 'ar' ? 'ملاعب' : 'Courts'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal mb-4">
                        {lang === 'ar' ? city.descAr : city.descEn}
                      </p>
                    </div>

                    <a
                      href={`/courts?city=${city.id}`}
                      className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#CFF40E] group-hover:text-white transition-colors"
                    >
                      <span>{lang === 'ar' ? 'عرض ملاعب المدينة' : 'View City Courts'}</span>
                      <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CORE VALUES (4 PILLARS)                                                */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#04307C]" />
                <span>{lang === 'ar' ? 'التزامنا الدائم' : 'OUR COMMITMENT'}</span>
              </div>
              <h2 className="font-cairo font-black text-2xl sm:text-4xl text-[#02122F]">
                {lang === 'ar' ? 'لماذا يختارنا لاعبو الصعيد؟' : 'Why Players Trust Us in Upper Egypt'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_VALUES.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm hover:shadow-md transition-all text-start flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#04307C] text-[#CFF40E] flex items-center justify-center mb-5 shadow-sm">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-black text-[#02122F] mb-2">
                        {lang === 'ar' ? val.titleAr : val.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {lang === 'ar' ? val.descAr : val.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. COURT OWNERS CALLOUT BANNER                                            */}
        {/* ========================================================================= */}
        <section className="w-full py-16 bg-[#041B3D] text-white relative overflow-hidden border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04307C] text-[#CFF40E] text-xs font-black uppercase mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'لأصحاب الملاعب والأندية' : 'FOR COURT VENUE OWNERS'}</span>
                </div>
                <h2 className="font-cairo font-black text-2xl sm:text-4xl text-white mb-3">
                  {lang === 'ar'
                    ? 'هل تمتلك ملعب بادل أو كرة قدم في الصعيد؟'
                    : 'Do you own a sports venue in Upper Egypt?'}
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {lang === 'ar'
                    ? 'انضم إلى شبكة ملاعبنا الرسمية في أسيوط وسوهاج وكافة محافظات الصعيد، وارفع نسبة إشغال ملعبك بنسبة تزيد عن 45% مع نظام إدارة الحجوزات الآلي والتحصيل الفوري.'
                    : 'Join our verified network to increase court occupancy by over 45% with automated slot management and instant payouts.'}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="https://wa.me/201004889211?text=مرحباً، أريد تسجيل ملعبي في منصة الصعيد"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#CFF40E] text-[#010A1A] font-black text-sm hover:bg-lime-300 transition-all shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'سجل ملعبك عبر واتساب' : 'Partner via WhatsApp'}</span>
                </a>

                <a
                  href="tel:19880"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm transition-all"
                >
                  <span>{lang === 'ar' ? 'اتصل بنا: 19880' : 'Call Us: 19880'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FINAL READY TO PLAY CTA                                                */}
        {/* ========================================================================= */}
        <section className="w-full py-16 sm:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-cairo font-black text-3xl sm:text-5xl text-[#02122F] mb-4">
              {lang === 'ar' ? 'جاهز تنزل الملعب وتبدأ ماتشك؟' : 'Ready to Hit the Court?'}
            </h2>
            <p className="font-cairo text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
              {lang === 'ar'
                ? 'اختر ملعبك، حدد موعدك المفضل، واستلم تأكيد حجزك فورياً بدون أي مكالمات أو انتظار.'
                : 'Select your court, pick your preferred slot, and get confirmed in 10 seconds.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" onClick={() => handleOpenBookingModal()}>
                <span className="flex items-center gap-2">
                  <span>{lang === 'ar' ? 'احجز الآن في ثوانٍ' : 'Book Instantly'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </Button>
              <a
                href="/courts"
                className="px-6 py-3.5 rounded-full border border-slate-300 hover:bg-slate-50 text-sm font-bold text-[#02122F] transition-all"
              >
                {lang === 'ar' ? 'تصفح جدول الملاعب' : 'Browse Court Schedules'}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultCourtId={activeCourtId}
        defaultSlot="19:00"
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutPageContent />
    </LanguageProvider>
  );
}
