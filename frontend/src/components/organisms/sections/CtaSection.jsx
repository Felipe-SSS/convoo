import React from 'react';
import { Button } from '@/components/atoms/button.jsx';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const CtaSection = () => {
  return (
    <motion.section 
      className="py-20 md:py-32 text-center bg-gradient-to-r from-convoo-blue to-blue-600 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para Desbloquear <br className="hidden md:block" /> seu Potencial Multilíngue?</h2>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10">
          Junte-se a milhares de estudantes de idiomas e comece sua jornada para a fluência hoje mesmo. É grátis para começar!
        </p>
        <Button size="lg" className="text-lg px-10 py-7 bg-convoo-orange hover:bg-convoo-orange/90 text-white transform hover:scale-105 transition-transform">
          Junte-se à Convoo Gratuitamente
        </Button>
         <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <img alt="Bandeira do Brasil" className="h-16 w-24 object-cover rounded-md shadow-md mx-auto" src="https://images.unsplash.com/photo-1703540918559-2ac64d38b6c8" />
            <img alt="Bandeira dos Estados Unidos" className="h-16 w-24 object-cover rounded-md shadow-md mx-auto" src="https://images.unsplash.com/photo-1682427272774-af0c5073b075" />
            <img alt="Bandeira da Espanha" className="h-16 w-24 object-cover rounded-md shadow-md mx-auto" src="https://images.unsplash.com/photo-1652954884281-8fb97179c4f9" />
            <img alt="Bandeira da França" className="h-16 w-24 object-cover rounded-md shadow-md mx-auto" src="https://images.unsplash.com/photo-1694428266927-cd50ae9d8f51" />
        </div>
      </div>
    </motion.section>
  );
};

export default CtaSection;