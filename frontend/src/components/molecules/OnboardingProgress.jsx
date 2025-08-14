import React from 'react';
import { motion } from 'framer-motion';

const OnboardingProgress = ({ currentStep, totalSteps, stepLabels = [] }) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <motion.div
      className="w-full mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Barra de progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Labels das etapas */}
      {stepLabels.length > 0 && (
        <div className="flex justify-between text-sm text-gray-600">
          {stepLabels.map((label, index) => (
            <motion.span
              key={index}
              className={`transition-colors duration-300 ${
                index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      )}

      {/* Indicador numérico */}
      <div className="text-center text-sm text-gray-500 mt-2">
        Etapa {currentStep + 1} de {totalSteps}
      </div>
    </motion.div>
  );
};

export default OnboardingProgress;
