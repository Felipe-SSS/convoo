import React from 'react';
import HeroSection from '@/components/organisms/sections/HeroSection';
import FeaturesSection from '@/components/organisms/sections/FeaturesSection';
import HowItWorksSection from '@/components/organisms/sections/HowItWorksSection';
import AiFeatureSection from '@/components/organisms/sections/AiFeatureSection';
import CtaSection from '@/components/organisms/sections/CtaSection';

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