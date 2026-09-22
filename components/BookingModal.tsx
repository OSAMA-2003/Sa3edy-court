'use client';

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { DEMO_COURTS } from '../data';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Badge } from './ui/Badge';
import { MapPin, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  courtId?: string;
  initialSlot?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  courtId = 'court-1',
  initialSlot = '7:00 PM',
}) => {
  const { t, lang } = useLanguage();
  
  const court = DEMO_COURTS.find((c) => c.id === courtId) || DEMO_COURTS[0];

  const [selectedSlot, setSelectedSlot] = useState(initialSlot || court.availableSlots[0]);
  const [duration, setDuration] = useState('1');
  const [racketAddon, setRacketAddon] = useState(false);
  const [ballsAddon, setBallsAddon] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Price calculations
  const durationMultiplier = parseFloat(duration);
  const courtPrice = Math.round(court.pricePerHour * durationMultiplier);
  const racketPrice = racketAddon ? 100 : 0;
  const ballsPrice = ballsAddon ? 250 : 0;
  const totalPrice = courtPrice + racketPrice + ballsPrice;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'P-EG' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title={t('modalTitle')}>
      
      {isSuccess ? (
        <div className="py-6 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-2xl font-black text-white">
              {t('successTitle')}
            </h4>
            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              {t('successMessage')}
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 rounded-2xl bg-[#03173d] border border-white/15 text-start text-xs space-y-2 font-mono max-w-md mx-auto">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400">Confirmation Code:</span>
              <span className="text-[#cff40e] font-bold">{bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Venue:</span>
              <span className="text-white font-bold">{lang === 'ar' ? court.nameAr : court.nameEn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time Slot:</span>
              <span className="text-white font-bold">{selectedSlot} ({duration} hrs)</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-sans font-bold">
              <span className="text-slate-300">Total Paid:</span>
              <span className="text-[#cff40e]">{totalPrice} EGP</span>
            </div>
          </div>

          <Button variant="primary" size="lg" onClick={resetAndClose} fullWidth>
            {t('closeBtn')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-6">
          
          {/* Selected Court Header Card */}
          <div className="p-4 rounded-2xl bg-[#03173d] border border-white/15 flex items-center gap-4">
            <img
              src={court.image}
              alt={lang === 'ar' ? court.nameAr : court.nameEn}
              className="w-16 h-16 rounded-xl object-cover border border-[#cff40e]"
            />
            <div>
              <Badge variant="neon" className="text-[10px]">
                {lang === 'ar' ? court.badgeAr : court.badgeEn}
              </Badge>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {lang === 'ar' ? court.nameAr : court.nameEn}
              </h4>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#cff40e]" />
                {lang === 'ar' ? court.locationAr : court.locationEn}
              </p>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              {t('modalStep1')}
            </label>
            <div className="flex flex-wrap gap-2">
              {court.availableSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-[#cff40e] text-[#02122f] border-[#cff40e] shadow-[0_0_15px_rgba(207,244,14,0.4)]'
                      : 'bg-[#0f1f3c] text-slate-300 border-white/15 hover:border-white/30'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Duration & Add-ons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {t('modalStep2')}
            </label>

            <Select
              label={t('durationLabel')}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              options={[
                { value: '1', label: t('hour1') },
                { value: '2', label: t('hour2') },
                { value: '3', label: t('hour3') },
              ]}
            />

            {/* Checkboxes */}
            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#03173d] border border-white/10 hover:border-white/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={racketAddon}
                  onChange={(e) => setRacketAddon(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#cff40e] cursor-pointer"
                />
                <span className="text-xs text-slate-200">{t('racketRental')}</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#03173d] border border-white/10 hover:border-white/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ballsAddon}
                  onChange={(e) => setBallsAddon(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#cff40e] cursor-pointer"
                />
                <span className="text-xs text-slate-200">{t('ballsCan')}</span>
              </label>
            </div>
          </div>

          {/* Player Contact Details */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {t('modalStep3')}
            </label>

            <Input
              label={t('fullNameLabel')}
              placeholder="e.g. Ahmed Hassan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label={t('phoneLabel')}
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Price Summary Footer */}
          <div className="p-4 rounded-2xl bg-[#02122f] border border-white/15 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400">{t('totalPrice')}</div>
              <div className="text-2xl font-black text-[#cff40e]">{totalPrice} EGP</div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="font-bold">
              {t('confirmBookingBtn')}
            </Button>
          </div>

        </form>
      )}

    </Modal>
  );
};
