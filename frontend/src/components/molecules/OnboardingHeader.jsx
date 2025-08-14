import React from 'react';
import { motion } from 'framer-motion';

const OnboardingHeader = ({ 
  title = "Bem-vindo ao Convoo", 
  subtitle = "Vamos configurar sua experiência personalizada",
  showLogo = true,
  onSkip = null 
}) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      {showLogo && (
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>
        </motion.div>
      )}

      {/* Título */}
      <motion.h1
        className="text-3xl font-bold text-gray-900 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="text-lg text-gray-600 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {subtitle}
      </motion.p>

      {/* Botão Pular (opcional) */}
      {onSkip && (
        <motion.button
          onClick={onSkip}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pular onboarding
        </motion.button>
      )}
    </motion.div>
  );
};

export default OnboardingHeader;
