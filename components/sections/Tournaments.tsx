'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_TOURNAMENTS } from '../../data';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Trophy, Calendar, MapPin, Users, Award } from 'lucide-react';

interface TournamentsProps {
  onRegisterTournament: (tourneyId: string) => void;
}

export const Tournaments: React.FC<TournamentsProps> = ({ onRegisterTournament }) => {
  const { t, lang } = useLanguage();

  return (
    <section id="tournaments" className="py-16 bg-[#02122f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Official Padel Competitions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {t('tournamentsTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {t('tournamentsSubtitle')}
          </p>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DEMO_TOURNAMENTS.map((tItem) => (
            <Card key={tItem.id} courtAccent className="flex flex-col justify-between">
              
              {/* Banner Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={tItem.image}
                  alt={lang === 'ar' ? tItem.titleAr : tItem.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3c] via-black/30 to-transparent"></div>
                
                <div className="absolute top-3 start-3">
                  <Badge variant="gold" icon={<Trophy className="w-3 h-3" />}>
                    {lang === 'ar' ? tItem.badgeAr : tItem.badgeEn}
                  </Badge>
                </div>

                {/* Prize Pool Tag */}
                <div className="absolute bottom-3 end-3 bg-[#02122f]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                  <span className="text-xs text-slate-300 me-1">{t('prizePoolLabel')}</span>
                  <span className="text-base font-black text-amber-300">{tItem.prizePool}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-[#cff40e] uppercase tracking-wider">
                    {lang === 'ar' ? tItem.categoryAr : tItem.categoryEn}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {lang === 'ar' ? tItem.titleAr : tItem.titleEn}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#1e6fff]" />
                      <span>{lang === 'ar' ? tItem.dateAr : tItem.dateEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#cff40e]" />
                      <span>{lang === 'ar' ? tItem.locationAr : tItem.locationEn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>
                        {t('registeredLabel')} <strong className="text-white">{tItem.registeredTeams}/{tItem.maxTeams} Teams</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#1e6fff] via-[#cff40e] to-amber-400 rounded-full"
                      style={{ width: `${(tItem.registeredTeams / tItem.maxTeams) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Button
                  variant="accent"
                  fullWidth
                  size="md"
                  onClick={() => onRegisterTournament(tItem.id)}
                  className="font-bold"
                >
                  {t('registerTeamBtn')}
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
