import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Voluntariados from './pages/Voluntariados';
import Patrocinadores from './pages/Patrocinadores';
import FeirasDeAdocao from './pages/FeirasDeAdocao';
import DoacaoLivre from './pages/DoacaoLivre';

function AppContent() {
    const location = useLocation();
    const isAuthPage = location.pathname === '/auth';

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

            <div className={location.pathname === '/patrocinadores' ? "h-[calc(100vh-96px)] overflow-hidden" : ""}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/voluntariados" element={<Voluntariados />} />
                    <Route path="/patrocinadores" element={<Patrocinadores />} />
                    <Route path="/doacao-livre" element={<DoacaoLivre />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/feirasdeadocao" element={<FeirasDeAdocao />} />
                </Routes>
            </div>
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
