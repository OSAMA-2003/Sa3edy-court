'use client';

import React, { useState } from 'react';
import { Hero } from '../components/sections/Hero';
import { HeroStats } from '../components/sections/HeroStats';
import { CourtSearchBooking } from '../components/sections/CourtSearchBooking';
import { HowItWorks } from '../components/sections/HowItWorks';
import { TrendingShowcase } from '../components/sections/TrendingShowcase';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { CourtOwnersBanner } from '../components/sections/CourtOwnersBanner';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCallToAction } from '../components/sections/FinalCallToAction';
import { BookingModal } from '../components/BookingModal';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeCourtId, setActiveCourtId] = useState<string>('court-1');
  const [activeSlot, setActiveSlot] = useState<string>('7:00 PM');

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
    <div className="w-full flex flex-col bg-white text-[#02122F] font-sans selection:bg-[#CFF40E] selection:text-[#010A1A]">

      {/* Main Sections - Zero top whitespace, coherent visual rhythm */}
      <main className="flex-1">

        {/* 1. Hero Section */}
        <Hero
          onSearch={scrollToCourts}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 2. Hero Standalone Stats Section */}
        {/* <HeroStats /> */}

        {/* 3. Filterable Court Booking Grid (Padel & Football) */}
        <CourtSearchBooking
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* 4. How It Works (3 Steps) */}
        {/* <HowItWorks /> */}

        {/* 5. Tournament & Matchmaking Banner (Trending Showcase) */}
        <TrendingShowcase />

        {/* 6. Why Choose Us */}
        {/* <WhyChooseUs /> */}

        {/* 7. Court Owners Partnership Banner */}
        <CourtOwnersBanner />

        {/* 8. Verified Reviews Carousel (Testimonials) */}
        <Testimonials />

        {/* 9. Final Call To Action */}
        <FinalCallToAction onOpenBookingModal={handleOpenBookingModal} />

      </main>

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
