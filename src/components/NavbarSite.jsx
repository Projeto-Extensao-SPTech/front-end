import { Link } from 'react-scroll'
import React from 'react'
import ButtonNav from '../layouts/ButtonNav'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'

const NavbarSite = ({ onNavigateToLogin, onNavigateToCadastro, onNavigateToHome }) => {

    // Estado que controla se o menu mobile está aberto ou fechado
    const [menu, setMenu] = useState(false);

    // Alterna o menu mobile (abre/fecha)
    const handleChange = () => {
        setMenu(!menu);
    }

    return (
        <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] relative z-50">
            {/* Barra principal da navbar */}
            <div className="flex flex-row justify-around bg-[#052759] text-white items-center h-24">
                {/* Logo que usa react-scroll Link para rolar até o topo */}
                <div className="flex items-center h-full pl-5">
                    <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer h-full flex items-center">
                        <img src="/logo-bg-yellow.png" className="h-16 w-auto" alt="Logo" 
                        onClick={onNavigateToHome}/>
                    </Link>
                </div>

                {/* Menu desktop, aparece só em telas maiores */}
                <nav className=' hidden lg:flex flex-row items-center gap-16 h-full text-lg'>
                    {/* Links para as seções, usando react-scroll para smooth scroll */}
                    <Link to="home" spy={true} smooth={true} duration={500} className="cursor-pointer border-b-8 border-[#FCAD0B] pb-1 rounded-br-lg hover:scale-105 transition-all duration-300 ease-in-out">SOBRE</Link>
                    <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">FEIRAS DE ADOÇÃO</Link>
                    <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">DOAÇÃO</Link>
                    <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">VOLUNTARIADO</Link>
                    <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">CRIAR NOTIFICAÇÃO</Link>
                </nav>

                {/* Botões de ação no desktop */}
                <div className=' hidden lg:flex flex-row items-center h-full mr-0'>
                    <ButtonNav
                        bgColor="bg-[#052759]"
                        onClick={() => console.log('notificaçao clicada')}
                        isFirst={true}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#052759]"
                        onClick={onNavigateToCadastro}  
                    >
                        <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#FCAD0B]"
                        onClick={onNavigateToLogin}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </ButtonNav>
                </div>

                {/* Ícone menu hamburguer que aparece só no mobile */}
                <div className="lg:hidden flex items-center p-2 cursor-pointer" onClick={handleChange}>
                    <AiOutlineMenu size={30} />
                </div>
            </div>

            {/* Menu mobile que aparece/desaparece com o clique no hamburguer */}
            <div className={` ${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-[#052759] text-white left-0 top-full font-semibold text-2xl text-center pt-6 pb-6 gap-8 w-full h-fit transition-transform duration-300 z-50`}>
                <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer border-b-8 border-[#FCAD0B] pb-1 rounded-br-lg hover:scale-105 transition-all duration-300 ease-in-out">SOBRE</Link>
                <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">FEIRAS DE ADOÇÃO</Link>
                <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">DOAÇÃO</Link>
                <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">VOLUNTARIADO</Link>
                <Link to="/" spy={true} smooth={true} duration={500} className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">CRIAR NOTIFICAÇÃO</Link>

                {/* Botões dentro do menu mobile */}
                <div className='flex justify-center items-center mt-4 gap-0'>
                    <ButtonNav
                        bgColor="bg-[#052759] hover:bg-yellow-600 rounded-l-lg"
                        onClick={() => console.log('notificaçao clicadaaa')}
                        isFirst={true}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#052759] hover:bg-yellow-600 rounded-r-lg"
                        onClick={onNavigateToCadastro}
                    >
                        <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#FCAD0B] hover:bg-yellow-600 rounded-r-lg"
                        onClick={onNavigateToLogin}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </ButtonNav>
                </div>
            </div>
        </div>
    )
}

export default NavbarSite
