import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayoutLogin from '@/components/layout/AuthLayoutLogin';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempt:', { email, password });
    
    // Simulate successful login
    if (email && password) {
        toast({
            title: "Login bem-sucedido!",
            description: "Redirecionando para o painel...",
            className: "bg-green-500 text-white",
        });
        setTimeout(() => {
            navigate('/main');
        }, 1500);
    } else {
        toast({
            title: "Erro no Login",
            description: "Por favor, preencha todos os campos.",
            variant: "destructive",
        });
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
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
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
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full bg-convoo-blue hover:bg-convoo-blue/90 text-lg py-3">
          Entrar
        </Button>
      </form>
    </AuthLayoutLogin>
  );
};

export default Login;