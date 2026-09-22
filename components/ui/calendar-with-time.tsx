'use client';

import * as React from 'react';
import { Clock, Sparkles, Moon, Sun, Calendar as CalendarIcon, Check } from 'lucide-react';
import { Calendar } from './calendar';
import { Card, CardContent } from './Card';

export interface SlotDefinition {
  hour24: number;
  labelEn: string;
  labelAr: string;
  period: 'day' | 'night';
}

// All hourly slots from 9:00 AM to 2:00 AM (18 hourly slots)
export const POPULAR_HOURLY_SLOTS: SlotDefinition[] = [
  // 9 AM to 11 AM (Morning)
  { hour24: 9, labelEn: '9:00 AM', labelAr: '9:00 ص', period: 'day' },
  { hour24: 10, labelEn: '10:00 AM', labelAr: '10:00 ص', period: 'day' },
  { hour24: 11, labelEn: '11:00 AM', labelAr: '11:00 ص', period: 'day' },
  // 12 PM to 4 PM (Afternoon - 1, 2, 3, 4 PM)
  { hour24: 12, labelEn: '12:00 PM', labelAr: '12:00 م', period: 'day' },
  { hour24: 13, labelEn: '1:00 PM', labelAr: '1:00 م', period: 'day' },
  { hour24: 14, labelEn: '2:00 PM', labelAr: '2:00 م', period: 'day' },
  { hour24: 15, labelEn: '3:00 PM', labelAr: '3:00 م', period: 'day' },
  { hour24: 16, labelEn: '4:00 PM', labelAr: '4:00 م', period: 'day' },
  // 5 PM to 11 PM (Evening - 5 to 11 PM)
  { hour24: 17, labelEn: '5:00 PM', labelAr: '5:00 م', period: 'night' },
  { hour24: 18, labelEn: '6:00 PM', labelAr: '6:00 م', period: 'night' },
  { hour24: 19, labelEn: '7:00 PM', labelAr: '7:00 م', period: 'night' },
  { hour24: 20, labelEn: '8:00 PM', labelAr: '8:00 م', period: 'night' },
  { hour24: 21, labelEn: '9:00 PM', labelAr: '9:00 م', period: 'night' },
  { hour24: 22, labelEn: '10:00 PM', labelAr: '10:00 م', period: 'night' },
  { hour24: 23, labelEn: '11:00 PM', labelAr: '11:00 م', period: 'night' },
  // 12 AM to 2 AM (Late Night)
  { hour24: 0, labelEn: '12:00 AM', labelAr: '12:00 ص', period: 'night' },
  { hour24: 1, labelEn: '1:00 AM', labelAr: '1:00 ص', period: 'night' },
  { hour24: 2, labelEn: '2:00 AM', labelAr: '2:00 ص', period: 'night' },
];

export function formatHour12(hour24: number, lang: 'ar' | 'en' = 'ar'): string {
  const norm = ((hour24 % 24) + 24) % 24;
  const isPm = norm >= 12;
  let h12 = norm % 12;
  if (h12 === 0) h12 = 12;
  if (lang === 'ar') {
    return `${h12}:00 ${isPm ? 'م' : 'ص'}`;
  }
  return `${h12}:00 ${isPm ? 'PM' : 'AM'}`;
}

export function parseSlotToHour24(timeStr: string): number {
  if (!timeStr) return 19;
  const s = timeStr.trim().toLowerCase();

  const isPm = s.includes('pm') || s.includes('م');
  const isAm = s.includes('am') || s.includes('ص');

  const match = s.match(/(\d{1,2})/);
  if (!match) return 19;

  let h = parseInt(match[1], 10);

  if (isPm || isAm) {
    if (isPm && h < 12) h += 12;
    if (isAm && h === 12) h = 0;
    return h % 24;
  }

  return h % 24;
}

export interface CalendarWithTimeProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  startTime?: string;
  onStartTimeChange?: (time12h: string, hour24?: number) => void;
  endTime?: string;
  onEndTimeChange?: (time12h: string, hour24?: number) => void;
  durationHours?: number; // 1 | 2 | 3
  onDurationChange?: (duration: number) => void;
  availableSlots?: string[];
  lang?: 'ar' | 'en';
  className?: string;
}

