import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayoutLogin from '@/components/layout/AuthLayoutLogin';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import AuthContext from './context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, shouldRedirectToOnboarding } = useContext(AuthContext);

  useEffect(() => {
    if (user && !shouldRedirectToOnboarding) {
      navigate('/main');
    }
  }, [user, navigate, shouldRedirectToOnboarding]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Erro no Login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { isFirstLogin } = await login(email, password);
      
      if (isFirstLogin) {
        toast({
          title: "Bem-vindo ao Convoo!",
          description: "Vamos configurar sua conta...",
          className: "bg-blue-500 text-white",
        });
        navigate('/onboarding');
      } else {
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando para o painel...",
          className: "bg-green-500 text-white",
        });
        navigate('/main');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.erro || "Credenciais inválidas. Tente novamente.";
      toast({
        title: "Erro no Login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayoutLogin
      title="Bem-vindo de Volta!"
      description="Acesse sua conta para continuar sua jornada de aprendizado."
      formFooter={
        <p>Não tem uma conta? <Link to="/register" className="font-medium text-convoo-blue hover:underline">Cadastre-se</Link></p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="email" type="email" placeholder="seu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              required disabled={isLoading} className="pl-10"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Senha</Label>
            <Link to="#" className="text-sm font-medium text-convoo-blue hover:underline">Esqueceu a senha?</Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="password" type={showPassword ? 'text' : 'password'} placeholder="********"
              value={password} onChange={(e) => setPassword(e.target.value)}
              required disabled={isLoading} className="pl-10 pr-10"
            />
            <button
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full bg-convoo-blue hover:bg-convoo-blue/90 text-lg py-3" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </AuthLayoutLogin>
  );
};

export default Login;