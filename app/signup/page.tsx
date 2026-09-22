'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  UserPlus, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Globe, 
  Trophy 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';

  const { signup } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowBackIcon = isRtl ? ArrowRight : ArrowLeft;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('assiut');
  const [preferredSport, setPreferredSport] = useState<'padel' | 'football' | 'both'>('both');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage(isRtl ? 'يرجى إدخال اسم اللاعب' : 'Please enter your full name');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(isRtl ? 'يرجى إدخال رقم الهاتف المصري' : 'Please enter your phone number');
      return;
    }
    if (password && password.length < 6) {
      setErrorMessage(isRtl ? 'كلمة المرور يجب أن لا تقل عن 6 خانات' : 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(isRtl ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }
    if (!agreedTerms) {
      setErrorMessage(isRtl ? 'يرجى الموافقة على شروط الاستخدام وسياسة الخصوصية' : 'Please agree to terms and privacy policy');
      return;
    }

    setIsLoading(true);
    const result = await signup({
      name,
      phone,
      email: email.trim() || `${phone.replace(/\s+/g, '')}@padel-egypt.com`,
      city,
      preferredSport,
      password,
    });
    setIsLoading(false);

    if (result.success) {
      router.push(redirectUrl);
    } else {
      setErrorMessage(result.error || (isRtl ? 'فشل إنشاء الحساب' : 'Failed to create account'));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#02122F] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      {/* Background Ambience */}
      <div className="absolute top-0 start-1/3 w-[30rem] h-[30rem] bg-blue-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 end-1/4 w-[28rem] h-[28rem] bg-lime-100/60 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      {/* Top Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 group text-slate-600 hover:text-[#02122F] transition-colors text-sm font-bold"
        >
          <ArrowBackIcon className="w-4 h-4 text-[#04307C] group-hover:-translate-x-1 transition-transform" />
          <span>{isRtl ? 'الرئيسية' : 'Back to Home'}</span>
        </Link>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-[#04307C]" />
          <span>{isRtl ? 'English' : 'العربية'}</span>
        </button>
      </header>

      {/* Main Registration Card (Clean White Floating Card) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="relative rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/80 shadow-2xl text-start">
            
            {/* Header Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#02122F] text-[#CFF40E] mb-3 shadow-md">
                <UserPlus className="w-7 h-7 font-black" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#02122F] mb-1.5">
                {isRtl ? 'إنشاء حساب لاعب جديد' : 'Join as a Player'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {isRtl 
                  ? 'انضم لأكبر منصة لحجز ملاعب البادل وكرة القدم بالصعيد' 
                  : 'Join Upper Egypt’s premier sports booking network'}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isRtl ? 'الاسم بالكامل' : 'Full Name'} <span className="text-[#04307C]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRtl ? 'مثال: محمد عبد الرحمن' : 'e.g. Mohamed Salah'}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone and Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'رقم الموبايل' : 'Phone Number'} <span className="text-[#04307C]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01012345678"
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="player@example.com"
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* City and Preferred Sport Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'محافظة الإقامة' : 'Governorate'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="assiut">{isRtl ? 'أسيوط' : 'Assiut'}</option>
                      <option value="sohag">{isRtl ? 'سوهاج' : 'Sohag'}</option>
                      <option value="minya">{isRtl ? 'المنيا' : 'Minya'}</option>
                      <option value="qena">{isRtl ? 'قنا والأقصر' : 'Qena & Luxor'}</option>
                      <option value="aswan">{isRtl ? 'أسوان' : 'Aswan'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'رياضتك المفضلة' : 'Favorite Sport'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <select
                      value={preferredSport}
                      onChange={(e) => setPreferredSport(e.target.value as any)}
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="both">{isRtl ? 'بادل + كرة قدم' : 'Padel & Football'}</option>
                      <option value="padel">{isRtl ? 'بادل فقط' : 'Padel Only'}</option>
                      <option value="football">{isRtl ? 'كرة قدم فقط' : 'Football Only'}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'كلمة المرور' : 'Password'} <span className="text-[#04307C]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    {isRtl ? 'تأكيد كلمة المرور' : 'Confirm Password'} <span className="text-[#04307C]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agreedTerms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#04307C] focus:ring-[#04307C] cursor-pointer accent-[#04307C]"
                />
                <label htmlFor="agreedTerms" className="text-xs text-slate-600 cursor-pointer leading-relaxed select-none">
                  {isRtl ? (
                    <>
                      أوافق على الشروط والأحكام و
                      <Link href="/privacy" className="text-[#04307C] font-bold underline mx-1 hover:text-[#02122F]">
                        سياسة الخصوصية
                      </Link>
                      الخاصة بمنصة حجز الملاعب.
                    </>
                  ) : (
                    <>
                      I agree to the Terms of Service and{' '}
                      <Link href="/privacy" className="text-[#04307C] font-bold underline hover:text-[#02122F]">
                        Privacy Policy
                      </Link>.
                    </>
                  )}
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-2 font-bold flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-[#010A1A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>{isRtl ? 'تأكيد وإنشاء الحساب' : 'Create Account'}</span>
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-600">
              <span>{isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'} </span>
              <Link 
                href={`/login${redirectUrl !== '/profile' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-bold text-[#04307C] hover:underline"
              >
                {isRtl ? 'تسجيل الدخول' : 'Sign In'}
              </Link>
            </div>

          </div>

          <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isRtl ? 'تأكيد فوري بالرسائل النصية والواتساب لجميع الحجوزات' : 'Instant SMS & WhatsApp confirmation'}</span>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-slate-400 border-t border-slate-200">
        © {new Date().getFullYear()} Padel & Football Egypt. All rights reserved.
      </footer>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-400 text-sm">جاري التحميل...</div>}>
      <SignupForm />
    </Suspense>
  );
}
