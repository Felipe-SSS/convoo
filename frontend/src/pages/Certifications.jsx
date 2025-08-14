import React from 'react';
import { Award, CheckCircle, Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, Button, Progress } from '@/components';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const certificationsData = [
  { id: 1, title: 'Fluência em Inglês - Nível B2', date: '15 de Março, 2025', provider: 'Convoo Language Institute', progress: 100, completed: true, iconColor: 'text-convoo-blue' },
  { id: 2, title: 'Conversação Avançada em Espanhol', date: 'Em Progresso', provider: 'Convoo Language Institute', progress: 65, completed: false, iconColor: 'text-convoo-orange' },
  { id: 3, title: 'Francês para Iniciantes - Nível A1', date: '02 de Janeiro, 2025', provider: 'Convoo Language Institute', progress: 100, completed: true, iconColor: 'text-green-500' },
  { id: 4, title: 'Mandarim Básico - HSK 1', date: 'Em Progresso', provider: 'Convoo Language Institute', progress: 30, completed: false, iconColor: 'text-purple-500' },
];

const Certifications = () => {
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
          <Award className="mr-3 h-8 w-8 text-yellow-500" />
          Minhas Certificações
        </h1>
      </div>
      <p className="text-lg text-slate-600">
        Acompanhe e compartilhe suas conquistas no aprendizado de idiomas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificationsData.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`bg-white shadow-lg hover:shadow-xl transition-shadow ${cert.completed ? 'border-l-4 border-convoo-blue' : 'border-l-4 border-convoo-orange'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-xl ${cert.iconColor}`}>{cert.title}</CardTitle>
                  {cert.completed ? <CheckCircle className="h-7 w-7 text-green-500" /> : <Award className={`h-7 w-7 ${cert.iconColor}`} />}
                </div>
                <CardDescription className="text-sm text-slate-500">
                  {cert.provider} - {cert.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cert.completed ? (
                  <p className="text-green-600 font-semibold">Concluído!</p>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Progresso: {cert.progress}%</p>
                    <Progress value={cert.progress} className={cert.progress === 100 ? 'bg-convoo-blue' : 'bg-convoo-orange'} />
                  </div>
                )}
              </CardContent>
              {cert.completed && (
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm" className="text-convoo-blue border-convoo-blue hover:bg-convoo-blue/10">
                    <Download className="mr-2 h-4 w-4" /> Baixar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-convoo-orange">
                    <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
      <Card className="bg-white shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Como obter certificações?</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-600 space-y-2">
          <p>As certificações Convoo são uma ótima maneira de validar suas habilidades linguísticas. Para obtê-las:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Complete os módulos de aprendizado designados para cada nível.</li>
            <li>Participe ativamente de conversas com nativos e agentes IA.</li>
            <li>Alcance as metas de progresso e pontuação nos testes de avaliação.</li>
            <li>Mantenha uma frequência de prática consistente na plataforma.</li>
          </ul>
          <p className="mt-2">Novas oportunidades de certificação são adicionadas regularmente. Fique de olho!</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Certifications;
