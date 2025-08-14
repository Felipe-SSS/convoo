import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { useToast, OnboardingLayout, OnboardingContainer } from "@/components";
import {
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  tutorialSteps,
  initialProfileData,
  onboardingConfig
} from "@/data";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, clearOnboardingRedirect, isAuthenticated } =
    useContext(AuthContext);

  // Estados para controlar as etapas
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Estados para os dados do perfil
  const [profileData, setProfileData] = useState(initialProfileData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    clearOnboardingRedirect();
  }, [isAuthenticated, navigate, clearOnboardingRedirect]);

  const handleNextStep = () => {
    if (currentStep === 0) {
      // Validação da primeira etapa
      if (!profileData.nickname.trim()) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, informe um apelido.",
          className: "bg-red-500 text-white",
        });
        return;
      }
      if (profileData.nativeLanguages.length === 0) {
        toast({
          title: "Campo obrigatório",
          description: "Por favor, selecione pelo menos um idioma nativo.",
          className: "bg-red-500 text-white",
        });
        return;
      }
      setCurrentStep(1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1 && tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    } else if (currentStep === 1 && tutorialStep === 0) {
      setCurrentStep(0);
    }
  };

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleCompleteOnboarding = () => {
    // Aqui você pode adicionar a lógica para salvar os dados do perfil
    console.log("Dados do perfil:", profileData);

    toast({
      title: "Onboarding Concluído!",
      description: "Bem-vindo ao Convoo! Redirecionando para o painel...",
      className: "bg-green-500 text-white",
    });

    setTimeout(() => {
      navigate("/main");
    }, 2000);
  };

  const handleSkipOnboarding = () => {
    toast({
      title: "Onboarding Ignorado",
      description: "Você pode configurar sua conta mais tarde no perfil.",
      className: "bg-yellow-500 text-white",
    });
    navigate("/main");
  };

  const updateProfileData = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleLanguage = (language) => {
    setProfileData((prev) => ({
      ...prev,
      nativeLanguages: prev.nativeLanguages.includes(language)
        ? prev.nativeLanguages.filter((l) => l !== language)
        : [...prev.nativeLanguages, language],
    }));
  };

  const toggleInterest = (interest) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <OnboardingLayout
      cardWidth="max-w-3xl"
      cardHeight="min-h-[600px]"
      cardPadding="p-8"
    >


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
    </OnboardingLayout>
  );
};

export default Onboarding;
