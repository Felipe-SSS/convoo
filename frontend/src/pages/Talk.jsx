import React, { useState } from 'react'; // 1. Importa o hook useState
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WorldConnectionsMap from '@/components/ui/WorldConnectionsMap';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Zap, Clock, Users, Globe, BookOpen, MapPin, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Talk = () => {
  const navigate = useNavigate();

  // 2. Cria estados para armazenar as seleções dos filtros
  const [language, setLanguage] = useState('any'); // 'any' para "Qualquer"
  const [country, setCountry] = useState('any');
  const [topic, setTopic] = useState('any');     // 'any' para "Livre"

  // 3. Modifica a função para enviar as preferências do usuário para a próxima página
  const handleStartCall = () => {
    navigate('/main/call-loading', { 
      state: { 
        preferences: { language, country, topic } 
      } 
    });
  };
  
  // O restante dos seus dados (userStats, recentContacts) permanece o mesmo
  const userStats = [
    { title: 'Minutos Conversados', value: '1,230', icon: <Clock className="h-6 w-6 text-convoo-blue" />, progress: 75, color: 'bg-convoo-blue' },
    { title: 'Sequência de Prática', value: '15 dias', icon: <Zap className="h-6 w-6 text-purple-500" />, progress: 50, color: 'bg-purple-500' },
    { title: 'Conversas Realizadas', value: '120', icon: <MessageCircle className="h-6 w-6 text-green-500" />, progress: 80, color: 'bg-green-500' },
    { title: 'Países Conectados', value: '10', icon: <Globe className="h-6 w-6 text-yellow-500" />, progress: 60, color: 'bg-yellow-500' },
  ];

  const recentContacts = [
    { name: 'Maria Silva', country: 'Brasil', lang: 'Português', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'John Doe', country: 'EUA', lang: 'Inglês', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' },
  ];

  return (
    <motion.div 
      className="space-y-8 p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex justify-end items-center">
        <p className="text-slate-500">Você pode entrar em contato pelo e-mail <strong>contato@convoo.com</strong></p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-convoo-blue to-blue-600 text-white shadow-xl p-6 flex flex-col justify-center items-center text-center">
          <CardHeader className="items-center pb-2">
            <MessageCircle className="h-16 w-16 mb-4 opacity-80" />
            <CardTitle className="text-3xl font-bold">Inicie uma Conversa</CardTitle>
            <CardDescription className="text-blue-100 text-lg max-w-2xl">
              Encontre alguém para praticar idiomas agora mesmo.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <Button 
              size="lg" 
              className="w-full max-w-xs text-lg py-7 bg-convoo-orange hover:bg-convoo-orange/90 text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={handleStartCall}
            >
              <Zap className="mr-2 h-5 w-5" /> Iniciar Chamada
            </Button>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
              
              {/* 4. Conecta os componentes Select ao estado do React */}
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-blue-200 mb-1">Idioma</label>
                <Select value={language} onValueChange={setLanguage} defaultValue="any">
                  <SelectTrigger id="language" className="bg-white/20 border-white/30 text-white placeholder:text-blue-100">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    <SelectItem value="en">Inglês</SelectItem>
                    <SelectItem value="es">Espanhol</SelectItem>
                    <SelectItem value="fr">Francês</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-blue-200 mb-1">País de Preferência</label>
                <Select value={country} onValueChange={setCountry} defaultValue="any">
                  <SelectTrigger id="country" className="bg-white/20 border-white/30 text-white placeholder:text-blue-100">
                    <SelectValue placeholder="Qualquer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer</SelectItem>
                    <SelectItem value="us">Estados Unidos</SelectItem>
                    <SelectItem value="gb">Reino Unido</SelectItem>
                    <SelectItem value="es">Espanha</SelectItem>
                    <SelectItem value="br">Brasil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-blue-200 mb-1">Assunto</label>
                <Select value={topic} onValueChange={setTopic} defaultValue="any">
                  <SelectTrigger id="topic" className="bg-white/20 border-white/30 text-white placeholder:text-blue-100">
                    <SelectValue placeholder="Livre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Livre</SelectItem>
                    <SelectItem value="hobbies">Hobbies</SelectItem>
                    <SelectItem value="travel">Viagens</SelectItem>
                    <SelectItem value="work">Trabalho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </CardContent>
        </Card>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-slate-700"><TrendingUp className="mr-2 h-5 w-5 text-convoo-orange" /> Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userStats.slice(0, 2).map(stat => (
                <div key={stat.title}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-600">{stat.title}</span>
                    <span className="text-sm font-bold">{stat.value}</span>
                  </div>
                  <div className={`h-2 rounded-full ${stat.color}`} style={{ width: `${stat.progress}%` }}></div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-slate-700"><Users className="mr-2 h-5 w-5 text-convoo-blue" /> Contatos Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentContacts.map(contact => (
                <div key={contact.name} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-md transition-colors">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-slate-700">{contact.name}</p>
                    <p className="text-xs text-slate-500">{contact.lang} ({contact.country})</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-convoo-blue hover:bg-convoo-blue/10">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-slate-800 mt-10">Estatísticas Gerais</motion.h2>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map(stat => (
          <Card key={stat.title} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`h-2 mt-2 rounded-full ${stat.color}`} style={{ width: `${stat.progress}%` }}></div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-slate-700">
              <BookOpen className="mr-2 h-5 w-5 text-yellow-500" /> Tópicos Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Cultura e Tradições</span> <span className="font-semibold">120 conversas</span></li>
              <li className="flex justify-between p-2 rounded"><span>Viagens e Aventuras</span> <span className="font-semibold">95 conversas</span></li>
              <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Gastronomia Local</span> <span className="font-semibold">88 conversas</span></li>
              <li className="flex justify-between p-2 rounded"><span>Tecnologia e Futuro</span> <span className="font-semibold">70 conversas</span></li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Talk;