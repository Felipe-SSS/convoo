import React from 'react';
import { Users, UserPlus, Search, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const contactsData = [
  { id: 1, name: 'Ana Clara Oliveira', country: 'Brasil', lang: 'Português, Inglês', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', online: true },
  { id: 2, name: 'David Miller', country: 'Canadá', lang: 'Inglês, Francês', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61', online: false },
  { id: 3, name: 'Sofia Rodriguez', country: 'Espanha', lang: 'Espanhol, Catalão', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956', online: true },
  { id: 4, name: 'Liam Smith', country: 'Austrália', lang: 'Inglês', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', online: false },
  { id: 5, name: 'Isabelle Dubois', country: 'França', lang: 'Francês', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80', online: true },
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const filteredContacts = contactsData.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="space-y-8"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
          <Users className="mr-3 h-8 w-8 text-convoo-orange" />
          Meus Contatos
        </h1>
        <Button className="bg-convoo-blue hover:bg-convoo-blue/90">
          <UserPlus className="mr-2 h-4 w-4" /> Adicionar Novo Contato
        </Button>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Gerenciar Conexões</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Buscar contatos..." 
              className="pl-10 w-full sm:w-1/2 lg:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredContacts.length > 0 ? (
            <div className="space-y-4">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0,1)}</AvatarFallback>
                       {contact.online && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-800">{contact.name}</p>
                      <p className="text-sm text-slate-500">{contact.lang} - {contact.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-convoo-blue border-convoo-blue hover:bg-convoo-blue/10 hover:text-convoo-blue">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500">Ver Perfil</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">Nenhum contato encontrado com "{searchTerm}".</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Contacts;
