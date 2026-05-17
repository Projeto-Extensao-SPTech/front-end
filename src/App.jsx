import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth/Auth';
import Voluntariados from './pages/Voluntariados/Voluntariados';
import Patrocinadores from './pages/Patrocinadores/Patrocinadores';
import FeirasDeAdocao from './pages/FeirasDeAdocao/FeirasDeAdocao';
import DoacaoLivre from './pages/DoacaoLivre/DoacaoLivre';
import Ajudar from './pages/Ajudar/Ajudar';
import CadastroFeiraDeAdocao from './pages/CadastroFeiraDeAdocao/CadastroFeiraDeAdocao';
import CadastroNotificacao from './pages/CadastroNotificacao/CadastroNotificacao';
import RouteGuard from './components/RouteGuard';

function AppContent() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';
    const isNoFooterPage = ['/doacao-livre', '/patrocinadores'].includes(location.pathname);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDataString = sessionStorage.getItem("USER_DATA");
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setUser(userData);
            } catch (e) {
                console.error("Erro ao parsear user data", e);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isAuthPage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isAuthPage]);

    return (
        <>
            <div className="sticky top-0 z-50">
                <Navbar variant={isAuthPage ? "white" : "blue"} />
            </div>

            <div className={location.pathname === '/patrocinadores' ? "h-[calc(100vh-96px)] overflow-hidden" : "pb-24 bg-[#052759]"}>
                <Routes>
                    <Route path="/auth" element={<Auth />} />

                    <Route path="/" element={<RouteGuard user={user}><Home /></RouteGuard>} />
                    <Route path="/voluntariados" element={<RouteGuard user={user}><Voluntariados /></RouteGuard>} />
                    <Route path="/patrocinadores" element={<RouteGuard user={user}><Patrocinadores /></RouteGuard>} />
                    <Route path="/doacao-livre" element={<RouteGuard user={user}><DoacaoLivre /></RouteGuard>} />
                    <Route path="/ajudar" element={<RouteGuard user={user}><Ajudar /></RouteGuard>} />
                    <Route path="/feiras-de-adocao" element={<RouteGuard user={user}><FeirasDeAdocao /></RouteGuard>} />
                    <Route path="/cadastro-feira-de-adocao" element={<RouteGuard user={user}><CadastroFeiraDeAdocao /></RouteGuard>} />
                    <Route path="/cadastro-notificacao" element={<RouteGuard user={user}><CadastroNotificacao /></RouteGuard>} />
                </Routes>
            </div>

            {!isAuthPage && !isNoFooterPage && <Footer />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;