export const CalendarWithTime: React.FC<CalendarWithTimeProps> = ({
  selectedDate = new Date(),
  onDateChange,
  startTime = '7:00 م',
  onStartTimeChange,
  endTime = '8:00 م',
  onEndTimeChange,
  durationHours = 1,
  onDurationChange,
  lang = 'ar',
  className = '',
}) => {
  const isRtl = lang === 'ar';
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'day' | 'night'>('all');

  // Parse current start hour (0-23)
  const currentStartHour = React.useMemo(() => parseSlotToHour24(startTime), [startTime]);

  // Ensure duration is strictly within 1, 2, or 3 hours
  const safeDuration = React.useMemo(() => {
    if (durationHours === 2) return 2;
    if (durationHours === 3) return 3;
    return 1;
  }, [durationHours]);

  const handleSelectDate = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      if (onDateChange) onDateChange(newDate);
    }
  };

  const handleSlotClick = (slot: SlotDefinition) => {
    const formattedStart = isRtl ? slot.labelAr : slot.labelEn;
    if (onStartTimeChange) {
      onStartTimeChange(formattedStart, slot.hour24);
    }

    // Auto calculate end time = start + safeDuration
    const endHour24 = (slot.hour24 + safeDuration) % 24;
    const formattedEnd = formatHour12(endHour24, lang);
    if (onEndTimeChange) {
      onEndTimeChange(formattedEnd, endHour24);
    }
  };

  const handleDurationClick = (newDuration: number) => {
    // Restrict to 1, 2, or 3 maximum
    const clamped = Math.min(3, Math.max(1, newDuration));
    if (onDurationChange) {
      onDurationChange(clamped);
    }

    // Recalculate end time based on currentStartHour
    const endHour24 = (currentStartHour + clamped) % 24;
    const formattedEnd = formatHour12(endHour24, lang);
    if (onEndTimeChange) {
      onEndTimeChange(formattedEnd, endHour24);
    }
  };

  // Filter slots based on activeFilter
  const visibleSlots = React.useMemo(() => {
    if (activeFilter === 'day') {
      return POPULAR_HOURLY_SLOTS.filter((s) => s.period === 'day');
    }
    if (activeFilter === 'night') {
      return POPULAR_HOURLY_SLOTS.filter((s) => s.period === 'night');
    }
    return POPULAR_HOURLY_SLOTS;
  }, [activeFilter]);

  const selectedSlot = POPULAR_HOURLY_SLOTS.find((s) => s.hour24 === currentStartHour) || POPULAR_HOURLY_SLOTS[10];
  const startDisplay = isRtl ? selectedSlot.labelAr : selectedSlot.labelEn;
  const endHourCalculated = (selectedSlot.hour24 + safeDuration) % 24;
  const endDisplay = formatHour12(endHourCalculated, lang);

  return (
    <Card variant="default" className={`w-full max-w-xl mx-auto shadow-sm border border-slate-200/90 rounded-3xl overflow-hidden bg-white ${className}`}>
      {/* 1. Calendar Grid Container */}
      <CardContent className="p-4 sm:p-5 pb-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          className="p-0"
          lang={lang}
        />
      </CardContent>

      {/* 2. Match Duration Picker: 1 Hour, 2 Hours, or 3 Hours Maximum */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-black text-[#02122F] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#04307C]" />
          </span>

        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((d) => {
            const isSelected = safeDuration === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleDurationClick(d)}
                className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${isSelected
                  ? 'bg-[#02122F] text-[#CFF40E] border-[#02122F] shadow-md scale-102 ring-2 ring-[#CFF40E]/40'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
              >
                <div className="flex items-center gap-1">
                  <span>
                    {isRtl
                      ? d === 1
                        ? '1 ساعة'
                        : d === 2
                          ? '2 ساعة'
                          : '3 ساعات'
                      : d === 1
                        ? '1 Hour'
                        : `${d} Hours`}
                  </span>
                </div>

              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Popular Slots: All times from 9 AM to 2 AM in 12h format */}
      <div className="px-5 py-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm text-[#02122F]">
                {isRtl ? 'المواعيد المتاحة ' : 'Popular Slots'}
              </span>
            </div>

          </div>

          {/* Quick Period Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${activeFilter === 'all'
                ? 'bg-white text-[#02122F] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              {isRtl ? 'الكل' : 'All'}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('day')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${activeFilter === 'day'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span>{isRtl ? 'نهاري' : 'Day'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('night')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${activeFilter === 'night'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <Moon className="w-3 h-3 text-indigo-500" />
              <span>{isRtl ? 'ليلي' : 'Night'}</span>
            </button>
          </div>
        </div>

        {/* 18 Hourly Slots Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {visibleSlots.map((slot) => {
            const isSelected = slot.hour24 === currentStartHour;
            const slotLabel = isRtl ? slot.labelAr : slot.labelEn;

            return (
              <button
                key={slot.hour24}
                type="button"
                onClick={() => handleSlotClick(slot)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-0.5 border ${isSelected
                  ? 'bg-[#02122F] text-[#CFF40E] border-[#02122F] shadow-md scale-102 ring-2 ring-[#CFF40E]/40 font-black'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
              >
                <span>{slotLabel}</span>

              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Selection Confirmation Footer Bar */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600 font-medium">
            {isRtl ? 'الموعد المعتمد:' : 'Confirmed Slot:'}
          </span>
        </div>
        <div className="font-bold text-[#02122F] flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-[#04307C]" />
          <span>
            {startDisplay} {isRtl ? 'إلى' : 'to'} {endDisplay}
          </span>
          <span className="text-[11px] text-blue-600 font-normal">
            ({safeDuration} {isRtl ? (safeDuration === 1 ? 'ساعة' : safeDuration === 2 ? 'ساعتان' : 'ساعات') : (safeDuration === 1 ? 'hr' : 'hrs')})
          </span>
        </div>
      </div>
    </Card>
  );
};
