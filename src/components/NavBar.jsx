import { Link } from 'react-scroll'
import ButtonNav from '../layouts/ButtonNav'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'

export function NavBar({ onNavigateToHome }) {
    // Estado para controlar se o menu mobile está aberto ou fechado
    const [menu, setMenu] = useState(false)

    // Alterna o estado do menu (abre/fecha)
    const handleChange = () => {
        setMenu(!menu)
    }

    return (
        <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] relative z-50">
            {/* Barra principal da navbar */}
            <div className="flex flex-row justify-around bg-white text-white items-center h-24">

                {/* Logo clicável que chama onNavigateToHome */}
                <div className="flex items-center h-full pl-5">
                    <div 
                        className="cursor-pointer h-full flex items-center"
                        onClick={onNavigateToHome}
                    >
                        <img src="/logo-bg-yellow.png" className="h-16 w-auto" alt="Logo" />
                    </div>
                </div>

                {/* Menu desktop (visível em telas grandes) */}
                <nav className='hidden lg:flex flex-row items-center gap-16 h-full text-lg'>
                    <div 
                        className="cursor-pointer pb-1 rounded-br-lg hover:scale-105 transition-all duration-300 ease-in-out text-[#052759]"
                        onClick={onNavigateToHome}
                    >
                        SOBRE
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-[#052759]">
                        FEIRAS DE ADOÇÃO
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-[#052759]">
                        DOAÇÃO
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-[#052759]">
                        VOLUNTARIADO
                    </div>
                    <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out text-[#052759]">
                        CRIAR NOTIFICAÇÃO
                    </div>
                </nav>

                {/* Botões ao lado direito no desktop */}
                <div className='hidden lg:flex flex-row items-center h-full mr-0'>
                    <ButtonNav
                        bgColor="bg-[#052759]"
                        onClick={() => console.log('notificação clicada')}
                        isFirst={true}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#052759]"
                        onClick={() => console.log('registrar clicado')}
                    >
                        <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#FCAD0B]"
                        onClick={() => console.log('login clicado')}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </ButtonNav>
                </div>

                {/* Ícone de menu hamburguer para mobile */}
                <div className="lg:hidden flex items-center p-2 cursor-pointer" onClick={handleChange}>
                    <AiOutlineMenu size={30} color="#052759" />
                </div>
            </div>

            {/* Menu mobile que aparece ao clicar no hamburguer */}
            <div className={`${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-[#052759] text-white left-0 top-full font-semibold text-2xl text-center pt-6 pb-6 gap-8 w-full h-fit transition-transform duration-300 z-50`}>
                <div 
                    className="cursor-pointer border-b-8 border-[#FCAD0B] pb-1 rounded-br-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={onNavigateToHome}
                >
                    SOBRE
                </div>
                <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                    FEIRAS DE ADOÇÃO
                </div>
                <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                    DOAÇÃO
                </div>
                <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                    VOLUNTARIADO
                </div>
                <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                    CRIAR NOTIFICAÇÃO
                </div>

                {/* Botões no menu mobile */}
                <div className='flex justify-center items-center mt-4 gap-0'>
                    <ButtonNav
                        bgColor="bg-[#052759] hover:bg-yellow-600 rounded-l-lg"
                        onClick={() => console.log('notificação clicada')}
                        isFirst={true}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#052759] hover:bg-yellow-600 rounded-r-lg"
                        onClick={() => console.log('registrar clicado')}
                    >
                        <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                    </ButtonNav>
                    <ButtonNav
                        bgColor="bg-[#FCAD0B] hover:bg-yellow-600 rounded-r-lg"
                        onClick={() => console.log('login clicado')}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </ButtonNav>
                </div>
            </div>
        </div>
    )
}
