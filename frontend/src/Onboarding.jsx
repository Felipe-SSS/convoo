import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, clearOnboardingRedirect, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Se não estiver autenticado, redireciona para login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Limpa o flag de redirecionamento quando chegar no onboarding
    clearOnboardingRedirect();
  }, [isAuthenticated, navigate, clearOnboardingRedirect]);

  const handleCompleteOnboarding = () => {
    toast({
      title: "Onboarding Concluído!",
      description: "Bem-vindo ao Convoo! Redirecionando para o painel...",
      className: "bg-green-500 text-white",
    });
    
    // Redireciona para o painel principal após completar onboarding
    setTimeout(() => {
      navigate('/main');
    }, 2000);
  };

  const handleSkipOnboarding = () => {
    toast({
      title: "Onboarding Ignorado",
      description: "Você pode configurar sua conta mais tarde no perfil.",
      className: "bg-yellow-500 text-white",
    });
    
    navigate('/main');
  };

  // Se não estiver autenticado, não renderiza nada (vai redirecionar)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <img src="/icons/logo-convoo.png" alt="Convoo Logo" className="h-16 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Convoo, {user?.data?.user_profiles?.first_name || 'Usuário'}!
          </h1>
          <p className="text-gray-600 mb-8">
            Este é seu primeiro acesso! Vamos configurar sua conta para começar a usar nossa plataforma de conversação com IA.
          </p>
          
          {/* Aqui você pode adicionar os passos do onboarding */}
          <div className="space-y-4 mb-8">
            <div className="p-6 bg-blue-50 rounded-lg text-left">
              <h3 className="font-semibold text-blue-900 mb-2">🔧 Configure seu Perfil</h3>
              <p className="text-blue-700">Personalize suas informações e preferências de idioma</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg text-left">
              <h3 className="font-semibold text-green-900 mb-2">👥 Adicione Contatos</h3>
              <p className="text-green-700">Conecte-se com amigos e colegas para conversas em grupo</p>
            </div>
            
            <div className="p-6 bg-purple-50 rounded-lg text-left">
              <h3 className="font-semibold text-purple-900 mb-2">🤖 Conheça os Agentes IA</h3>
              <p className="text-purple-700">Descubra nossos agentes especializados para diferentes tipos de conversação</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleSkipOnboarding}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Pular por Agora
            </button>
            <button 
              onClick={handleCompleteOnboarding}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Começar Configuração
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Você pode configurar essas opções a qualquer momento nas configurações.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
