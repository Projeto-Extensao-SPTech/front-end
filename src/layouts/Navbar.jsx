import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

export default function Navbar({ variant = 'blue' }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [cadastrosOpen, setCadastrosOpen] = useState(false);

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

            <div
                className={`flex flex-row justify-around ${s.bgColor} ${s.textColor} items-center`}
                style={{ height: '96px' }}
            >

                <div className="flex items-center h-full pl-5">
                    <div
                        className="cursor-pointer h-full flex items-center"
                        onClick={() => navigate('/')}
                    >
                        <img src="/logo-bg-yellow.png" className="h-16 w-auto" alt="Logo" />
                    </div>
                </div>

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
                        to="/feiras-de-adocao"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        FEIRAS DE ADOÇÃO
                        {location.pathname === '/feiras-de-adocao' && (
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
                        to="/ajudar"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        AJUDAR
                        {location.pathname === '/ajudar' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    
                    <Link
                        to="/dashboard"
                        className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                    >
                        PAINEL
                        {location.pathname === '/dashboard' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        )}
                    </Link>
                    
                    <div 
                        className="relative"
                        onMouseEnter={() => setCadastrosOpen(true)}
                        onMouseLeave={() => setCadastrosOpen(false)}
                    >
                        <div
                            className={`bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] cursor-pointer relative p-3 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out text-[#052759] font-bold shadow-lg hover:shadow-xl`}
                        >
                            CADASTROS
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#FCAD0B] rotate-45"></div>
                        </div>
                        
                        {cadastrosOpen && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in-0 zoom-in-95">

                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                
                                <Link
                                    to="/cadastro-notificacao"
                                    className="flex items-center px-6 py-4 text-[15px] text-[#052759] hover:bg-gradient-to-r hover:from-[#FCAD0B] hover:to-[#FFD166] hover:text-white transition-all duration-200 group border-b border-gray-100 last:border-b-0"
                                    onClick={() => setCadastrosOpen(false)}
                                >
                                    <div className="w-2 h-2 bg-[#FCAD0B] rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                                    Cadastrar Notificação
                                </Link>
                                <Link
                                    to="/cadastro-feira-de-adocao"
                                    className="flex items-center px-6 py-4 text-[15px] text-[#052759] hover:bg-gradient-to-r hover:from-[#FCAD0B] hover:to-[#FFD166] hover:text-white transition-all duration-200 group border-b border-gray-100 last:border-b-0"
                                    onClick={() => setCadastrosOpen(false)}
                                >
                                    <div className="w-2 h-2 bg-[#FCAD0B] rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                                    Cadastrar Feira de Adoção
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="hidden lg:flex flex-row items-center h-full mr-0">
                    <button
                        className="h-32 cursor-pointer px-4 bg-[#052759] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-l-xl shadow-xl"
                        onClick={() => console.log('notificação clicada')}
                    >
                        <img src="/btn-sininho.png" alt="VerNotificacao" className="h-8 w-auto" />
                    </button>

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

                    <button
                        className="h-32 cursor-pointer px-4 bg-[#FCAD0B] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-r-xl shadow-xl"
                        onClick={() => navigate('/auth?mode=login')}
                    >
                        <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                    </button>
                </div>

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

            <div
                className={`${menu ? 'translate-x-0' : '-translate-x-full'
                    } lg:hidden flex flex-col absolute bg-gradient-to-b from-[#052759] to-[#0a3a8a] text-white left-0 top-full font-bold text-xl text-center pt-8 pb-8 gap-6 w-full h-fit transition-transform duration-300 z-50 shadow-2xl`}
            >
                <Link
                    to="/"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative py-2"
                >
                    SOBRE
                    {location.pathname === '/' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                <Link
                    to="/feiras-de-adocao"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative py-2"
                >
                    FEIRAS DE ADOÇÃO
                    {location.pathname === '/feiras-de-adocao' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>

                <Link
                    to="/voluntariados"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold relative py-2"
                >
                    VOLUNTARIADO
                    {location.pathname === '/voluntariados' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                <Link
                    to="/ajudar"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold py-2"
                >
                    QUERO AJUDAR
                    {location.pathname === '/ajudar' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                
                <Link
                    to="/dashboard"
                    onClick={() => setMenu(false)}
                    className="hover:scale-105 transition-all duration-300 font-bold py-2"
                >
                    PAINEL
                    {location.pathname === '/dashboard' && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                    )}
                </Link>
                
                <div className="flex flex-col gap-4 mt-2 bg-white/10 rounded-2xl p-6 mx-4">
                    <div className="text-[#FCAD0B] font-bold text-lg mb-2">CADASTROS</div>
                    <Link
                        to="/cadastro-evento"
                        onClick={() => setMenu(false)}
                        className="text-base hover:scale-105 transition-all duration-300 font-bold text-gray-200 bg-white/5 rounded-xl py-3 px-4 hover:bg-[#FCAD0B] hover:text-[#052759]"
                    >
                        📅 Cadastro de Evento
                    </Link>
                    <Link
                        to="/cadastro-notificacao"
                        onClick={() => setMenu(false)}
                        className="text-base hover:scale-105 transition-all duration-300 font-bold text-gray-200 bg-white/5 rounded-xl py-3 px-4 hover:bg-[#FCAD0B] hover:text-[#052759]"
                    >
                        🐕 Cadastro de Feira de Adoção
                    </Link>
                </div>

                <div className="flex justify-center items-center mt-6 gap-3">
                    <button className="h-20 cursor-pointer px-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center backdrop-blur-sm">
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
                        className="h-20 cursor-pointer px-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center backdrop-blur-sm"
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
                        className="h-20 cursor-pointer px-6 bg-[#FCAD0B] hover:bg-[#FFD166] rounded-xl transition-all flex items-center justify-center"
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