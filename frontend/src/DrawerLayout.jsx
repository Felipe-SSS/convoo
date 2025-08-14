import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import AuthContext from './context/AuthContext';
import { useToast } from './components';

const navItems = [
  { name: 'Conversar', icon: '/icons/talk.png', to: '/main/talk', imgClass: 'h-6 w-auto' },
  { name: 'Agentes IA', icon: '/icons/agents.png', to: '/main/agents', imgClass: 'h-6 w-auto' },
  { name: 'Contatos', icon: '/icons/cont.png', to: '/main/contacts', imgClass: 'h-6 w-6' },
  { name: 'Certificações', icon: '/icons/cert.png', to: '/main/certifications', imgClass: 'h-6 w-auto' },
  { name: 'Perfil', icon: '/icons/profile.png', to: '/main/profile', imgClass: 'h-5 w-auto' },
];

const secondaryNavItems = [
  { name: 'Configurações', to: '/main/config', icon: Settings },
  { name: 'Sair', to: '/', icon: LogOut },
];

export default function DrawerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { toast } = useToast();

  const handleLogout = () => {
    try {
      logout();
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
        duration: 3000,
      });
      
      navigate('/');
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao desconectar. Tentando novamente...",
        variant: "destructive",
        duration: 3000,
      });
      
      localStorage.removeItem('authToken');
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen">
      
      <aside className="fixed left-0 top-0 w-60 h-screen bg-white z-10 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] flex flex-col">        {/* Parte scrollável com logo e navegação principal */}
        <div className="flex-1 overflow-y-auto p-4">
          <img src="/icons/logo-convoo.png" alt="Convoo Logo" className="h-10 mx-auto mb-6" />
          
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition
                ${location.pathname === item.to ? 'bg-gray-200 text-gray-900' : 'text-slate-700'}`}
            >
              <img src={item.icon} alt={item.name} className={item.imgClass} />
              {item.name.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 space-y-1">
          {secondaryNavItems.map(item => (
            <Link
              key={item.name}
              to={item.name === 'Sair' ? '#' : item.to}
              onClick={item.name === 'Sair' ? handleLogout : undefined}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${location.pathname === item.to ? 'bg-gray-200 text-gray-900' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-slate-50 ml-60">
        <Outlet />
      </main>
    </div>
  );
}
