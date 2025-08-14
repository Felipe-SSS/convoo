import React, { useState } from 'react';
import { OnboardingProfileStep } from '@/components';
import {
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  initialProfileData
} from '@/data';

// Exemplo de uso da molécula OnboardingProfileStep
const OnboardingProfileStepExample = () => {
  // Estados para os dados do perfil
  const [profileData, setProfileData] = useState(initialProfileData);

  // Handlers
  const updateProfileData = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (language) => {
    setProfileData(prev => ({
      ...prev,
      nativeLanguages: prev.nativeLanguages.includes(language)
        ? prev.nativeLanguages.filter(l => l !== language)
        : [...prev.nativeLanguages, language]
    }));
  };

  const toggleInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNextStep = () => {
    console.log('Próximo passo:', profileData);
    // Lógica para ir para o próximo passo
  };

  const handleSkipOnboarding = () => {
    console.log('Onboarding pulado');
    // Lógica para pular onboarding
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <OnboardingProfileStep
        profileData={profileData}
        availableLanguages={availableLanguages}
        proficiencyOptions={proficiencyOptions}
        interestTopics={interestTopics}
        onUpdateProfileData={updateProfileData}
        onToggleLanguage={toggleLanguage}
        onToggleInterest={toggleInterest}
        onNextStep={handleNextStep}
        onSkipOnboarding={handleSkipOnboarding}
      />
    </div>
  );
};

export default OnboardingProfileStepExample;
