'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_PACKAGES } from '../../data';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, Sparkles, Award, Star } from 'lucide-react';

interface AcademyPackagesProps {
  onSelectPackage: (pkgId: string) => void;
}

export const AcademyPackages: React.FC<AcademyPackagesProps> = ({ onSelectPackage }) => {
  const { t, lang } = useLanguage();

  return (
    <section id="packages" className="py-16 bg-[#000d28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e6fff]/20 text-[#739bff] text-xs font-bold uppercase tracking-wider mb-3 border border-[#1e6fff]/40">
            <Award className="w-3.5 h-3.5 text-[#cff40e]" />
            Coaching & Passes
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {t('packagesTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {t('packagesSubtitle')}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {DEMO_PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              courtAccent={pkg.recommended}
              className={`p-8 flex flex-col justify-between relative ${
                pkg.recommended
                  ? 'border-[#cff40e]/60 shadow-[0_0_35px_rgba(207,244,14,0.15)] bg-[#0f1f3c]'
                  : 'bg-[#0f1f3c]/60'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="neon" icon={<Sparkles className="w-3.5 h-3.5" />}>
                    {t('recommendedBadge')}
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {lang === 'ar' ? pkg.nameAr : pkg.nameEn}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {lang === 'ar' ? pkg.sessionsAr : pkg.sessionsEn}
                </p>

                {/* Price Display */}
                <div className="mt-6 mb-8 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#cff40e]">{pkg.price}</span>
                  <span className="text-xs font-bold text-slate-300">EGP</span>
                  <span className="text-xs text-slate-400">
                    {lang === 'ar' ? pkg.periodAr : pkg.periodEn}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-xs text-slate-500 line-through ms-2">
                      {pkg.originalPrice} EGP
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {(lang === 'ar' ? pkg.featuresAr : pkg.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#cff40e] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={pkg.recommended ? 'primary' : 'outline'}
                fullWidth
                size="lg"
                onClick={() => onSelectPackage(pkg.id)}
                className="font-bold"
              >
                {t('buyPackageBtn')}
              </Button>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
