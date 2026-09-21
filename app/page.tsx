'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { CourtSearchBooking } from '../components/sections/CourtSearchBooking';
import { HowItWorks } from '../components/sections/HowItWorks';
import { TrendingShowcase } from '../components/sections/TrendingShowcase';
import { CourtOwnersBanner } from '../components/sections/CourtOwnersBanner';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCallToAction } from '../components/sections/FinalCallToAction';
import { Footer } from '../components/sections/Footer';
import { BookingModal } from '../components/BookingModal';

function LandingPageContent() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeCourtId, setActiveCourtId] = useState<string>('court-1');
  const [activeSlot, setActiveSlot] = useState<string>('19:00');

  const handleOpenBookingModal = (courtId?: string, slot?: string) => {
    if (courtId) setActiveCourtId(courtId);
    if (slot) setActiveSlot(slot);
    setBookingModalOpen(true);
  };

  const scrollToCourts = () => {
    const el = document.getElementById('courts-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">
      
      {/* Top Header */}
      <Header onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Sections - Zero top padding so Hero extends all the way to top under floating navbar */}
      <main className="flex-1">
        
        {/* Full Viewport Height Hero & Stats Banner */}
        <Hero
          onSearch={scrollToCourts}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Instant Booking Courts Grid */}
        <CourtSearchBooking
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* How It Works Steps (01, 02, 03) */}
        <HowItWorks />

        {/* Trending Showcase & Racket Gear Specs */}
        <TrendingShowcase onOpenBookingModal={handleOpenBookingModal} />

        {/* Venue Owners Partnership Banner */}
        <CourtOwnersBanner />

        {/* Player & Owner Reviews */}
        <Testimonials />

        {/* Final High Energy CTA */}
        <FinalCallToAction onOpenBookingModal={handleOpenBookingModal} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        courtId={activeCourtId}
        initialSlot={activeSlot}
      />

    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <LandingPageContent />
    </LanguageProvider>
  );
}
