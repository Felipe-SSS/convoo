import React from 'react';
import { Users, MessageCircle, TrendingUp, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const howItWorksSteps = [
  { id: 1, title: 'Crie sua Conta', description: 'Rápido e fácil. Comece em minutos.', icon: <Users className="h-8 w-8 text-primary" /> },
  { id: 2, title: 'Escolha o Idioma', description: 'Selecione o idioma que quer praticar e o país de interesse.', icon: <Languages className="h-8 w-8 text-secondary" /> },
  { id: 3, title: 'Conecte-se e Converse', description: 'Inicie chamadas e mergulhe na conversação real.', icon: <MessageCircle className="h-8 w-8 text-primary" /> },
  { id: 4, title: 'Acompanhe seu Progresso', description: 'Veja sua evolução e motive-se com nosso sistema gamificado.', icon: <TrendingUp className="h-8 w-8 text-secondary" /> },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorksSection = () => {
  return (
    <motion.section 
      id="how-it-works" 
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-800">Comece em <span className="text-convoo-orange">Poucos Passos</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
             <motion.div
              key={step.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.2, duration: 0.5 }
                })
              }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg"
            >
              <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-convoo-blue to-convoo-orange text-white text-2xl font-bold">
                {step.id}
              </div>
              <div className="mb-3">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;