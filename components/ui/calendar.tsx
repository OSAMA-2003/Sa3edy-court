'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarProps {
  mode?: 'single';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  lang?: 'ar' | 'en';
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  className = '',
  lang = 'ar',
}) => {
  const isRtl = lang === 'ar';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Month state based on selected or today
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Month header text
  const monthName = currentMonth.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Weekday names
  const weekdaysAr = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  const weekdaysEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const weekdays = isRtl ? weekdaysAr : weekdaysEn;

  // Calendar grid calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Days array
  const cells: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  // Next month padding to fill complete grid of 35 or 42 cells
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  return (
    <div className={`p-3 select-none w-full max-w-[320px] mx-auto ${className}`}>
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-sm font-black text-[#02122F] tracking-tight">
          {monthName}
        </h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={isRtl ? handleNextMonth : handlePrevMonth}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={isRtl ? handlePrevMonth : handleNextMonth}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {weekdays.map((day, idx) => (
          <span
            key={idx}
            className="text-[11px] font-bold text-slate-400 uppercase py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map(({ date, isCurrentMonth }, idx) => {
          const isSelected = isSameDay(date, selected);
          const isToday = isSameDay(date, today);
          const isPast = date < today;
          const disabled = isPast;

          let btnStyles = 'w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center mx-auto';

          if (isSelected) {
            btnStyles += ' bg-[#CFF40E] text-[#010A1A] font-black shadow-md scale-105 border-2 border-lime-400';
          } else if (disabled) {
            btnStyles += ' text-slate-300 opacity-40 cursor-not-allowed';
          } else if (!isCurrentMonth) {
            btnStyles += ' text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer';
          } else if (isToday) {
            btnStyles += ' border border-[#04307C] text-[#04307C] font-black hover:bg-blue-50 cursor-pointer';
          } else {
            btnStyles += ' text-[#02122F] hover:bg-slate-100 cursor-pointer';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (!disabled && onSelect) {
                  onSelect(date);
                }
              }}
              className={btnStyles}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
