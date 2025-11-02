import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

export default function Navbar({ variant = 'blue' }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const handleChange = () => setMenu(!menu);

    const styles = {
        blue: {
            bgColor: 'bg-[#052759]',
            textColor: 'text-white',
            hoverColor: 'hover:text-yellow-400',
        },
        white: {
            bgColor: 'bg-white',
            textColor: 'text-[#052759]',
            hoverColor: 'hover:text-[#FCAD0B]',
        },
    };

    const s = styles[variant];

    return (
        <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] relative z-50 w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* NAVBAR CONTAINER */}
            <div
                className={`flex flex-row justify-around ${s.bgColor} ${s.textColor} items-center`}
                style={{ height: '96px' }}
            >
                {/* LOGO */}
                <div className="flex items-center h-full pl-5">
                    <div
                        className="cursor-pointer h-full flex items-center"
                        onClick={() => navigate('/')}
                    >
                        <img src="/logo-bg-yellow.png" className="h-16 w-auto" alt="Logo" />
                    </div>
                </div>

                {/* MENU DESKTOP */}
                <nav className="hidden lg:flex flex-row items-center gap-14 h-full text-[14px] font-bold tracking-tightest leading-tight">
                    <Link
                        to="/"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        SOBRE
                        {location.pathname === '/' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    <Link
                        to="/feirasdeadocao"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        FEIRAS DE ADOÇÃO
                        {location.pathname === '/feirasdeadocao' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    <Link
                        to="/doacao"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        DOAÇÃO
                        {location.pathname === '/doacao' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    <Link
                        to="/voluntariados"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        VOLUNTARIADO
                        {location.pathname === '/voluntariados' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    <Link
                        to="/patrocinadores"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        PATROCINADORES
                        {location.pathname === '/patrocinadores' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                </nav>

                {/* BOTOES LADO DIREITO (EH O MESMO DESIGN EM TODAS AS PAGINAS) */}
                <div className="hidden lg:flex flex-row items-center h-full mr-0">
                    {/* SININHO */}
                    <button
                        className="h-32 cursor-pointer px-4 bg-[#052759] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-l-xl shadow-xl"
                        onClick={() => console.log('notificação clicada')}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </button>

                    {/* CADASTRAR */}
                    <button
                        className="h-32 cursor-pointer px-4 bg-[#052759] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center shadow-xl"
                        onClick={() => navigate('/auth?mode=cadastro')}
                    >
                        <img
                            src="/btn-registrar.png"
                            alt="Registrar"
                            className="h-10 w-auto"
                        />
                    </button>

                    {/* LOGIN */}
                    <button
                        className="h-32 cursor-pointer px-4 bg-[#FCAD0B] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-r-xl shadow-xl"
                        onClick={() => navigate('/auth?mode=login')}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </button>
                </div>

                {/* MENU MOBILE */}
                <div
                    className="lg:hidden flex items-center p-2 cursor-pointer"
                    onClick={handleChange}
                >
                    <AiOutlineMenu
                        size={30}
                        color={variant === 'blue' ? 'white' : '#052759'}
                    />
                </div>
            </div>

            {/* MENU MOBILE DROPDOWN */}
            <div
                className={`${menu ? 'translate-x-0' : '-translate-x-full'
                    } lg:hidden flex flex-col absolute bg-[#052759] text-white left-0 top-full font-bold text-xl text-center pt-6 pb-6 gap-6 w-full h-fit transition-transform duration-300 z-50`}
            >
                <Link
                    to="/"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative"
                >
                    SOBRE
                    {location.pathname === '/' && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                <Link
                    to="/feirasdeadocao"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative"
                >
                    FEIRAS DE ADOÇÃO
                    {location.pathname === '/feirasdeadocao' && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                <Link
                    to="/"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold"
                >
                    DOAÇÃO
                </Link>
                <Link
                    to="/voluntariados"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative"
                >
                    VOLUNTARIADO
                    {location.pathname === '/voluntariados' && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                <Link
                    to="/patrocinadores"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative"
                >
                    PATROCINADORES
                    {location.pathname === '/patrocinadores' && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>

                {/* Botões no menu mobile */}
                <div className="flex justify-center items-center mt-4 gap-0">
                    <button className="h-20 cursor-pointer px-4 bg-[#052759] hover:brightness-110 rounded-l-lg transition-all flex items-center justify-center">
                        <img
                            src="/btn-sininho.png"
                            alt="VerNotificacao"
                            className="h-8 w-auto"
                        />
                    </button>
                    <button
                        onClick={() => {
                            navigate('/auth?mode=cadastro');
                            setMenu(false);
                        }}
                        className="h-20 cursor-pointer px-4 bg-[#052759] hover:brightness-110 transition-all flex items-center justify-center"
                    >
                        <img
                            src="/btn-registrar.png"
                            alt="Registrar"
                            className="h-10 w-auto"
                        />
                    </button>
                    <button
                        onClick={() => {
                            navigate('/auth?mode=login');
                            setMenu(false);
                        }}
                        className="h-20 cursor-pointer px-4 bg-[#FCAD0B] hover:brightness-110 rounded-r-lg transition-all flex items-center justify-center"
                    >
                        <img
                            src="/btn-logar.png"
                            alt="Login"
                            className="h-10 w-auto"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}