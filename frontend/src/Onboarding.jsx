import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "./context/AuthContext";
import { useToast, OnboardingLayout } from "@/components";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, clearOnboardingRedirect, isAuthenticated } =
    useContext(AuthContext);

  // Estados para controlar as etapas
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Estados para os dados do perfil
  const [profileData, setProfileData] = useState({
    nickname: "",
    nativeLanguages: [],
    proficiencyLevels: {},
    interests: [],
  });

  // Dados pré-definidos
  const availableLanguages = [
    "Português",
    "Inglês",
    "Espanhol",
    "Francês",
    "Alemão",
    "Italiano",
    "Chinês",
    "Japonês",
    "Coreano",
    "Russo",
    "Árabe",
    "Hindi",
  ];

  const proficiencyOptions = [
    { value: "beginner", label: "Iniciante" },
    { value: "intermediate", label: "Intermediário" },
    { value: "advanced", label: "Avançado" },
    { value: "fluent", label: "Fluente" },
  ];

  const interestTopics = [
    "Tecnologia",
    "Ciência",
    "História",
    "Arte",
    "Música",
    "Esportes",
    "Viagem",
    "Culinária",
    "Negócios",
    "Saúde",
    "Educação",
    "Política",
    "Meio Ambiente",
    "Filosofia",
    "Psicologia",
    "Literatura",
  ];

  const tutorialSteps = [
    {
      title: "Bem-vindo ao Convoo!",
      description: "Sua plataforma de conversação com IA",
      content:
        "O Convoo é uma plataforma inovadora que combina conversação natural com inteligência artificial para criar experiências únicas de aprendizado e interação.",
      icon: "🤖",
    },
    {
      title: "Conversas Inteligentes",
      description: "Conecte-se com agentes IA especializados",
      content:
        "Nossos agentes IA são especializados em diferentes áreas e podem ajudar você a praticar idiomas, aprender novos tópicos ou simplesmente ter conversas interessantes.",
      icon: "💬",
    },
    {
      title: "Sistema de Gamificação",
      description: "Aprenda enquanto se diverte",
      content:
        "Ganhe pontos, badges e suba de nível conforme você interage com a plataforma. Complete desafios e mantenha uma rotina de aprendizado consistente.",
      icon: "🏆",
    },
    {
      title: "Conecte-se com Outros",
      description: "Grupos e conversas colaborativas",
      content:
        "Junte-se a grupos de interesse, participe de conversas em grupo e conecte-se com pessoas que compartilham seus interesses e objetivos de aprendizado.",
      icon: "👥",
    },
    {
      title: "Pronto para Começar!",
      description: "Sua jornada está prestes a começar",
      content:
        "Agora você está pronto para explorar todas as funcionalidades do Convoo. Vamos começar sua jornada de aprendizado e conexão!",
      icon: "🚀",
    },
  ];

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
      <div className="text-center mb-6">
        <img
          src="/icons/logo-convoo.png"
          alt="Convoo Logo"
          className="h-16 mx-auto mb-4"
        />

        {/* Indicador de progresso */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentStep === 0 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentStep === 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            </div>
            <span className="text-sm text-gray-500">
              {currentStep === 0 ? "Etapa 1 de 2" : "Etapa 2 de 2"}
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="profile-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Configure seu Perfil
              </h1>
              <p className="text-gray-600">
                Vamos personalizar sua experiência no Convoo
              </p>
            </div>

            {/* Apelido */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 text-left">
                Apelido *
              </label>
              <input
                type="text"
                value={profileData.nickname}
                onChange={(e) => updateProfileData("nickname", e.target.value)}
                placeholder="Como você gostaria de ser chamado?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>

            {/* Idiomas Nativos */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 text-left">
                Idiomas Nativos *
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      profileData.nativeLanguages.includes(language)
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Nível de Aptidão em Outros Idiomas */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 text-left">
                Nível de Aptidão em Outros Idiomas
              </label>
              <div className="space-y-3">
                {availableLanguages
                  .filter((lang) => !profileData.nativeLanguages.includes(lang))
                  .map((language) => (
                    <div
                      key={language}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">{language}</span>
                      <select
                        value={profileData.proficiencyLevels[language] || ""}
                        onChange={(e) =>
                          updateProfileData("proficiencyLevels", {
                            ...profileData.proficiencyLevels,
                            [language]: e.target.value,
                          })
                        }
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Não falo</option>
                        {proficiencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Tópicos de Interesse */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 text-left">
                Tópicos de Interesse
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {interestTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleInterest(topic)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      profileData.interests.includes(topic)
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Botões */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleSkipOnboarding}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Pular por Agora
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continuar
              </button>
            </motion.div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="tutorial-step"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                {tutorialSteps[tutorialStep].icon}
              </motion.div>
              <motion.h1
                className="text-2xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {tutorialSteps[tutorialStep].title}
              </motion.h1>
              <motion.p
                className="text-blue-600 font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {tutorialSteps[tutorialStep].description}
              </motion.p>
              <motion.p
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {tutorialSteps[tutorialStep].content}
              </motion.p>
            </div>

            {/* Indicador de progresso do tutorial */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex space-x-1">
                {tutorialSteps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index <= tutorialStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  ></motion.div>
                ))}
              </div>
            </motion.div>

            {/* Botões */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {(tutorialStep > 0 || currentStep > 0) && (
                <button
                  onClick={handlePreviousStep}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={handleNextTutorial}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {tutorialStep === tutorialSteps.length - 1
                  ? "Finalizar"
                  : "Continuar"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingLayout>
  );
};

export default Onboarding;
