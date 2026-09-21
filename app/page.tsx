'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '../i18n/LanguageContext';
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { HeroStats } from '../components/sections/HeroStats';
import { CourtSearchBooking } from '../components/sections/CourtSearchBooking';
import { HowItWorks } from '../components/sections/HowItWorks';
import { TrendingShowcase } from '../components/sections/TrendingShowcase';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
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
    <div className="min-h-screen flex flex-col bg-white text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">

      {/* Top Header */}
      <Header onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Sections - Zero top whitespace, coherent visual rhythm */}
      <main className="flex-1">

        {/* 1. Hero Section */}
        <Hero
          onSearch={scrollToCourts}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 2. Hero Standalone Stats Section */}
        <HeroStats />

        {/* 3. Instant Booking / Popular Courts Carousel */}
        <CourtSearchBooking
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 5. How It Works (Connected 01 -> 02 -> 03) */}
        <HowItWorks />

        {/* 6. Official Championships & Tournaments Showcase */}
        <TrendingShowcase onOpenBookingModal={handleOpenBookingModal} />

        {/* 7. Why Choose Us (4 Benefits) */}
        <WhyChooseUs />

        {/* 8. Venue Owners Partnership Banner */}
        <CourtOwnersBanner />

        {/* 9. Player & Owner Reviews Marquee */}
        <Testimonials />

        {/* 10. Final Call To Action */}
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

