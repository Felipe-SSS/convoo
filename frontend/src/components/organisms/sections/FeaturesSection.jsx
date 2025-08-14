import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card.jsx';
import { Globe, PhoneCall, Award, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-convoo-blue" />,
    title: 'Conexões Globais',
    description: 'Escolha o país e conecte-se instantaneamente com falantes nativos para praticar seu idioma alvo.',
  },
  {
    icon: <PhoneCall className="h-10 w-10 text-convoo-orange" />,
    title: 'Chamadas Gratuitas',
    description: 'Participe de conversas ilimitadas e gratuitas. Aprimore sua fluência sem custos.',
  },
  {
    icon: <Award className="h-10 w-10 text-convoo-blue" />,
    title: 'Progresso Gamificado',
    description: 'Acompanhe sua evolução de forma divertida e motivadora. Desbloqueie conquistas e suba de nível!',
  },
  {
    icon: <Bot className="h-10 w-10 text-convoo-orange" />,
    title: 'Prática com IA',
    description: 'Nossa IA analisa sua fala e acompanha seu nível, mesmo sem um parceiro.',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeaturesSection = () => {
  return (
    <motion.section 
      id="features" 
      className="py-16 md:py-24 bg-slate-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800">Por que escolher a <span className="text-convoo-blue">Convoo</span>?</h2>
        <p className="text-center text-slate-600 mb-12 md:mb-16 max-w-2xl mx-auto">
          Oferecemos uma plataforma completa para você destravar sua fluência em novos idiomas de forma interativa e eficaz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.15, duration: 0.5 }
                })
              }}
            >
              <Card className="h-full text-center bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center">
                  <div className="p-3 rounded-full bg-gradient-to-tr from-convoo-blue/10 to-convoo-orange/10 mb-4 inline-block">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;