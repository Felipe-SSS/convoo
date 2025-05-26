import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import AiFeatureSection from '@/components/sections/AiFeatureSection';
import CtaSection from '@/components/sections/CtaSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AiFeatureSection />
      <CtaSection />
    </>
  );
};

export default HomePage;