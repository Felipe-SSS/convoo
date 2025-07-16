import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Enquanto carrega a informação de autenticação, não renderiza nada
    if (loading) {
        return <div>Carregando...</div>; // Ou um spinner/loading component
    }

    // Se não estiver autenticado, redireciona para a página de login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Se estiver autenticado, renderiza a página filha
    return children;
};

export default ProtectedRoute;