import Button from '../ui/Button'
import { Link } from 'react-scroll'

export default function Hero() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-[#EFEFEF] py-12 relative z-10">

            <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-2xl mx-auto gap-8 px-4 lg:px-8">

                <div className="w-full lg:w-4/5 bg-[#052759] rounded-2xl overflow-visible p-6 lg:p-8 flex flex-col lg:flex-row items-center shadow-2xl lg:h-80">

                    <div className="flex flex-col text-center lg:text-left gap-4 w-full lg:w-1/2 z-10 lg:ml-16">
                        <h1 className="font-bold text-3xl lg:text-4xl leading-tight text-white">
                            BEM-VINDOS AO <span className="text-[#FCAD0B]">ABRIGO DOG FELIZ</span>
                        </h1>

                        <p className="text-[#EFEFEF] lg:text-lg max-w-md mx-auto lg:mx-0">
                            Transformando vidas de animais abandonados através do amor e cuidado
                        </p>

                        <div className="mt-2">
                            <Link to="voluntariado" spy={true} smooth={true} duration={500}>
                                <Button
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:text-white"
                                >
                                    Quero ser voluntário
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end w-full lg:w-1/2 mt-6 lg:mt-0">
                        <img
                            src="/img-pets1-sobre.png"
                            alt="Cachorros felizes do abrigo"
                            className="w-80 md:w-[28rem] lg:w-[45rem] h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex items-center justify-center">
                    <div className="w-full bg-[#052759] rounded-2xl p-4 lg:p-4 shadow-2xl lg:h-64 flex items-center justify-center relative">

                        <div className="w-full lg:w-[130%] lg:-mx-7 bg-[#FCAD0B] rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 text-center h-100">

                            <img
                                src="/imgs-sobre.png"
                                alt="Ajude nossos amigos"
                                className="w-40 md:w-48 lg:w-52 h-auto rounded-lg transform hover:scale-105 transition-transform duration-300 mb-2"
                            />

                            <h3 className="text-[#052759] text-xl font-bold mb-1">
                                Ajude nossos "aumiguinhos"
                            </h3>

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