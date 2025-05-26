// DrawerLayout.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Conversar', icon: '/icons/talk.png', to: '/main/talk', imgClass: 'h-6 w-auto' },
  { name: 'Agentes IA', icon: '/icons/agents.png', to: '/main/agents', imgClass: 'h-6 w-auto' },
  { name: 'Contatos', icon: '/icons/cont.png', to: '/main/contacts', imgClass: 'h-6 w-6' },
  { name: 'Certificações', icon: '/icons/cert.png', to: '/main/certifications', imgClass: 'h-6 w-auto' },
  { name: 'Perfil', icon: '/icons/profile.png', to: '/main/profile', imgClass: 'h-5 w-auto' },
];

export default function DrawerLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-4 flex flex-col gap-6">
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
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}