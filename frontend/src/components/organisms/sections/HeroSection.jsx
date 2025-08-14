import React from 'react';
import { Button } from '@/components/atoms/button.jsx';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-20 md:py-32 text-center bg-cover bg-center"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1522071820081-009f0129c7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-convoo-blue to-convoo-orange"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Conecte-se com o Mundo. <br className="hidden md:block" /> Fale Qualquer Idioma.
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Pratique conversação com nativos, explore culturas e domine novos idiomas com a Convoo. Gratuito, divertido e gamificado!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button size="lg" className="text-lg px-10 py-7 bg-convoo-blue hover:bg-convoo-blue/90 text-white">
            Comece Agora Gratuitamente <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
         <div className="mt-16 flex justify-center">
            <img alt="Demonstração da interface do Convoo em um celular e tablet" className="max-w-full md:max-w-2xl rounded-lg shadow-2xl" src="src\components\img\convoo_eg.svg" />
         </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;