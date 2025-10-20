import NavbarSite from "./NavbarSite"
import Home from "./Home"
import Participar from "./Participar"
import Adotados from "./Adotados"
import FaleConosco from "./FaleConosco"

// Componente container principal da página Home
// Agrupa todas as seções do site institucional
function HomeSite({ onNavigateToLogin, onNavigateToCadastro }) {
    return (
        <div>
            {/* Navbar com navegação para Login/Cadastro */}
            <NavbarSite
                onNavigateToLogin={onNavigateToLogin}
                onNavigateToCadastro={onNavigateToCadastro}
            />
            
            {/* Conteúdo principal com seções em ordem de visualização */}
            <main>
                <section id="home"><Home /></section>          {/* Hero/Banner principal */}
                <section id="participar"><Participar /></section>   {/* Como participar */}
                <section id="adotados"><Adotados /></section>      {/* Pets adotados */}
                <section id="faleconosco"><FaleConosco /></section> {/* Contato */}
            </main>
        </div>
    )
}

export default HomeSite

// COMENTÁRIOS:
// - Este é o layout principal do site após o login
// - Recebe props de navegação para fluxo de autenticação
// - Cada section tem ID para navegação por âncora
// - Ordem das seções segue fluxo natural de informação