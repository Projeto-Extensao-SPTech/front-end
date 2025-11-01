import Button from '../ui/Button'
import { Link } from 'react-scroll'

export default function BemVindos() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-[#EFEFEF] py-8 relative z-10">

            <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-2xl mx-auto gap-6 px-4 lg:px-8">

                <div className="w-full lg:w-4/5 bg-[#052759] rounded-2xl overflow-visible p-5 lg:p-6 flex flex-col lg:flex-row items-center shadow-xl lg:h-64">

                    <div className="flex flex-col text-center gap-3 w-full lg:w-1/2 z-10">
                        <h1 className="font-bold text-3xl lg:text-4xl leading-tight text-white">
                            BEM-VINDOS AO
                            <p>
                                <span className="text-[#FCAD0B]">ABRIGO DOG FELIZ</span>
                            </p>
                        </h1>

                        <p className="text-[#EFEFEF] text-sm lg:text-base max-w-md mx-auto">
                            Transformando vidas de animais abandonados através do amor e cuidado
                        </p>

                        <div className="mt-4 lg:mt-1"> {/* Aumentei o margin-top no mobile */}
                            <Link to="voluntariado" spy={true} smooth={true} duration={500}>
                                <Button
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto"
                                >
                                    Quero ser voluntário
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end w-full lg:w-1/2 mt-4 lg:-mt-6"> {/* Removi -mt-4 do mobile e adicionei mt-4 */}
                        <img
                            src="/img-pets1-sobre.png"
                            alt="Cachorros felizes do abrigo"
                            className="w-60 sm:w-72 md:w-80 lg:w-96 h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex items-center justify-center">
                    <div className="w-96 bg-[#052759] rounded-2xl p-4 shadow-xl h-48 flex items-center justify-center relative mx-auto">

                        <div className="w-[140%] -mx-12 bg-[#FCAD0B] rounded-xl shadow-xl flex flex-col items-center justify-center p-4 text-center h-full">

                            <img
                                src="/imgs-sobre.png"
                                alt="Ajude nossos amigos"
                                className="w-28 sm:w-32 md:w-36 lg:w-60 h-auto rounded-lg transform hover:scale-105 transition-transform duration-300 mb-2"
                            />

                            <p className="text-[#052759] text-lg font-bold mb-1">
                                Ajude nossos "aumiguinhos"
                            </p>

                            <p className="text-[#052759] font-semibold text-xs">
                                com ração... roupinhas... ou moradia!
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}