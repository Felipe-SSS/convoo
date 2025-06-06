import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-900 text-slate-400">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center mb-6">
          <img src="/icons/logo-solo.png" alt="Convoo Logo Rodapé" className="h-36" />
        </div>
        <p className="text-sm mb-2">
          Conectando o mundo, uma conversa por vez.
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Convoo. Todos os direitos reservados.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <a href="#" className="hover:text-convoo-orange transition-colors">Termos de Serviço</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-convoo-orange transition-colors">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;