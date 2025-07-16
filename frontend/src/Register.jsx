import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayoutRegister from '@/components/layout/AuthLayoutRegister';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import AuthContext from './context/AuthContext';

// Este é o ficheiro Register.jsx completo, com a lógica e os 'logs' de depuração
const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);

  // A função que deve ser chamada
  const handleSubmit = async (e) => {
    // LOG DE DEPURAÇÃO 1: Este é o primeiro log que precisa de aparecer
    console.log('PASSO 1: A função handleSubmit foi chamada!');
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro no Cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // LOG DE DEPURAÇÃO 2
      console.log('PASSO 2: A tentar chamar a função "register" do AuthContext...');
      await register({ name, email, password });

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a tela de login.",
        className: "bg-green-500 text-white",
      });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Não foi possível criar a conta.";
      toast({
        title: "Erro no Cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayoutRegister
      title="Crie sua Conta"
      description="Junte-se à comunidade Convoo e comece a aprender idiomas!"
      formFooter={
        <p>Já tem uma conta? <Link to="/login" className="font-medium text-convoo-blue hover:underline">Faça login</Link></p>
      }
    >
      {/* VERIFIQUE AQUI: A tag <form> DEVE ter o 'onSubmit={handleSubmit}' */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
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
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
         <div>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 pt-2">
          Ao se cadastrar, você concorda com nossos <Link to="#" className="underline hover:text-convoo-blue">Termos de Uso</Link> e <Link to="#" className="underline hover:text-convoo-blue">Política de Privacidade</Link>.
        </p>

        {/* VERIFIQUE AQUI: O botão principal DEVE ter 'type="submit"' para acionar o 'onSubmit' do formulário */}
        <Button type="submit" className="w-full bg-convoo-orange hover:bg-convoo-orange/90 text-white text-lg py-3" disabled={isLoading}>
          {isLoading ? 'Criando Conta...' : 'Criar Conta'}
        </Button>
      </form>
    </AuthLayoutRegister>
  );
};

export default Register;