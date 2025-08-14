// ========================================
// DADOS MOCK PARA O ONBOARDING
// ========================================

// Idiomas disponíveis para seleção
export const availableLanguages = [
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
  "Hindi"
];

// Opções de nível de proficiência
export const proficiencyOptions = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
  { value: "fluent", label: "Fluente" }
];

// Tópicos de interesse disponíveis
export const interestTopics = [
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
  "Literatura"
];

// Passos do tutorial
export const tutorialSteps = [
  {
    title: "Bem-vindo ao Convoo!",
    description: "Sua plataforma de conversação com IA",
    content: "O Convoo é uma plataforma inovadora que combina conversação natural com inteligência artificial para criar experiências únicas de aprendizado e interação.",
    icon: "🤖"
  },
  {
    title: "Conversas Inteligentes",
    description: "Conecte-se com agentes IA especializados",
    content: "Nossos agentes IA são especializados em diferentes áreas e podem ajudar você a praticar idiomas, aprender novos tópicos ou simplesmente ter conversas interessantes.",
    icon: "💬"
  },
  {
    title: "Sistema de Gamificação",
    description: "Aprenda enquanto se diverte",
    content: "Ganhe pontos, badges e suba de nível conforme você interata com a plataforma. Complete desafios e mantenha uma rotina de aprendizado consistente.",
    icon: "🏆"
  },
  {
    title: "Conecte-se com Outros",
    description: "Grupos e conversas colaborativas",
    content: "Junte-se a grupos de interesse, participe de conversas em grupo e conecte-se com pessoas que compartilham seus interesses e objetivos de aprendizado.",
    icon: "👥"
  },
  {
    title: "Pronto para Começar!",
    description: "Sua jornada está prestes a começar",
    content: "Agora você está pronto para explorar todas as funcionalidades do Convoo. Vamos começar sua jornada de aprendizado e conexão!",
    icon: "🚀"
  }
];

// Dados iniciais do perfil
export const initialProfileData = {
  nickname: "",
  nativeLanguages: [],
  proficiencyLevels: {},
  interests: []
};

// Configurações do onboarding
export const onboardingConfig = {
  totalSteps: 2,
  stepLabels: ["Perfil", "Tutorial"],
  showProgress: true,
  showHeader: true,
  headerTitle: "Bem-vindo ao Convoo",
  headerSubtitle: "Vamos configurar sua experiência personalizada"
};
