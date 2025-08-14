import React from 'react';
import OnboardingLayout from './OnboardingLayout';

// Exemplo 1: Card pequeno (como AuthCard)
export const SmallCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-md" 
    cardHeight="auto"
    cardPadding="p-6"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 2: Card médio (padrão)
export const MediumCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-2xl" 
    cardHeight="auto"
    cardPadding="p-8"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 3: Card grande (como o onboarding atual)
export const LargeCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-5xl" 
    cardHeight="min-h-[600px]"
    cardPadding="p-8"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 4: Card extra grande
export const ExtraLargeCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-7xl" 
    cardHeight="min-h-[700px]"
    cardPadding="p-10"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 5: Card responsivo
export const ResponsiveCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl" 
    cardHeight="auto"
    cardPadding="p-4 md:p-6 lg:p-8"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 6: Card com altura fixa
export const FixedHeightCardExample = ({ children }) => (
  <OnboardingLayout 
    cardWidth="max-w-4xl" 
    cardHeight="h-[800px]"
    cardPadding="p-8"
  >
    {children}
  </OnboardingLayout>
);

// Exemplo 7: Card com largura personalizada
export const CustomWidthCardExample = ({ children, width = "800px" }) => (
  <OnboardingLayout 
    cardWidth={`max-w-[${width}]`}
    cardHeight="auto"
    cardPadding="p-8"
  >
    {children}
  </OnboardingLayout>
);
