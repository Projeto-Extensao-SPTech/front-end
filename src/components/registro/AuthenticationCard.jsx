import { useState, useEffect } from "react";
import { Login } from "./login/Login";
import { NavBar } from "../navbar/NavBar";
import { Cadastro } from "./registro/cadastro";

export function AuthenticationCard({ onNavigateToHome, initialMode = 'login' }) {
    // Estado para controlar se está na tela de Login ou Cadastro
    const [isLogin, setIsLogin] = useState(initialMode === 'login')

    // Sincroniza o modo (login/cadastro) quando a prop initialMode mudar
    // Isso permite que a navegação externa defina qual tela mostrar primeiro
    useEffect(() => {
        setIsLogin(initialMode === 'login')
    }, [initialMode])

    return (
        // Container principal - fundo azul da marca ocupando tela inteira
        <div className="w-full min-h-screen flex flex-col bg-[#052759]">
            
            {/* Navbar customizada para autenticação */}
            <NavBar onNavigateToHome={onNavigateToHome} />
            
            {/* Área de conteúdo centralizada com elementos de fundo */}
            <div className="flex-1 flex items-center justify-center py-8 px-4 relative overflow-hidden">
                
                {/* Elementos decorativos de fundo - visíveis apenas em desktop */}
                
                {/* Blob decorativo esquerdo */}
                <img
                    src="/blob.svg"
                    alt="Elemento decorativo"
                    className="hidden md:block w-48 md:w-[600px] absolute transform rotate-45 z-0 -left-20 md:-left-40 -bottom-20 md:-bottom-40 opacity-90"
                />
                
                {/* Blob decorativo direito (sobrepõe o cachorro) */}
                <img
                    src="/blob.svg"
                    alt="Elemento decorativo" 
                    className="hidden md:block w-56 md:w-[700px] absolute transform rotate-12 z-10 -right-20 md:-right-40 -bottom-20 md:-bottom-40 opacity-80"
                />
                
                {/* Imagem do cachorro - sobrepõe os blobs */}
                <img
                    src="/photos/dog-photo-1.svg"
                    alt="Cachorro feliz"
                    className="hidden md:block w-32 md:w-64 absolute z-20 right-5 md:right-20 bottom-5 md:bottom-20"
                />

                {/* Card principal de autenticação - sobrepõe todos os elementos de fundo */}
                <div className="w-full max-w-sm md:max-w-md lg:w-96 min-h-[400px] md:min-h-[450px] bg-white rounded-lg shadow-md flex flex-col items-center p-4 md:p-6 z-30 relative mx-4">
                    
                    {/* Seletor de modo (Login/Cadastro) */}
                    <div className="flex justify-center mb-6 md:mb-8 w-full">
                        
                        {/* Botão Login - ativo quando isLogin é true */}
                        <button
                            className={`${isLogin ? 
                                'bg-[#052759] text-[#FCAD0B]' :  // Estilo quando ativo
                                'bg-[#FCAD0B] text-[#052759] opacity-70'  // Estilo quando inativo
                            } cursor-pointer w-20 md:w-24 h-8 md:h-10 rounded-l-xl px-3 md:px-4 text-sm md:text-base hover:opacity-90 transition-colors`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        
                        {/* Botão Cadastro - ativo quando isLogin é false */}
                        <button
                            className={`${isLogin ? 
                                'bg-[#FCAD0B] text-[#052759] opacity-70' :  // Estilo quando inativo  
                                'bg-[#052759] text-[#FCAD0B]'  // Estilo quando ativo
                            } cursor-pointer w-20 md:w-24 h-8 md:h-10 rounded-r-xl px-3 md:px-4 text-sm md:text-base hover:opacity-90 transition-colors`}
                            onClick={() => setIsLogin(false)}
                        >
                            Cadastro
                        </button>
                    </div>

                    {/* Container dinâmico que renderiza Login ou Cadastro */}
                    <div className="w-full flex-1 flex flex-col items-center">
                        {isLogin ? 
                            <Login onSuccess={onNavigateToHome} /> :  // Componente de Login
                            <Cadastro onSuccess={onNavigateToHome} />  // Componente de Cadastro
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

// COMENTÁRIOS PARA PRÓXIMOS DESENVOLVEDORES:
//
// OBJETIVO DO COMPONENTE:
// - Fornecer interface de autenticação (Login e Cadastro) com toggle entre modos
// - Servir como portal de entrada para a aplicação
//
// PROPS:
// - onNavigateToHome: função chamada quando autenticação é bem-sucedida
// - initialMode: define qual tela mostrar inicialmente ('login' ou 'cadastro')
//
// FLUXO DE NAVEGAÇÃO:
// 1. Usuário chega nesta tela (modo definido por initialMode)
// 2. Pode alternar entre Login e Cadastro
// 3. Ao sucesso da autenticação, chama onNavigateToHome()
// 4. Navega para a tela principal (Home)
//
// CARACTERÍSTICAS DO DESIGN:
// - Layout responsivo: mobile-first com breakpoints md: e lg:
// - Elementos decorativos (blobs e cachorro) apenas em desktop
// - Card branco centralizado sobre fundo azul
// - Toggle buttons com cores da marca (#052759 azul, #FCAD0B amarelo)
// - Z-index hierarchy: blobs (z-0) < blob direito (z-10) < cachorro (z-20) < card (z-30)
//
// COMPONENTES DEPENDENTES:
// - Login: Formulário de login
// - Cadastro: Formulário de cadastro multi-etapas  
// - NavBar: Navegação superior personalizada
//
// PARA MODIFICAR:
// - Cores: ajustar bg-[#052759], text-[#FCAD0B], etc.
// - Tamanhos: modificar max-w-sm, min-h-[400px], etc.
// - Elementos decorativos: ajustar/remover blobs e imagem do cachorro
// - Comportamento: modificar a lógica de toggle ou fluxo de navegação
//
// ARQUIVOS NECESSÁRIOS:
// - /blob.svg (elementos decorativos)
// - /photos/dog-photo-1.svg (imagem do cachorro)