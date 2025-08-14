import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);
    const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState(false);

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/users/me')
               .then(response => setUser(response.data))
               .catch(() => {
                   localStorage.removeItem('authToken');
                   setToken(null);
               })
               .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);
    
    
    // Função de Login
    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user, isFirstLogin } = response.data.data;
        localStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setToken(token);
        setUser(user);
        
        // Se for o primeiro login, marca para redirecionar para onboarding
        if (isFirstLogin) {
            setShouldRedirectToOnboarding(true);
        }
        
        return { isFirstLogin };
    };

    // Função de Registro CORRIGIDA para enviar os dados corretos
    const register = async (formData) => {
        // formData aqui é o objeto { name, email, password } do seu formulário
        
        // 1. Transformar os dados do formulário para o formato da API
        const nameParts = formData.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName; // Garante que lastName não seja vazio
        
        const apiData = {
            firstName: firstName,
            lastName: lastName,
            username: formData.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000),
            email: formData.email,
            password: formData.password,
            birthdate: '1999-01-01' // ATENÇÃO: Usando um valor fixo. O ideal é adicionar este campo no seu formulário Register.jsx!
        };

        // --- DEBUGGING LOG ---
        console.log('>>> [REGISTO] Frontend está a enviar este objeto para a API:', apiData);
        
        // 2. Enviar os dados formatados para a API
        await api.post('/auth/register', apiData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setShouldRedirectToOnboarding(false);
        delete api.defaults.headers.common['Authorization'];
    };

    // Função para limpar o flag de redirecionamento após navegar para onboarding
    const clearOnboardingRedirect = () => {
        setShouldRedirectToOnboarding(false);
    };

    const authContextValue = { 
        user, 
        login, 
        register, 
        logout, 
        loading, 
        isAuthenticated: !!user,
        shouldRedirectToOnboarding,
        clearOnboardingRedirect
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

