import { useState } from 'react'
import { AuthenticationCard } from './components/AuthenticationCard'
import HomeSite from './components/HomeSite'
import { PatrocinadoresSite } from './components/Patrocinadores/PatrocinadoresSite'

function App() {
    // Estado para controlar qual tela está ativa: 'login' ou 'home'
    const [currentView, setCurrentView] = useState('patrocinadores')

    // Estado para controlar o modo da autenticação: 'login' ou 'cadastro'
    const [authMode, setAuthMode] = useState('login')

    // Função para mudar para a tela Home
    const goToHome = () => setCurrentView('home')

    // Função para mudar para a tela de login
    const goToLogin = () => {
        setAuthMode('login')      // Define modo como login
        setCurrentView('login')   // Exibe a tela de login
    }

    // Função para mudar para a tela de cadastro
    const goToCadastro = () => {
        setAuthMode('cadastro')   // Define modo como cadastro
        setCurrentView('login')   // Exibe a tela de login (com modo cadastro)
    }

    // Renderiza a HomeSite quando currentView é 'home'
    if (currentView === 'home') {
        return <HomeSite onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} />
    }

    if(currentView === 'patrocinadores') {
        return <PatrocinadoresSite onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro}/>
    }

    // Renderiza o componente de autenticação para login ou cadastro
    return <AuthenticationCard onNavigateToHome={goToHome} initialMode={authMode} />
}

export default App
