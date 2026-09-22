'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Globe 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';

  const { login, demoLogin } = useAuth();
  const { lang, toggleLanguage } = useLanguage();
  const isRtl = lang === 'ar';
  const ArrowBackIcon = isRtl ? ArrowRight : ArrowLeft;

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(isRtl ? 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف' : 'Please enter your email or phone number');
      return;
    }

    setIsLoading(true);
    const result = await login(identifier, password);
    setIsLoading(false);

    if (result.success) {
      router.push(redirectUrl);
    } else {
      setErrorMessage(result.error || (isRtl ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
    }
  };

  const handleDemoClick = () => {
    demoLogin();
    router.push(redirectUrl);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#02122F] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 w-[32rem] h-[32rem] bg-lime-100/60 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

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

      {/* Main Login Card (Clean White Floating Card with Dark Navy Accents) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="relative rounded-3xl p-7 sm:p-9 bg-white border border-slate-200/80 shadow-2xl">
            
            {/* Header Icon & Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#02122F] text-[#CFF40E] mb-3 shadow-md">
                <LogIn className="w-7 h-7 font-black" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#02122F] mb-1.5">
                {isRtl ? 'تسجيل الدخول' : 'Welcome Back'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {isRtl 
                  ? 'سجّل دخولك لحجز وإدارة ملاعب البادل وكرة القدم بالصعيد' 
                  : 'Sign in to book & manage Upper Egypt padel & football venues'}
              </p>
            </div>

            {/* Quick 1-Click Demo Login Banner */}
            <div className="mb-6 p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-start">
                <div className="p-1.5 rounded-lg bg-blue-100 text-[#04307C]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#02122F]">
                    {isRtl ? 'تجربة سريعة وفورية؟' : 'Quick Demo Access?'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isRtl ? 'حساب تجريبي (أحمد الصعيدي - أسيوط)' : 'Demo player profile (Assiut)'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoClick}
                className="px-3 py-1.5 rounded-xl bg-[#02122F] hover:bg-[#041B3D] text-[#CFF40E] font-bold text-xs transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                {isRtl ? 'دخول فوري' : 'Instant Login'}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isRtl ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={isRtl ? 'ahmed@example.com أو 01012345678' : 'user@example.com or 01012345678'}
                    className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">
                    {isRtl ? 'كلمة المرور' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => alert(isRtl ? 'يمكنك استخدام الدخول السريع أو كتابة أي كلمة مرور في الحساب التجريبي.' : 'You can use Instant Demo Login or any password.')}
                    className="text-[#04307C] hover:underline text-[11px] font-semibold"
                  >
                    {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full ps-10 pe-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#04307C] text-sm text-[#02122F] placeholder:text-slate-400 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#04307C] focus:ring-[#04307C] cursor-pointer accent-[#04307C]"
                />
                <label htmlFor="rememberMe" className="text-xs text-slate-600 cursor-pointer select-none">
                  {isRtl ? 'تذكر بيانات تسجيل دخولي' : 'Remember my session'}
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
                    <LogIn className="w-4 h-4" />
                    <span>{isRtl ? 'تسجيل الدخول' : 'Sign In'}</span>
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 font-bold">
                  {isRtl ? 'أو' : 'or'}
                </span>
              </div>
            </div>

            <div className="text-center text-xs text-slate-600">
              <span>{isRtl ? 'ليس لديك حساب بعد؟' : "Don't have an account?"} </span>
              <Link 
                href={`/signup${redirectUrl !== '/profile' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-bold text-[#04307C] hover:underline"
              >
                {isRtl ? 'إنشاء حساب لاعب جديد' : 'Create an Account'}
              </Link>
            </div>

          </div>

          <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isRtl ? 'منصة آمنة ومحمية بالكامل للاعبي وملاعب الصعيد' : 'Secure sports booking platform for Upper Egypt'}</span>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-slate-400 border-t border-slate-200">
        © {new Date().getFullYear()} Padel & Football Egypt. All rights reserved.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-400 text-sm">جاري التحميل...</div>}>
      <LoginForm />
    </Suspense>
  );
}
