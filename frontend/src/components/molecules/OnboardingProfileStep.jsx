import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components';

const OnboardingProfileStep = ({
  profileData,
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  onUpdateProfileData,
  onToggleLanguage,
  onToggleInterest,
  onNextStep,
  onSkipOnboarding
}) => {
  return (
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
          onChange={(e) => onUpdateProfileData("nickname", e.target.value)}
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
              onClick={() => onToggleLanguage(language)}
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
                    onUpdateProfileData("proficiencyLevels", {
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
              onClick={() => onToggleInterest(topic)}
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
        <Button
          variant="outline"
          onClick={onSkipOnboarding}
          className="flex-1"
        >
          Pular por Agora
        </Button>
        <Button
          onClick={onNextStep}
          className="flex-1"
        >
          Continuar
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingProfileStep;
