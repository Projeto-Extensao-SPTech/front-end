import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdPets, MdOutlineAddCircle, MdOutlineEventNote, MdAdminPanelSettings } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { api, setHeaderParam } from '../api/apiUserService';
import { Notificacoes } from '../components/sections/Notificacoes';

export default function Navbar({ variant = 'blue' }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const [notificacaoOpen, setNotificacaoOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userDataString = sessionStorage.getItem("USER_DATA");

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            setHeaderParam("Authorization", `Bearer ${userData.token}`);
            setUser(userData);
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem("USER_DATA");
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
        window.location.href = "/";
    }

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
                        className={`cursor-pointer h-full flex items-center ${user ? 'cursor-default' : 'cursor-pointer'}`}
                        onClick={() => {
                            if (!user) {
                                navigate('/');
                            }
                        }}
                    >
                        <img src="/logo-bg-yellow.png" className="h-16 w-auto" alt="Logo" />
                    </div>
                </div>

                <nav className="hidden lg:flex flex-row items-center gap-8 h-full text-[14px] font-bold tracking-tightest leading-tight">

                    {!user && location.pathname === '/' && (
                        <Link
                            to="/"
                            className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                        >
                            SOBRE
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        </Link>
                    )}

                    {!user && location.pathname === '/ajudar' && (
                        <Link
                            to="/ajudar"
                            className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                        >
                            AJUDAR
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        </Link>
                    )}

                    {!user && location.pathname === '/voluntariados' && (
                        <Link
                            to="/voluntariados"
                            className={`cursor-pointer relative pb-2 hover:scale-105 transition-all duration-300 ease-in-out ${s.textColor} ${s.hoverColor} font-bold`}
                        >
                            VOLUNTARIADO
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full"></div>
                        </Link>
                    )}

                    {user && (
                        <>
                            {!user?.is_admin && (
                                <>
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
                                </>
                            )}

                            {user?.is_admin && (
                                <div className="flex items-center gap-4 ml-4">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
                                        <MdAdminPanelSettings className="text-amber-400 text-lg" />
                                        <span className="text-amber-400 text-sm font-bold tracking-wide">ADMIN</span>
                                    </div>

                                    <div className="w-px h-8 bg-white/20"></div>

                                    <div className="flex items-center gap-3">
                                        <Link
                                            to="/feiras-de-adocao"
                                            className={`group relative px-5 py-2 rounded-xl transition-all duration-300 flex items-center gap-3
                                                ${location.pathname === '/feiras-de-adocao'
                                                    ? 'bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] shadow-lg shadow-amber-500/20'
                                                    : `hover:bg-white/10 ${s.textColor}`
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                                                ${location.pathname === '/feiras-de-adocao'
                                                    ? 'bg-white/20'
                                                    : 'bg-white/10 group-hover:bg-white/20'
                                                }`}>
                                                <MdPets className={`text-lg ${location.pathname === '/feiras-de-adocao' ? 'text-[#052759]' : 'text-amber-400'}`} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">Feiras</div>
                                                <div className="text-xs opacity-75">de Adoção</div>
                                            </div>
                                            {location.pathname === '/feiras-de-adocao' && (
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                                            )}
                                        </Link>

                                        <Link
                                            to="/cadastro-feira-de-adocao"
                                            className={`group relative px-5 py-2 rounded-xl transition-all duration-300 flex items-center gap-3
                                                ${location.pathname === '/cadastro-feira-de-adocao'
                                                    ? 'bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] shadow-lg shadow-amber-500/20'
                                                    : `hover:bg-white/10 ${s.textColor}`
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                                                ${location.pathname === '/cadastro-feira-de-adocao'
                                                    ? 'bg-white/20'
                                                    : 'bg-white/10 group-hover:bg-white/20'
                                                }`}>
                                                <MdOutlineEventNote className={`text-lg ${location.pathname === '/cadastro-feira-de-adocao' ? 'text-[#052759]' : 'text-amber-400'}`} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">Cadastrar</div>
                                                <div className="text-xs opacity-75">Feira</div>
                                            </div>
                                            {location.pathname === '/cadastro-feira-de-adocao' && (
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                                            )}
                                        </Link>

                                        <Link
                                            to="/cadastro-notificacao"
                                            className={`group relative px-5 py-2 rounded-xl transition-all duration-300 flex items-center gap-3
                                                ${location.pathname === '/cadastro-notificacao'
                                                    ? 'bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] shadow-lg shadow-amber-500/20'
                                                    : `hover:bg-white/10 ${s.textColor}`
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                                                ${location.pathname === '/cadastro-notificacao'
                                                    ? 'bg-white/20'
                                                    : 'bg-white/10 group-hover:bg-white/20'
                                                }`}>
                                                <MdOutlineAddCircle className={`text-lg ${location.pathname === '/cadastro-notificacao' ? 'text-[#052759]' : 'text-amber-400'}`} />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-sm">Cadastrar</div>
                                                <div className="text-xs opacity-75">Notificação</div>
                                            </div>
                                            {location.pathname === '/cadastro-notificacao' && (
                                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </nav>

                <div className="hidden lg:flex flex-row items-center h-full mr-0">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    className={`h-12 w-12 cursor-pointer rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105
                                    ${notificacaoOpen
                                            ? 'bg-gradient-to-r from-[#FCAD0B] to-[#FFD166]'
                                            : 'bg-[#052759] hover:bg-[#0a3a8a]'}
                                            `}
                                    onClick={() => setNotificacaoOpen(!notificacaoOpen)}
                                >
                                    <img src="/btn-sininho.png" alt="Notificações" className="h-6 w-6" />
                                </button>

                                {notificacaoOpen && (
                                    <div className="absolute left-0 mt-3 z-[9999] w-max flex">
                                        <Notificacoes onClose={() => setNotificacaoOpen(false)} />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-[#052759] font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-semibold leading-tight">
                                        Olá, {user.name.split(' ')[0]}!
                                    </span>
                                    <span className="text-yellow-300 text-xs">
                                        {user?.is_admin ? 'Administrador' : 'Que bom te ver por aqui!'}
                                    </span>
                                </div>

                                <button
                                    className="ml-2 h-8 px-3 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] rounded-lg hover:brightness-110 font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                                    onClick={logout}
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                className="h-32 cursor-pointer px-4 bg-[#052759] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-l-xl shadow-xl"
                                onClick={() => navigate('/auth?mode=cadastro')}
                            >
                                <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                            </button>

                            <button
                                className="h-32 cursor-pointer px-4 bg-[#FCAD0B] hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center rounded-r-xl shadow-xl"
                                onClick={() => navigate('/auth?mode=login')}
                            >
                                <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                            </button>
                        </>
                    )}
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
                    } lg:hidden flex flex-col absolute bg-gradient-to-b from-[#052759] to-[#0a3a8a] text-white left-0 top-full font-bold text-xl text-center pt-8 pb-8 gap-4 w-full h-fit transition-transform duration-300 z-50 shadow-2xl`}
            >
                {!user && location.pathname === '/' && (
                    <Link to="/" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold relative py-2">SOBRE</Link>
                )}
                {!user && location.pathname === '/ajudar' && (
                    <Link to="/ajudar" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold relative py-2">AJUDAR</Link>
                )}
                {!user && location.pathname === '/voluntariados' && (
                    <Link to="/voluntariados" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold relative py-2">VOLUNTARIADO</Link>
                )}

                {user && (
                    <>
                        {!user?.is_admin && (
                            <>
                                <Link to="/feiras-de-adocao" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold py-2">FEIRAS DE ADOÇÃO</Link>
                                <Link to="/voluntariados" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold py-2">VOLUNTARIADO</Link>
                                <Link to="/ajudar" onClick={() => setMenu(false)} className="hover:scale-105 transition-all duration-300 font-bold py-2">AJUDAR</Link>
                            </>
                        )}

                        {user?.is_admin && (
                            <>
                                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mx-6">
                                    <MdAdminPanelSettings className="text-amber-400" />
                                    <span className="text-amber-400 text-sm font-bold">ADMIN</span>
                                </div>
                                
                                <Link to="/feiras-de-adocao" onClick={() => setMenu(false)} className="bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] mx-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3">
                                    <MdPets /> Feiras de Adoção
                                </Link>
                                <Link to="/cadastro-feira-de-adocao" onClick={() => setMenu(false)} className="bg-white/10 backdrop-blur-sm mx-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
                                    <MdOutlineEventNote /> Cadastrar Feira
                                </Link>
                                <Link to="/cadastro-notificacao" onClick={() => setMenu(false)} className="bg-white/10 backdrop-blur-sm mx-6 py-3 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
                                    <MdOutlineAddCircle /> Cadastrar Notificação
                                </Link>
                            </>
                        )}
                    </>
                )}

                <div className="flex justify-center items-center mt-6 gap-3">
                    {user ? (
                        <div className="flex flex-col items-center gap-4 w-full px-4">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 w-full border border-white/20">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-[#052759] font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="text-white text-base font-semibold">Olá, {user.name.split(' ').slice(0, 2).join(' ')}!</span>
                                    <span className="text-yellow-300 text-sm">{user?.is_admin ? 'Administrador' : 'Sessão ativa'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all">
                                        <img src="/btn-sininho.png" alt="Notificações" className="h-5 w-5" />
                                    </button>
                                    <button onClick={logout} className="h-10 px-4 bg-gradient-to-r from-[#FCAD0B] to-[#FFD166] text-[#052759] rounded-xl font-bold text-sm hover:brightness-110 transition-all">Sair</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => { navigate('/auth?mode=cadastro'); setMenu(false); }} className="h-20 cursor-pointer px-6 bg-white/10 hover:bg-white/20 rounded-xl transition-all flex items-center justify-center backdrop-blur-sm">
                                <img src="/btn-registrar.png" alt="Registrar" className="h-10 w-auto" />
                            </button>
                            <button onClick={() => { navigate('/auth?mode=login'); setMenu(false); }} className="h-20 cursor-pointer px-6 bg-[#FCAD0B] hover:bg-[#FFD166] rounded-xl transition-all flex items-center justify-center">
                                <img src="/btn-logar.png" alt="Login" className="h-10 w-auto" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}