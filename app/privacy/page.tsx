'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../i18n/LanguageContext';
import { Header } from '../../components/sections/Header';
import { Footer } from '../../components/sections/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  CreditCard, 
  Users, 
  Cookie, 
  RotateCcw, 
  UserX, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      <Header onOpenBookingModal={() => {}} />

      {/* Dark Luxury Hero Banner */}
      <section className="w-full pt-28 sm:pt-32 pb-12 bg-gradient-to-r from-[#02122F] via-[#041B3D] to-[#020B1A] text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-80 h-80 bg-[#CFF40E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-1/4 w-60 h-60 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              {isRtl ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-500" />
            <span className="text-[#CFF40E] font-bold">
              {isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#CFF40E] text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isRtl ? 'وثيقة قانونية معتمدة • جمهورية مصر العربية' : 'Official Legal Document • Egypt'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            {isRtl ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mb-4">
            {isRtl 
              ? 'نحن نلتزم بحماية خصوصية وأمان بيانات لاعبي وملاك ملاعب البادل وكرة القدم في محافظات الصعيد (أسيوط، سوهاج، المنيا، قنا، والأقصر). توضح هذه الوثيقة كيف نجمع بياناتك ونستخدمها ونحميها وفقاً للقوانين المصرية المنظمة.'
              : 'We are committed to safeguarding the privacy and security of our players and court venue owners across Upper Egypt. This policy outlines how your data is collected, utilized, and protected under Egyptian regulatory frameworks.'}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{isRtl ? 'آخر تحديث: سبتمبر 2026' : 'Last updated: September 2026'}</span>
            <span>•</span>
            <span>{isRtl ? 'سارية المفعول على جميع المنصات والتطبيقات' : 'Applicable to all services'}</span>
          </div>
        </div>
      </section>

      {/* Main Body with Clean Light Background */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Table of Contents (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block text-start">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#04307C] mb-3">
                {isRtl ? 'فهرس بنود السياسة' : 'Policy Sections'}
              </h3>
              <nav className="space-y-1.5 text-xs text-slate-600 font-medium">
                <a href="#intro" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  1. {isRtl ? 'مقدمة ونطاق التطبيق' : 'Scope & Introduction'}
                </a>
                <a href="#data-collection" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  2. {isRtl ? 'البيانات التي نقوم بجمعها' : 'Information We Collect'}
                </a>
                <a href="#data-usage" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  3. {isRtl ? 'أغراض استخدام البيانات' : 'How We Use Your Data'}
                </a>
                <a href="#payment-security" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  4. {isRtl ? 'أمان المدفوعات الإلكترونية' : 'Payment Gateway Security'}
                </a>
                <a href="#venue-sharing" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  5. {isRtl ? 'مشاركة البيانات مع الملاعب' : 'Sharing with Court Venues'}
                </a>
                <a href="#cancellation" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  6. {isRtl ? 'الإلغاء واسترداد الأموال' : 'Cancellation & Refunds'}
                </a>
                <a href="#cookies" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  7. {isRtl ? 'الكوكيز والتخزين المحلي' : 'Cookies & Local Storage'}
                </a>
                <a href="#user-rights" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  8. {isRtl ? 'حقوق المستخدم وحذف البيانات' : 'User Rights & Deletion'}
                </a>
                <a href="#contact" className="block py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#02122F] transition-colors">
                  9. {isRtl ? 'التواصل والمسائل القانونية' : 'Legal Contact'}
                </a>
              </nav>
            </div>
          </div>

          {/* Legal Clauses Text (8 Cols) */}
          <div className="lg:col-span-8 space-y-6 text-slate-700 text-sm leading-relaxed text-start">

            {/* Section 1 */}
            <section id="intro" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <FileText className="w-5 h-5 text-[#04307C]" />
                <h2>1. {isRtl ? 'مقدمة ونطاق التطبيق' : 'Scope & Introduction'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'تمثل هذه السياسة اتفاقاً ملزماً بين منصة "صعيدي كورت / Padel Egypt" ومستخدمي المنصة (سواء كانوا لاعبين أو مدربين أو مالكي ملاعب). تنطبق هذه السياسة على جميع الخدمات المقدمة عبر الموقع الإلكتروني، وتطبيقات الهواتف الذكية، وأنظمة الحجز اللحظي لملاعب البادل وكرة القدم بالصعيد.' 
                  : 'This policy governs the relationship between Padel Egypt platform and its users (players, coaches, and venue owners). It applies to all services provided across our website, mobile interfaces, and real-time court scheduling systems in Upper Egypt.'}
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <Eye className="w-5 h-5 text-[#04307C]" />
                <h2>2. {isRtl ? 'البيانات التي نقوم بجمعها' : 'Information We Collect'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'نقوم بجمع الحد الأدنى والضروري من البيانات اللازمة لتشغيل وتأكيد حجوزات الملاعب الرياضية بدقة:' 
                  : 'We collect only the essential information necessary to process and fulfill sports court reservations:'}
              </p>
              <ul className="list-disc ps-5 space-y-1.5 text-slate-600">
                <li><strong className="text-[#02122F]">{isRtl ? 'البيانات الشخصية:' : 'Personal Data:'}</strong> {isRtl ? 'الاسم، رقم الهاتف المصري للتأكيد الفوري، البريد الإلكتروني، ومحافظة الإقامة.' : 'Full name, Egyptian mobile number for SMS/WhatsApp confirmation, email, and preferred governorate.'}</li>
                <li><strong className="text-[#02122F]">{isRtl ? 'بيانات الحجز:' : 'Booking Data:'}</strong> {isRtl ? 'الملعب المختار، التاريخ، التوقيت، مدة المباراة، والتجهيزات الرياضية المطلوبة (مضارب أو كرات).' : 'Selected venue, date, time slot, match duration, and requested equipment add-ons.'}</li>
                <li><strong className="text-[#02122F]">{isRtl ? 'بيانات المعاملات:' : 'Transaction Data:'}</strong> {isRtl ? 'طريقة الدفع المختارة وحالة السداد، مع حفظ المعرفات المشفرة فقط دون تخزين أرقام البطاقات السرية.' : 'Payment method, transaction references, without ever retaining sensitive card PINs or CVVs.'}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="data-usage" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <Users className="w-5 h-5 text-amber-600" />
                <h2>3. {isRtl ? 'أغراض استخدام البيانات' : 'How We Use Your Data'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'نستخدم بياناتك حصرياً للأغراض التالية، ولا نقوم إطلاقاً ببيع أو تأجير أي بيانات لأي طرف ثالث:' 
                  : 'Your data is strictly utilized for the following core operations, and is never sold or rented to any third parties:'}
              </p>
              <ul className="list-disc ps-5 space-y-1.5 text-slate-600">
                <li>{isRtl ? 'تأكيد موعد المباراة مع إدارة الملعب وإصدار كود الدخول والـ QR.' : 'Confirming your match slot with court management and generating entry pass QR codes.'}</li>
                <li>{isRtl ? 'إرسال إشعارات التذكير وتأكيد الحجز عبر رسائل الـ SMS أو تطبيق الواتساب.' : 'Dispatching automated match reminders and confirmation notifications via SMS or WhatsApp.'}</li>
                <li>{isRtl ? 'تقديم الدعم الفني وخدمة العملاء على مدار 24 ساعة عبر الخط الساخن.' : 'Providing 24/7 customer support via our dedicated player hotline.'}</li>
                <li>{isRtl ? 'إتاحة سجل الحجوزات وإدارتها عبر صفحة البروفايل الشخصي.' : 'Empowering players to manage match history and upcoming reservations via their Profile.'}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="payment-security" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h2>4. {isRtl ? 'أمان المدفوعات والمعاملات المالية' : 'Payment Gateway Security'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'تتم جميع المعاملات المالية الإلكترونية بالتعاون مع بوابات دفع مصرية مرخصة ومعتمدة من البنك المركزي المصري (PCI-DSS Compliant) بتشفير 256-bit SSL عالي الأمان.' 
                  : 'All electronic transactions are processed in collaboration with certified Egyptian payment gateways compliant with PCI-DSS standards and encrypted with 256-bit SSL protocols.'}
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                {isRtl 
                  ? 'تنبيه أمان: لا تقوم منصة صعيدي كورت بتخزين أرقام بطاقات الائتمان أو رمز الأمان (CVV) على خوادمها الخاصة، ويتم التوجيه والتشفير مباشرة عبر بوابات البنوك المعتمدة.' 
                  : 'Security Notice: Padel Egypt never stores full credit card numbers or CVV codes on its servers; transactions are tokenized directly with certified banking partners.'}
              </div>
            </section>

            {/* Section 5 */}
            <section id="venue-sharing" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <Users className="w-5 h-5 text-[#04307C]" />
                <h2>5. {isRtl ? 'مشاركة البيانات مع إدارات الملاعب' : 'Sharing with Court Venues'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'عند إتمام حجز ملعب، يتم تزويد إدارة الملعب المعني بالاسم ورقم الهاتف وتوقيت الحجز فقط لغايات تنظيم دخول اللاعبين وإضاءة الملعب وتجهيز التجهيزات المطلوبة.' 
                  : 'Upon booking confirmation, only your name, phone number, and scheduled slot are shared with the venue management for facility preparation and reception.'}
              </p>
            </section>

            {/* Section 6 */}
            <section id="cancellation" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <h2>6. {isRtl ? 'سياسة الإلغاء واسترداد الأموال' : 'Cancellation & Refund Policy'}</h2>
              </div>
              <ul className="list-disc ps-5 space-y-1.5 text-slate-600">
                <li>{isRtl ? 'يحق للاعب إلغاء الحجز مجاناً بالكامل قبل موعد المباراة بـ 4 ساعات على الأقل من خلال صفحة البروفايل.' : 'Free cancellation is available up to 4 hours before the match kickoff via your Profile.'}</li>
                <li>{isRtl ? 'في حالة الدفع الإلكتروني، يُعاد المبلغ إلى المحفظة الإلكترونية أو البطاقة البنكية خلال 3 إلى 7 أيام عمل.' : 'For electronic payments, refunds are routed back to your original payment method within 3 to 7 business days.'}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="cookies" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <Cookie className="w-5 h-5 text-amber-600" />
                <h2>7. {isRtl ? 'الكوكيز والتخزين المحلي (LocalStorage)' : 'Cookies & Local Storage'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'تستخدم المنصة التخزين المحلي في متصفحك (LocalStorage) لحفظ جلستك وتفضيلات اللغة المختارة (العربية / الإنجليزية) وسجل حجوزاتك لتوفير تجربة سريعة وسلسة بدون الحاجة لإعادة كتابة بياناتك في كل مرة.' 
                  : 'We utilize browser LocalStorage to maintain your active session, language preference (AR/EN), and booking cache for a fast, responsive user experience.'}
              </p>
            </section>

            {/* Section 8 */}
            <section id="user-rights" className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#02122F] font-black text-lg">
                <UserX className="w-5 h-5 text-rose-600" />
                <h2>8. {isRtl ? 'حقوق المستخدم وإمكانية حذف الحساب' : 'User Rights & Account Deletion'}</h2>
              </div>
              <p>
                {isRtl 
                  ? 'يحق لكل لاعب في أي وقت الاطلاع على بياناته الشخصية، وتعديلها من خلال صفحة البروفايل، أو طلب حذف حسابه نهائياً وسجل حجوزاته عبر التواصل مع فريق الدعم الفني.' 
                  : 'You have the right at any time to review, modify, or permanently delete your account and associated booking history by contacting our support desk.'}
              </p>
            </section>

            {/* Section 9: Legal Contact - Signature Dark Card */}
            <section id="contact" className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#02122F] to-[#041B3D] text-white border border-slate-800 space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#00D2FF]" />
                <span>{isRtl ? 'التواصل القانوني والاستفسارات' : 'Legal Contact & Inquiries'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {isRtl 
                  ? 'إذا كانت لديك أي أسئلة أو استفسارات قانونية بخصوص سياسة الخصوصية أو حماية البيانات في صعيد مصر، لا تتردد في مراسلتنا:' 
                  : 'For any legal questions regarding our privacy practices in Upper Egypt, feel free to reach out:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <Phone className="w-4 h-4 text-[#CFF40E] mb-1.5" />
                  <span className="font-bold text-white block">{isRtl ? 'الخط الساخن' : 'Hotline'}</span>
                  <span className="text-slate-300">19880</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <Mail className="w-4 h-4 text-[#00D2FF] mb-1.5" />
                  <span className="font-bold text-white block">{isRtl ? 'البريد القانوني' : 'Legal Email'}</span>
                  <span className="text-slate-300">privacy@sa3edy.com</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-400 mb-1.5" />
                  <span className="font-bold text-white block">{isRtl ? 'المقر الرئيسي' : 'Headquarters'}</span>
                  <span className="text-slate-300">{isRtl ? 'أسيوط • كورنيش النيل' : 'Assiut Nile Corniche'}</span>
                </div>
              </div>
            </section>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
