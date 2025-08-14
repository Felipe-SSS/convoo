import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingHeader, OnboardingProgress, OnboardingProfileStep, OnboardingTutorialStep } from '@/components';

const OnboardingContainer = ({
  // Estados
  currentStep,
  tutorialStep,
  profileData,
  
  // Dados
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  tutorialSteps,
  
  // Handlers
  onUpdateProfileData,
  onToggleLanguage,
  onToggleInterest,
  onNextStep,
  onPreviousStep,
  onNextTutorial,
  onSkipOnboarding,
  
  // Configurações
  showProgress = true,
  showHeader = true,
  stepLabels = ["Perfil", "Tutorial"],
  headerTitle = "Bem-vindo ao Convoo",
  headerSubtitle = "Vamos configurar sua experiência personalizada"
}) => {
  const totalSteps = 2; // Perfil + Tutorial

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      {showHeader && (
        <OnboardingHeader
          title={headerTitle}
          subtitle={headerSubtitle}
          onSkip={onSkipOnboarding}
        />
      )}

      {/* Progress Bar */}
      {showProgress && (
        <OnboardingProgress
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />
      )}

      {/* Conteúdo das etapas */}
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <OnboardingProfileStep
            profileData={profileData}
            availableLanguages={availableLanguages}
            proficiencyOptions={proficiencyOptions}
            interestTopics={interestTopics}
            onUpdateProfileData={onUpdateProfileData}
            onToggleLanguage={onToggleLanguage}
            onToggleInterest={onToggleInterest}
            onNextStep={onNextStep}
            onSkipOnboarding={onSkipOnboarding}
          />
        )}

        {currentStep === 1 && (
          <OnboardingTutorialStep
            tutorialStep={tutorialStep}
            tutorialSteps={tutorialSteps}
            onNextTutorial={onNextTutorial}
            onPreviousStep={onPreviousStep}
            canGoBack={tutorialStep > 0 || currentStep > 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingContainer;
