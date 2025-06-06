"use client"

import React, { useState } from "react"
import NavigationBar from "@/components/landing-page/NavigationBar"
import HeroSection from "@/components/landing-page/HeroSection"
import FeaturesSection from "@/components/landing-page/Features"
import PricingSection from "@/components/landing-page/Pricing"
import FAQSection from "@/components/landing-page/FAQ"
import TestimonialSection from "@/components/landing-page/Testimonials"
import Footer from "@/components/landing-page/Footer"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <NavigationBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}