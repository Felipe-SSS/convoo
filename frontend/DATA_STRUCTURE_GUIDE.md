# 📊 Estrutura de Dados Organizada - Guia Completo

## 📋 Visão Geral

Os dados mock foram reorganizados em uma estrutura modular e centralizada, seguindo as melhores práticas de organização de código.

## 🏗️ Estrutura de Diretórios

```
frontend/src/data/
├── index.js                    # Índice principal
└── mock/
    ├── index.js                # Índice dos dados mock
    └── onboardingData.js       # Dados específicos do onboarding
```

## 🔬 Dados Disponíveis

### **1. Idiomas Disponíveis**
```javascript
import { availableLanguages } from '@/data';

// Array com 12 idiomas principais
[
  "Português", "Inglês", "Espanhol", "Francês", 
  "Alemão", "Italiano", "Chinês", "Japonês", 
  "Coreano", "Russo", "Árabe", "Hindi"
]
```

### **2. Opções de Proficiência**
```javascript
import { proficiencyOptions } from '@/data';

// Array de objetos com value e label
[
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
  { value: "fluent", label: "Fluente" }
]
```

### **3. Tópicos de Interesse**
```javascript
import { interestTopics } from '@/data';

// Array com 16 tópicos principais
[
  "Tecnologia", "Ciência", "História", "Arte", 
  "Música", "Esportes", "Viagem", "Culinária", 
  "Negócios", "Saúde", "Educação", "Política", 
  "Meio Ambiente", "Filosofia", "Psicologia", "Literatura"
]
```

### **4. Passos do Tutorial**
```javascript
import { tutorialSteps } from '@/data';

// Array de objetos com informações do tutorial
[
  {
    title: "Bem-vindo ao Convoo!",
    description: "Sua plataforma de conversação com IA",
    content: "Descrição detalhada...",
    icon: "🤖"
  },
  // ... mais passos
]
```

### **5. Dados Iniciais do Perfil**
```javascript
import { initialProfileData } from '@/data';

// Objeto com estrutura inicial do perfil
{
  nickname: "",
  nativeLanguages: [],
  proficiencyLevels: {},
  interests: []
}
```

### **6. Configurações do Onboarding**
```javascript
import { onboardingConfig } from '@/data';

// Objeto com configurações gerais
{
  totalSteps: 2,
  stepLabels: ["Perfil", "Tutorial"],
  showProgress: true,
  showHeader: true,
  headerTitle: "Bem-vindo ao Convoo",
  headerSubtitle: "Vamos configurar sua experiência personalizada"
}
```

## 🚀 Como Usar

### **Importação Simples**
```javascript
import { 
  availableLanguages, 
  proficiencyOptions, 
  interestTopics 
} from '@/data';
```

### **Importação Completa**
```javascript
import * as OnboardingData from '@/data';

// Uso
const languages = OnboardingData.availableLanguages;
const config = OnboardingData.onboardingConfig;
```

### **Importação Específica**
```javascript
import { onboardingConfig } from '@/data/mock/onboardingData.js';
```

## 📝 Exemplos de Implementação

### **1. No Componente Onboarding**
```javascript
import {
  availableLanguages,
  proficiencyOptions,
  interestTopics,
  tutorialSteps,
  initialProfileData,
  onboardingConfig
} from '@/data';

const Onboarding = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  
  return (
    <OnboardingContainer
      // ... outras props
      availableLanguages={availableLanguages}
      proficiencyOptions={proficiencyOptions}
      interestTopics={interestTopics}
      tutorialSteps={tutorialSteps}
      showProgress={onboardingConfig.showProgress}
      showHeader={onboardingConfig.showHeader}
      stepLabels={onboardingConfig.stepLabels}
      headerTitle={onboardingConfig.headerTitle}
      headerSubtitle={onboardingConfig.headerSubtitle}
    />
  );
};
```

### **2. Em Exemplos e Testes**
```javascript
import { 
  availableLanguages, 
  initialProfileData 
} from '@/data';

const ExampleComponent = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  
  const handleLanguageToggle = (language) => {
    // Lógica usando availableLanguages
  };
};
```

## 🔧 Personalização

### **Modificar Dados Existentes**
```javascript
// Em onboardingData.js
export const availableLanguages = [
  "Português", "Inglês", "Espanhol", "Francês",
  // Adicionar novos idiomas aqui
  "Holandês", "Sueco"
];
```

### **Adicionar Novos Dados**
```javascript
// Em onboardingData.js
export const newData = {
  // Seus novos dados aqui
};

// Em mock/index.js
export { newData } from './onboardingData.js';

// Em data/index.js
export * from './mock/index.js';
```

### **Criar Novos Arquivos de Dados**
```javascript
// Criar src/data/mock/userData.js
export const userRoles = ['admin', 'user', 'moderator'];
export const userPermissions = ['read', 'write', 'delete'];

// Adicionar ao mock/index.js
export * from './userData.js';
```

## 📱 Estrutura para Futuras Expansões

### **Dados de Usuário**
```javascript
// src/data/mock/userData.js
export const userRoles = ['admin', 'user', 'moderator'];
export const userStatuses = ['active', 'inactive', 'suspended'];
export const userPreferences = ['notifications', 'privacy', 'language'];
```

### **Dados de Conversação**
```javascript
// src/data/mock/conversationData.js
export const conversationTypes = ['private', 'group', 'public'];
export const messageTypes = ['text', 'image', 'audio', 'video'];
export const conversationStatuses = ['active', 'archived', 'deleted'];
```

### **Dados de Gamificação**
```javascript
// src/data/mock/gamificationData.js
export const achievementTypes = ['daily', 'weekly', 'monthly', 'special'];
export const pointCategories = ['conversation', 'learning', 'social', 'bonus'];
export const badgeLevels = ['bronze', 'silver', 'gold', 'platinum'];
```

## 🎯 Benefícios da Nova Estrutura

1. **Centralização**: Todos os dados mock em um local
2. **Reutilização**: Fácil importação em qualquer componente
3. **Manutenibilidade**: Mudanças centralizadas
4. **Consistência**: Dados uniformes em toda aplicação
5. **Escalabilidade**: Fácil adição de novos dados
6. **Testabilidade**: Dados isolados para testes
7. **Organização**: Estrutura clara e lógica

## 🔄 Migração de Dados Existentes

### **Antes (Dados Inline)**
```javascript
const Onboarding = () => {
  const availableLanguages = [
    "Português", "Inglês", "Espanhol"
    // ... mais idiomas
  ];
  
  // Dados espalhados pelo componente
};
```

### **Depois (Dados Centralizados)**
```javascript
import { availableLanguages } from '@/data';

const Onboarding = () => {
  // Dados importados e organizados
  // Fácil manutenção e reutilização
};
```

## 🚀 Próximos Passos

1. **Dados de API**: Criar estrutura para dados reais
2. **Cache Local**: Implementar sistema de cache
3. **Validação**: Adicionar validação de esquemas
4. **Internacionalização**: Suporte a múltiplos idiomas
5. **Testes**: Cobertura de testes para dados
6. **Documentação**: Documentar novos dados adicionados

## 📚 Recursos Adicionais

- [Vite Alias](https://vitejs.dev/config/shared-options.html#resolve-alias) - Configuração de aliases
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) - Sistema de módulos
- [JavaScript Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) - Estruturas de dados

---
