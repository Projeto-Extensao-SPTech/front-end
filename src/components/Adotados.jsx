import React from 'react'

const Adotados = () => {
    return (
        // Seção principal - fundo cinza claro e altura mínima responsiva
        <div className="min-h-[55vh] flex items-center justify-center bg-[#EFEFEF] py-6">
            
            {/* Container responsivo - muda de coluna para linha em telas grandes */}
            <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto px-4 lg:px-8 items-center justify-center lg:gap-16">

                {/* Grid de imagens dos pets adotados */}
                <div className="flex gap-6 flex-wrap justify-center items-start py-8">
                    
                    {/* Imagem 1 - Posicionada para cima em desktop */}
                    <img 
                        src="/img-adotado1.png" 
                        alt="Pet adotado 1" 
                        className="w-32 h-32 lg:w-40 lg:h-40 transition-transform hover:scale-105 lg:translate-y-8" 
                    />
                    
                    {/* Imagem 2 - Posicionada para baixo em desktop (efeito zigue-zague) */}
                    <img 
                        src="/img-adotado2.png" 
                        alt="Pet adotado 2" 
                        className="w-32 h-32 lg:w-40 lg:h-40 transition-transform hover:scale-105 lg:-translate-y-8" 
                    />
                    
                    {/* Imagem 3 - Posicionada para cima em desktop */}
                    <img 
                        src="/img-adotado3.png" 
                        alt="Pet adotado 3" 
                        className="w-32 h-32 lg:w-40 lg:h-40 transition-transform hover:scale-105 lg:translate-y-8" 
                    />
                    
                    {/* Imagem 4 - Posicionada para baixo em desktop */}
                    <img 
                        src="/img-adotado4.png" 
                        alt="Pet adotado 4" 
                        className="w-32 h-32 lg:w-40 lg:h-40 transition-transform hover:scale-105 lg:-translate-y-8" 
                    />
                    
                    {/* Imagem 5 - Posicionada para cima em desktop */}
                    <img 
                        src="/img-adotado5.png" 
                        alt="Pet adotado 5" 
                        className="w-32 h-32 lg:w-40 lg:h-40 transition-transform hover:scale-105 lg:translate-y-8" 
                    />
                </div>

                {/* Título da seção - dividido em duas linhas com efeitos visuais */}
                <div className="flex flex-col items-center">
                    
                    {/* Primeira linha do título - "PETS" */}
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#052759] tracking-wid cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                        PETS
                    </h2>
                    
                    {/* Segunda linha do título - "ADOTADOS" com borda inferior decorativa */}
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#052759] tracking-wid cursor-pointer border-b-8 border-[#052759] pb-1 rounded-br-lg hover:scale-105 transition-all duration-300 ease-in-out">
                        ADOTADOS
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Adotados

// COMENTÁRIOS PARA PRÓXIMOS DESENVOLVEDORES:
// 
// OBJETIVO DO COMPONENTE:
// - Exibir galeria de pets que foram adotados com sucesso
// - Criar layout visualmente atrativo com efeito zigue-zague nas imagens
//
// CARACTERÍSTICAS DO DESIGN:
// - Layout responsivo: coluna em mobile, linha em desktop
// - Efeito hover nas imagens: escala de 105% ao passar o mouse
// - Posicionamento alternado das imagens em desktop (translate-y-8 / -translate-y-8)
// - Título dividido em duas linhas com borda decorativa na segunda parte
// - Cores da marca: azul (#052759) e fundo cinza (#EFEFEF)
//
// PARA MODIFICAR:
// - Para adicionar mais imagens, mantenha o padrão de translate-y-8 e -translate-y-8 alternadamente
// - Para mudar cores, ajuste text-[#052759] e bg-[#EFEFEF]
// - Para alterar tamanhos, modifique as classes w-32 h-32 (mobile) e lg:w-40 lg:h-40 (desktop)
//
// IMAGENS NECESSÁRIAS NA PASTA PUBLIC:
// - /img-adotado1.png até /img-adotado5.png (ou mais se expandir)