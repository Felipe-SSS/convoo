import React, { useState } from 'react';
import { OnboardingContainer } from '@/components';
import {
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  tutorialSteps,
  initialProfileData,
  onboardingConfig
} from '@/data';

// Exemplo completo de uso de todas as moléculas do onboarding
const OnboardingCompleteExample = () => {
  // Estados para controlar as etapas
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialStep, setTutorialStep] = useState(0);

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
    if (currentStep === 0) {
      // Validação da primeira etapa
      if (!profileData.nickname.trim()) {
        alert('Por favor, informe um apelido.');
        return;
      }
      if (profileData.nativeLanguages.length === 0) {
        alert('Por favor, selecione pelo menos um idioma nativo.');
        return;
      }
      setCurrentStep(1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1 && tutorialStep > 0) {
      setCurrentStep(tutorialStep - 1);
    } else if (currentStep === 1 && tutorialStep === 0) {
      setCurrentStep(0);
    }
  };

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setCurrentStep(tutorialStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleCompleteOnboarding = () => {
    console.log('Onboarding concluído!', profileData);
    alert('Onboarding concluído com sucesso!');
  };

  const handleSkipOnboarding = () => {
    console.log('Onboarding pulado');
    alert('Onboarding pulado');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <OnboardingContainer
        // Estados
        currentStep={currentStep}
        tutorialStep={tutorialStep}
        profileData={profileData}
        
        // Dados
        availableLanguages={availableLanguages}
        proficiencyOptions={proficiencyOptions}
        interestTopics={interestTopics}
        tutorialSteps={tutorialSteps}
        
        // Handlers
        onUpdateProfileData={updateProfileData}
        onToggleLanguage={toggleLanguage}
        onToggleInterest={toggleInterest}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        onNextTutorial={handleNextTutorial}
        onSkipOnboarding={handleSkipOnboarding}
        
        // Configurações
        showProgress={onboardingConfig.showProgress}
        showHeader={onboardingConfig.showHeader}
        stepLabels={onboardingConfig.stepLabels}
        headerTitle={onboardingConfig.headerTitle}
        headerSubtitle={onboardingConfig.headerSubtitle}
      />
    </div>
  );
};

export default OnboardingCompleteExample;
