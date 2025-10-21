import React from 'react'
import Button from '../layouts/Button'
import { Link } from 'react-scroll'

const Home = () => {
    // Cor de fundo do botão - amarelo da marca
    const backgroundColor = `bg-[#FCAD0B]`

    return (
        // Seção principal da Home - fundo cinza com altura mínima responsiva
        <div className="min-h-[60vh] flex items-center justify-center bg-[#EFEFEF] py-12 relative z-10">
            
            {/* Container responsivo - muda de coluna para linha em desktop */}
            <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-2xl mx-auto gap-8 px-4 lg:px-8">

                {/* Card principal - ocupa 4/5 em desktop */}
                <div className="w-full lg:w-4/5 bg-[#052759] rounded-2xl overflow-visible p-6 lg:p-8 flex flex-col lg:flex-row items-center shadow-2xl lg:h-80">
                    
                    {/* Conteúdo textual - lado esquerdo */}
                    <div className="flex flex-col text-center lg:text-left gap-4 w-full lg:w-1/2 z-10 lg:ml-16">
                        
                        {/* Título principal com destaque em amarelo */}
                        <h1 className="font-bold text-3xl lg:text-4xl leading-tight text-white">
                            BEM-VINDOS AO <span className="text-[#FCAD0B]">ABRIGO DOG FELIZ</span>
                        </h1>
                        
                        {/* Descrição da missão */}
                        <p className="text-[#EFEFEF] lg:text-lg max-w-md mx-auto lg:mx-0">
                            Transformando vidas de animais abandonados através do amor e cuidado
                        </p>
                        
                        {/* Botão de call-to-action com scroll suave */}
                        <div className="mt-2">
                            <Link to="voluntariado" spy={true} smooth={true} duration={500}>
                                <Button
                                    title="Quero ser voluntário"
                                    backgroundColor={backgroundColor}
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Imagem - lado direito */}
                    <div className="flex justify-center lg:justify-end w-full lg:w-1/2 mt-6 lg:mt-0">
                        <img
                            src="/img-pets1-sobre.png"
                            alt="Cachorros felizes do abrigo"
                            className="w-80 md:w-[28rem] lg:w-[45rem] h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Card secundário - ocupa 2/5 em desktop */}
                <div className="w-full lg:w-2/5 flex items-center justify-center">
                    <div className="w-full bg-[#052759] rounded-2xl p-4 lg:p-4 shadow-2xl lg:h-64 flex items-center justify-center relative">
                        
                        {/* Card interno com destaque amarelo que "transborda" */}
                        <div className="w-full lg:w-[130%] lg:-mx-7 bg-[#FCAD0B] rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 text-center h-100">
                            
                            {/* Imagem dos pets */}
                            <img
                                src="/imgs-sobre.png"
                                alt="Ajude nossos amigos"
                                className="w-40 md:w-48 lg:w-52 h-auto rounded-lg transform hover:scale-105 transition-transform duration-300 mb-2"
                            />
                            
                            {/* Título do card secundário */}
                            <h3 className="text-[#052759] text-xl font-bold mb-1">
                                Ajude nossos "aumiguinhos"
                            </h3>
                            
                            {/* Descrição das formas de ajuda */}
                            <p className="text-[#052759] font-medium text-sm">
                                com ração... roupinhas... ou moradia!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home

// COMENTÁRIOS PARA PRÓXIMOS DESENVOLVEDORES:
//
// OBJETIVO DO COMPONENTE:
// - Seção hero da página inicial que apresenta o abrigo
// - Converter visitantes em voluntários/doadores através de CTAs claros
// - Estabelecer identidade visual e tom da marca
//
// LAYOUT E DESIGN:
// - Design responsivo: coluna em mobile, linha em desktop
// - Proporção: 80% card principal / 20% card secundário em desktop
// - Cores da marca: azul (#052759), amarelo (#FCAD0B), cinza (#EFEFEF)
// - Cards com sombras pronunciadas e bordas arredondadas
// - Efeitos hover nas imagens para interatividade
//
// ESTRUTURA VISUAL:
// ┌─────────────────────────────────────────────────────────┐ ┌─────────────────┐
// │  BEM-VINDOS AO ABRIGO DOG FELIZ                         │ │                 │
// │  Transformando vidas de animais...                      │ │  Ajude nossos   │
// │                                                         │ │  "aumiguinhos"  │
// │  [Quero ser voluntário]                                 │ │  com ração...   │
// │                                                         │ │                 │
// │              [Imagem grande dos pets]                   │ │   [Imagem]      │
// └─────────────────────────────────────────────────────────┘ └─────────────────┘
//
// FUNCIONALIDADES:
// - Scroll suave para seção de voluntariado ao clicar no botão
// - Efeitos hover em imagens para melhor UX
// - Layout completamente responsivo
//
// COMPONENTES DEPENDENTES:
// - Button: Componente reutilizável de botão (../layouts/Button)
// - Link do react-scroll: Para navegação suave na página
//
// ARQUIVOS NECESSÁRIOS (em /public/):
// - /img-pets1-sobre.png (imagem principal dos pets)
// - /imgs-sobre.png (imagem do card secundário)
//
// PARA MODIFICAR/EXPANDIR:
//
// 1. ALTERAR CONTEÚDO:
//    - Textos: Modificar diretamente no JSX
//    - Imagens: Substituir arquivos ou atualizar src
//    - Cores: Ajustar classes bg-[#COR] e text-[#COR]
//
// 2. ALTERAR LAYOUT:
//    - Proporções: Ajustar lg:w-4/5 e lg:w-2/5
//    - Espaçamento: Modificar gap-8, p-6, etc.
//    - Altura dos cards: Ajustar lg:h-80 e lg:h-64
//
// 3. ADICIONAR NOVAS FUNCIONALIDADES:
//    - Modal ao clicar no botão
//    - Animações mais complexas com Framer Motion
//    - Video background
//    - Carousel de imagens
//
// 4. MELHORIAS DE PERFORMANCE:
//    - Implementar lazy loading nas imagens
//    - Otimizar imagens com WebP format
//    - Considerar next/image se migrar para Next.js
//
// 5. ACESSIBILIDADE:
//    - Manter alt texts descritivos nas imagens
//    - Garantir contraste adequado nas cores
//    - Testar navegação por teclado
//
// PONTOS DE ATENÇÃO:
// - lg:w-[130%] e lg:-mx-7 criam efeito de "transbordamento" no card secundário
// - z-10 garante que o conteúdo fique acima de elementos de fundo
// - hover:scale-105 cria efeito sutil de zoom ao passar mouse
// - shadow-2xl dá profundidade aos cards
//
// RESPONSIVIDADE:
// - Mobile: Coluna única, conteúdo centralizado
// - Tablet: Layout adaptativo com md: breakpoints  
// - Desktop: Linha dupla com proporções definidas