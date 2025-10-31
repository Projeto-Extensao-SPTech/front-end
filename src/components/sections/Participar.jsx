import Button from '../ui/Button'
import { Link } from 'react-scroll'

export default function Participar() {
    return (
        <>
            <style>
                {`@keyframes pulse-scale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
        }`}
            </style>

            <div className="min-h-[50vh] flex items-center justify-center bg-[#052759] py-6">
                <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto lg:gap-12 px-4 lg:px-8">

                    <div className="lg:w-4/5 bg-[#EFEFEF] rounded-2xl relative overflow-visible p-5 lg:p-6 flex items-center shadow-xl">
                        <div className="flex flex-col lg:flex-row items-center w-full gap-6">
                            <div className="flex flex-col text-center gap-3 lg:w-1/2 z-10">
                                <h1 className="font-bold text-2xl lg:text-3xl leading-tight text-[#052759]">
                                    Por que fazer parte?
                                </h1>
                                <p className="text-[#052759] text-lg max-w-md mx-auto leading-relaxed">
                                    Cães e gatos aguardam por um lar em instituições que sobrevivem através de doações e trabalho voluntário.
                                </p>
                                <div className="mt-1">
                                    <Link to="voluntariado" spy={true} smooth={true} duration={500}>
                                        <Button className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.3)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto">
                                            Quero participar
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex justify-center lg:justify-end lg:w-1/2">
                                <img
                                    src="/img-adotar.png"
                                    alt="Participar"
                                    className="w-52 lg:w-64 h-auto rounded-lg"
                                    style={{
                                        animation: 'pulse-scale 3s ease-in-out infinite'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/5 bg-[#EFEFEF] rounded-2xl flex items-center justify-center p-5 relative overflow-visible shadow-xl">
                        <div className="w-full space-y-4 flex flex-col items-center">

                            <div className="flex flex-row gap-3 items-center w-full max-w-xs">
                                <div className="w-12 flex-shrink-0">
                                    <img src="/img-participar-1.png" alt="Adoção" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold text-xl">Adotando ou apadrinhando</h3>
                                    <p className="text-[#052759] text-xs mt-1">
                                        Tenha um companheiro de vida!
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row gap-3 items-center w-full max-w-xs">
                                <div className="w-12 flex-shrink-0">
                                    <img src="/img-participar-2.png" alt="Doação" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold text-xl">Doando pertences</h3>
                                    <p className="text-[#052759] text-xs mt-1">
                                        Ração, brinquedos, medicamentos...
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row gap-3 items-center w-full max-w-xs">
                                <div className="w-12 flex-shrink-0">
                                    <img src="/img-participar-3.png" alt="Compartilhar" className="w-full h-auto" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#052759] font-bold text-xl">Compartilhando</h3>
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