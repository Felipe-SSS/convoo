import React from 'react';
import { Button } from '@/components/atoms/button.jsx';
import { MessageCircle, TrendingUp, ChevronRight, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AiFeatureSection = () => {
  return (
    <motion.section 
      id="ai-feature" 
      className="py-16 md:py-24 bg-slate-800 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Seu Tutor de Idiomas Pessoal com <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-blue-400">Inteligência Artificial</span></h2>
            <p className="text-lg text-slate-300 mb-6">
              Não encontra um parceiro disponível? Sem problemas! Nossa IA avançada está pronta para conversar, oferecer feedback e ajudar você a melhorar sua pronúncia e vocabulário 24/7.
            </p>
            <ul className="space-y-3 text-slate-300 mb-8">
              <li className="flex items-center"><Brain className="h-6 w-6 mr-3 text-sky-400" /> Prática de conversação interativa a qualquer hora.</li>
              <li className="flex items-center"><TrendingUp className="h-6 w-6 mr-3 text-sky-400" /> Feedback instantâneo sobre sua performance.</li>
              <li className="flex items-center"><MessageCircle className="h-6 w-6 mr-3 text-sky-400" /> Acompanhamento personalizado do seu nível.</li>
            </ul>
            <Button size="lg" variant="outline" className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-800 transition-colors hover:cursor-default">
              Em breve... {/*<ChevronRight className="ml-2 h-5 w-5" />*/}
            </Button>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img alt="Ilustração de inteligência artificial e aprendizado de idiomas" className="rounded-lg shadow-2xl max-w-md w-full" src="https://images.unsplash.com/photo-1677442136019-21780ecad995" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AiFeatureSection;