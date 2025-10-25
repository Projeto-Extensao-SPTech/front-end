import { useState } from 'react'
import { AuthenticationCard } from './components/registro/AuthenticationCard'
import HomeSite from './components/home/HomeSite'
import { PatrocinadoresSite } from './components/Patrocinadores/PatrocinadoresSite'

function App() {
    // Estado para controlar qual tela está ativa: 'login' ou 'home'
    const [currentView, setCurrentView] = useState('home')
    const [authMode, setAuthMode] = useState('login')

    const goToHome = () => setCurrentView('home')

    const goToLogin = () => {
        setAuthMode('login')
        setCurrentView('login')
    }

    const goToVoluntariados = () => setCurrentView('voluntariados')

    // Função para mudar para a tela de cadastro
    const goToCadastro = () => {
        setAuthMode('cadastro')   // Define modo como cadastro
        setCurrentView('login')   // Exibe a tela de login (com modo cadastro)
    }

    // Renderização principal (fora das funções)
    if (currentView === 'home') {
        return <HomeSite onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} onNavigateToVoluntariados={goToVoluntariados} />
    }

    if (currentView === 'patrocinadores') {
        return <PatrocinadoresSite onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} />
    }

    if (currentView === 'voluntariados') {
        return <VoluntariadosSite onNavigateToHome={goToHome} onNavigateToVoluntariados={goToVoluntariados} onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} />
    }


    // Renderiza o componente de autenticação para login ou cadastro
    return <AuthenticationCard onNavigateToHome={goToHome} initialMode={authMode} />
}

export default App
