import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const Agents = () => {
  const agents = [
    { name: 'Sofia - Sua Tutora de Espanhol', description: 'Pratique conversação em espanhol com feedback instantâneo.', topics: ['Cotidiano', 'Viagens', 'Cultura Latina'] },
    { name: 'Alex - Seu Coach de Inglês para Negócios', description: 'Aprimore seu inglês profissional e prepare-se para reuniões.', topics: ['Entrevistas', 'Apresentações', 'Networking'] },
    { name: 'Crie um agente!', description: 'Personalize de acordo com o assunto e perfil desejado.', topics: ['À definir'] },
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
          <Bot className="mr-3 h-8 w-8 text-convoo-blue" />
          Agentes IA
        </h1>
      </div>
      <p className="text-lg text-slate-600">
        Pratique suas habilidades de conversação a qualquer momento com nossos agentes de IA especializados.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-convoo-blue">{agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-600 mb-4">{agent.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-slate-700 mb-1">Tópicos Populares:</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-convoo-orange/10 text-convoo-orange text-xs rounded-full">{topic}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full bg-convoo-blue hover:bg-convoo-blue/90">
                  <MessageSquare className="mr-2 h-4 w-4" /> Conversar com {agent.name.split(' ')[0]}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="bg-white shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Como funciona a prática com IA?</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-600 space-y-2">
          <p>Nossos Agentes IA são projetados para simular conversas reais, ajudando você a:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Melhorar sua pronúncia e fluidez.</li>
            <li>Expandir seu vocabulário em contextos específicos.</li>
            <li>Ganhar confiança para falar com nativos.</li>
            <li>Receber feedback construtivo sobre sua performance.</li>
          </ul>
          <p className="mt-2">Escolha um agente, um tópico de interesse e comece a praticar imediatamente!</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Agents;
