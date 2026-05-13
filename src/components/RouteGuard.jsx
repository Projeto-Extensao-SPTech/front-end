import { Navigate } from 'react-router-dom';

export default function RouteGuard({ children, user }) {
    if (!user) {
        return children;
    }

    const isAdmin = user?.is_admin === 1 || user?.is_admin === true;
    const currentPath = window.location.pathname;

    // REGRAS PARA ADMIN - rotas que NÃO PODE acessar
    const adminBlockedRoutes = ['/', '/voluntariados', '/ajudar', '/patrocinadores', '/doacao-livre'];
    
    if (isAdmin && adminBlockedRoutes.includes(currentPath)) {
        return <Navigate to="/feiras-de-adocao" replace />;
    }

    // REGRAS PARA USUÁRIO COMUM - rotas que NÃO PODE acessar
    const userBlockedRoutes = ['/', '/cadastro-feira-de-adocao', '/cadastro-notificacao'];
    
    if (!isAdmin && userBlockedRoutes.includes(currentPath)) {
        return <Navigate to="/ajudar" replace />;
    }

    return children;
}