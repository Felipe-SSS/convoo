import React, { useEffect, useState } from 'react';
import { UserCircle, Edit3, ShieldCheck, Bell, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Erro ao buscar usuário');
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Hardcoded fields
  const avatarUrl = '/icons/default_avatar.png';
  const nativeLanguage = 'Português (Brasil)';
  const learningLanguages = ['Inglês (Avançado)', 'Espanhol (Intermediário)'];
  const interests = ['Tecnologia', 'Viagens', 'Fotografia', 'Música'];

  // Dynamic fields
  const user = userData?.data;
  const name = user?.user_profiles ? `${user.user_profiles.first_name} ${user.user_profiles.last_name}` : '';
  const email = user?.email || '';
  const joinDate = user ? formatDate(user.created_at) : '';

  if (loading) return <div className="p-8 text-center text-slate-500">Carregando perfil...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

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
          <UserCircle className="mr-3 h-8 w-8 text-convoo-blue" />
          Meu Perfil
        </h1>
        <Button variant="outline" className="text-convoo-blue border-convoo-blue hover:bg-convoo-blue/10">
          <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-white shadow-lg text-center">
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4 ring-4 ring-convoo-blue ">
                <AvatarImage
                  src={avatarUrl}
                  alt={name}
                  className="object-cover object-center w-full h-full rounded-full"
                />
                <AvatarFallback>{name.substring(0,1)}</AvatarFallback>
              </Avatar>

              <CardTitle className="text-2xl text-slate-800">{name}</CardTitle>
              <CardDescription className="text-slate-500">{email}</CardDescription>
              <CardDescription className="text-xs text-slate-400 mt-1">Membro desde: {joinDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-convoo-orange hover:bg-convoo-orange/90">Alterar Foto</Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 flex items-center"><Globe className="mr-2 h-5 w-5 text-convoo-orange" /> Idiomas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-slate-600">Nativo:</p>
                <p className="text-slate-500">{nativeLanguage}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-600">Aprendendo:</p>
                <ul className="list-disc list-inside text-slate-500">
                  {learningLanguages.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-slate-600">Nome Completo</Label>
                <Input id="name" defaultValue={name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-600">Email</Label>
                <Input id="email" type="email" defaultValue={email} className="mt-1" disabled />
              </div>
              <div>
                <Label htmlFor="interests" className="text-slate-600">Interesses (separados por vírgula)</Label>
                <Input id="interests" defaultValue={interests.join(', ')} className="mt-1" />
              </div>
              <Button className="bg-convoo-blue hover:bg-convoo-blue/90">Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-green-500" /> Segurança e Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Alterar Senha</Button>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactor" className="text-slate-600">Autenticação de Dois Fatores (2FA)</Label>
                <Switch id="twoFactor" />
              </div>
              <p className="text-sm text-slate-500">Gerencie suas <a href="#" className="text-convoo-blue hover:underline">configurações de privacidade</a>.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 flex items-center"><Bell className="mr-2 h-5 w-5 text-yellow-500" /> Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="text-slate-600">Notificações por Email</Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="appNotifications" className="text-slate-600">Notificações no Aplicativo</Label>
                <Switch id="appNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newContacts" className="text-slate-600">Alertas de Novos Contatos</Label>
                <Switch id="newContacts" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
