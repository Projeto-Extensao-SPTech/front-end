import React from 'react'
import Button from '../layouts/Button'
import { Link } from 'react-scroll'

const Participar = () => {
    return (
        <>
            {/* Animação pulse-scale para dar efeito de "pulsar" na imagem */}
            <style>
                {`@keyframes pulse-scale {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); } }`}
            </style>

            {/* Container principal com fundo azul escuro e espaçamento vertical */}
            <div className="min-h-[60vh] flex items-center justify-center bg-[#052759] py-6">
                {/* Conteúdo centralizado com largura máxima e espaçamento entre colunas no desktop */}
                <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto lg:gap-16 px-4 lg:px-8">

                    {/* Caixa principal com fundo claro, cantos arredondados e sombra */}
                    <div className="lg:w-4/5 bg-[#EFEFEF] rounded-2xl relative overflow-visible p-6 lg:p-8 flex items-center shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center w-full gap-8">
                            {/* Texto explicativo e botão, alinhados à esquerda no desktop */}
                            <div className="flex flex-col text-center lg:text-left gap-4 lg:w-1/2 z-10">
                                <h1 className="font-bold text-3xl lg:text-4xl leading-tight text-[#052759]">
                                    Por que fazer parte?
                                </h1>
                                <p className="text-[#052759] lg:text-lg max-w-md leading-relaxed">
                                    Cães e gatos aguardam por um lar em instituições que sobrevivem através de doações e trabalho voluntário, enfrentando desafios como falta de recursos e visibilidade.
                                </p>
                                <div className="mt-2">
                                    {/* Botão com link que faz scroll suave para a seção "voluntariado" */}
                                    <Link to="voluntariado" spy={true} smooth={true} duration={500}>
                                        <Button
                                            title="Quero participar"
                                            backgroundColor="bg-[#FCAD0B]"
                                            className="shadow-[inset_0_6px_12px_0_rgba(0,0,0,0.8)] !text-white"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Imagem com efeito de pulsar para chamar atenção */}
                            <div className="flex justify-center lg:justify-end lg:w-1/2">
                                <img
                                    src="/img-adotar.png"
                                    alt="Participar"
                                    className="w-60 lg:w-72 h-auto rounded-lg"
                                    style={{
                                        animation: 'pulse-scale 3s ease-in-out infinite'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Caixa secundária com ícones e textos explicativos */}
                    <div className="lg:w-2/5 bg-[#EFEFEF] rounded-2xl flex items-center justify-center p-6 relative overflow-visible shadow-2xl">
                        <div className="w-full space-y-5 flex flex-col items-center">
                            {/* Cada item mostra um ícone e uma breve descrição */}
                            <div className="flex flex-row gap-4 items-center w-full max-w-xs">
                                <div className="w-14 flex-shrink-0">
                                    <img src="/img-participar-1.png" alt="Adoção" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold lg:text-lg">Adotando ou apadrinhando</h3>
                                    <p className="text-[#052759] text-xs mt-1">
                                        Tenha um companheiro de vida!
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 items-center w-full max-w-xs">
                                <div className="w-14 flex-shrink-0">
                                    <img src="/img-participar-2.png" alt="Doação" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold lg:text-lg">Doando pertences</h3>
                                    <p className="text-[#052759] text-xs mt-1">
                                        Ração, brinquedos, medicamentos...
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 items-center w-full max-w-xs">
                                <div className="w-14 flex-shrink-0">
                                    <img src="/img-participar-3.png" alt="Compartilhar" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold lg:text-lg">Compartilhando</h3>
                                    <p className="text-[#052759] text-xs mt-1">
                                        Ajude a aumentar nossa visibilidade!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Participar
