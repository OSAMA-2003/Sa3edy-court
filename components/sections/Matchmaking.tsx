'use client';

import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DEMO_MATCHES } from '../../data';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Users, Clock, MapPin, Award, UserPlus, ShieldAlert } from 'lucide-react';

interface MatchmakingProps {
  onJoinMatch: (matchId: string) => void;
}

export const Matchmaking: React.FC<MatchmakingProps> = ({ onJoinMatch }) => {
  const { t, lang } = useLanguage();

  return (
    <section id="matches" className="py-16 bg-[#000d28] relative">
      {/* Subtle court line background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e6fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Users className="w-3.5 h-3.5" />
            Matchmaking & Lobbies
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {t('matchesTitle')}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            {t('matchesSubtitle')}
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_MATCHES.map((match) => (
            <Card key={match.id} courtAccent className="p-6 flex flex-col justify-between">
              
              <div>
                {/* Header: Club & Date */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#739bff] uppercase tracking-wider">
                      {lang === 'ar' ? match.courtTypeAr : match.courtTypeEn}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {lang === 'ar' ? match.clubAr : match.clubEn}
                    </h3>
                  </div>
                  <Badge variant="live" icon={<UserPlus className="w-3 h-3" />}>
                    {match.neededPlayers} {t('neededBadge')}
                  </Badge>
                </div>

                {/* Match Time */}
                <div className="p-3 rounded-xl bg-[#03173d] border border-white/10 mb-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#cff40e] shrink-0" />
                  <div>
                    <div className="text-xs text-slate-400">Match Time</div>
                    <div className="text-sm font-bold text-white font-mono">
                      {lang === 'ar' ? match.dateAr : match.dateEn}
                    </div>
                  </div>
                </div>

                {/* Level & Host info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t('matchLevel')}</span>
                    <span className="font-bold text-[#cff40e] bg-[#cff40e]/10 px-2.5 py-0.5 rounded-md border border-[#cff40e]/30">
                      {lang === 'ar' ? match.levelAr : match.levelEn}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={match.hostAvatar}
                        alt={match.hostName}
                        className="w-9 h-9 rounded-full object-cover border border-[#cff40e]"
                      />
                      <div>
                        <div className="text-xs text-slate-400">{t('hostLabel')}</div>
                        <div className="text-xs font-bold text-white">{match.hostName}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-300">{match.hostRating}</span>
                  </div>
                </div>
              </div>

              {/* Price Share & Join Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Your Share</div>
                  <div className="text-lg font-black text-[#cff40e]">
                    {match.pricePerPerson} <span className="text-xs font-normal text-slate-300">EGP</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onJoinMatch(match.id)}
                  className="font-bold text-xs"
                >
                  {t('joinMatchBtn')}
                </Button>
              </div>

            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
