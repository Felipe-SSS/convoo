import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Funcionalidades', href: '#features' },
  { name: 'Como Funciona', href: '#how-it-works' },
  { name: 'IA', href: '#ai-feature' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <img src="/icons/logo-convoo.png" alt="Convoo Logo" className="h-10 md:h-12" />
        </a>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-600 hover:text-convoo-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <Link to="/main">
          <Button size="lg" className="bg-convoo-orange hover:bg-convoo-orange/90 text-white hidden md:flex animate-subtle-pulse">
            Comece Já
          </Button>
        </Link>

        <Button size="icon" variant="ghost" className="md:hidden text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;