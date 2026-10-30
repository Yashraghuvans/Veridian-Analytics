'use client';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorksSection from './components/HowItWorksSection';
import AIInActionSection from './components/AIInActionSection';
import DashboardPreviewSection from './components/DashboardPreviewSection';
import BenefitsSection from './components/BenefitsSection';
import MonetizationSection from './components/MonetizationSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0f12] text-zinc-100 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <main>
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <AIInActionSection />
        <DashboardPreviewSection />
        <BenefitsSection />
        <MonetizationSection />
      </main>
      <Footer />
    </div>
  );
}
