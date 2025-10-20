import { useState } from 'react'
import { AuthenticationCard } from './components/AuthenticationCard'
import HomeSite from './components/HomeSite'
import VoluntariadosSite from './components/VoluntariadosSite'
import Voluntariados from './components/Voluntariados'

function App() {
    //     const [currentView, setCurrentView] = useState('login')
    //     const [authMode, setAuthMode] = useState('login')

    //     const goToHome = () => setCurrentView('home')
    //     const goToLogin = () => {
    //         setAuthMode('login')
    //         setCurrentView('login')
    //     }
    //     const goToCadastro = () => {
    //         setAuthMode('cadastro')
    //         setCurrentView('login')
    //     }
    //     const goToVoluntariados = () => setCurrentView('voluntariados')

    //     // Renderização principal (fora das funções)
    //     if (currentView === 'home') {
    //         return <HomeSite onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} onNavigateToVoluntariados={goToVoluntariados} />
    //     }

    //     if (currentView === 'voluntariados') {
    //         return <VoluntariadosSite onNavigateToHome={goToHome} onNavigateToVoluntariados={goToVoluntariados} onNavigateToLogin={goToLogin} onNavigateToCadastro={goToCadastro} />
    //     }

    //     return <AuthenticationCard onNavigateToHome={goToHome} initialMode={authMode} />
    // }
    return (
        <VoluntariadosSite />
    )
}
export default App
