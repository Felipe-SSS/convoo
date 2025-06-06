import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const conlogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/13e7dfcc-9954-41c7-a924-7433fd40a466/060a102f45e7b3e5c7fba88a7d09f9f0.png";

const LoadingDot = ({ delay }) => (
  <motion.div
    className="h-3 w-3 bg-white rounded-full"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

const CallLoadingPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/main/talk');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/main/call/${Date.now()}`); // Simulate finding a call and redirecting
    }, 5000); // Simulating a 5-second search
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-convoo-blue to-blue-700 text-white p-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-6 left-6 text-white hover:bg-white/20"
        onClick={handleCancel}
      >
        <X className="h-6 w-6" />
      </Button>
      
      <motion.img 
        src={"/icons/logo-convoo.png"} 
        alt="Convoo Logo" 
        className="h-40 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />

      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        Estamos procurando alguém para se conectar...
      </motion.h1>
      
      <motion.div 
        className="flex space-x-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <LoadingDot delay={0} />
        <LoadingDot delay={0.2} />
        <LoadingDot delay={0.4} />
      </motion.div>

      <motion.div 
        className="w-full max-w-md bg-white/10 p-6 rounded-lg shadow-xl text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 120 }}
      >
        <h2 className="text-xl font-semibold mb-2">Dica Rápida:</h2>
        <p className="text-blue-100 text-sm">
          Comece com um "Olá!" amigável e pergunte sobre o dia da pessoa. <br />Lembre-se, o objetivo é praticar e se divertir! 😊
        </p>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 text-center text-blue-200 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <p>Aguarde enquanto encontramos o parceiro de conversação ideal para você.</p>
        <p>Isso pode levar alguns instantes.</p>
      </motion.div>
    </motion.div>
  );
};

export default CallLoadingPage;