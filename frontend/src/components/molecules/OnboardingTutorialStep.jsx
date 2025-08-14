import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components';

const OnboardingTutorialStep = ({
  tutorialStep,
  tutorialSteps,
  onNextTutorial,
  onPreviousStep,
  canGoBack = false
}) => {
  const currentStep = tutorialSteps[tutorialStep];
  const isLastStep = tutorialStep === tutorialSteps.length - 1;

  return (
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
          {currentStep.icon}
        </motion.div>
        
        <motion.h1
          className="text-2xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentStep.title}
        </motion.h1>
        
        <motion.p
          className="text-blue-600 font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {currentStep.description}
        </motion.p>
        
        <motion.p
          className="text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {currentStep.content}
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
            />
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
        {canGoBack && (
          <Button
            variant="outline"
            onClick={onPreviousStep}
            className="flex-1"
          >
            Voltar
          </Button>
        )}
        
        <Button
          onClick={onNextTutorial}
          className="flex-1"
        >
          {isLastStep ? "Finalizar" : "Continuar"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingTutorialStep;
