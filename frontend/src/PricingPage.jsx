import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components';
import { CheckCircle, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const pricingPlans = [
  {
    name: 'Gratuito',
    price: 'R$0',
    frequency: '/mês',
    features: [
      'Conexões limitadas por dia',
      'Acesso a parceiros de 3 países',
      'Acompanhamento básico de progresso',
      'Prática com IA (limitada)',
    ],
    cta: 'Comece Gratuitamente',
    variant: 'outline',
    icon: <Star className="h-6 w-6 text-slate-500" />,
    highlight: false,
  },
  {
    name: 'Essencial',
    price: 'R$29',
    frequency: '/mês',
    features: [
      'Conexões ilimitadas',
      'Acesso a parceiros de 15 países',
      'Acompanhamento detalhado de progresso',
      'Prática com IA ilimitada',
      'Suporte prioritário',
    ],
    cta: 'Escolher Essencial',
    variant: 'default',
    icon: <Zap className="h-6 w-6 text-white" />,
    highlight: true,
    gradient: 'from-convoo-blue to-blue-600',
  },
  {
    name: 'Pro Global',
    price: 'R$49',
    frequency: '/mês',
    features: [
      'Todos os benefícios do Essencial',
      'Acesso a parceiros de todos os países disponíveis',
      'Sessões de tutoria com IA avançada',
      'Conteúdo exclusivo e workshops',
      'Acesso antecipado a novas funcionalidades',
    ],
    cta: 'Tornar-se Pro',
    variant: 'outline',
    icon: <CheckCircle className="h-6 w-6 text-convoo-orange" />,
    highlight: false,
  },
];

const PricingPage = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow py-16 md:py-24 bg-gradient-to-br from-slate-100 to-sky-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-convoo-blue to-convoo-orange">
            Planos Flexíveis para sua Fluência
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para acelerar seu aprendizado e conectar-se com o mundo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              className={`flex ${plan.highlight ? 'transform lg:scale-105' : ''}`}
            >
              <Card className={`flex flex-col w-full ${plan.highlight ? `bg-gradient-to-br ${plan.gradient} text-white shadow-2xl` : 'bg-white shadow-xl'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-800'}`}>{plan.name}</CardTitle>
                    <div className={`p-2 rounded-full ${plan.highlight ? 'bg-white/20' : 'bg-primary/10'}`}>
                       {React.cloneElement(plan.icon, { className: plan.highlight ? 'text-white' : plan.icon.props.className })}
                    </div>
                  </div>
                  <CardDescription className={`${plan.highlight ? 'text-slate-200' : 'text-slate-500'}`}>
                    <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                    <span className="text-sm">{plan.frequency}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-sky-300' : 'text-convoo-blue'}`} />
                        <span className={`${plan.highlight ? 'text-slate-100' : 'text-slate-600'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button 
                    size="lg" 
                    className={`w-full text-lg ${plan.highlight ? 'bg-white text-convoo-blue hover:bg-slate-100' : plan.variant === 'outline' ? 'border-convoo-orange text-convoo-orange hover:bg-convoo-orange hover:text-white' : 'bg-convoo-blue hover:bg-convoo-blue/90 text-white'}`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-slate-600">
            Dúvidas? <a href="#" className="font-semibold text-convoo-blue hover:underline">Fale conosco</a> ou confira nosso <a href="#" className="font-semibold text-convoo-blue hover:underline">FAQ</a>.
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default PricingPage;