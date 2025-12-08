import Button from '../ui/Button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function BemVindos() {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const images = [
        "/img-carrossel1.svg",
        "/img-carrossel2.svg", 
        "/img-carrossel3.svg"
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }, 2000)
        return () => clearInterval(interval)
    }, [images.length])

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

                        <div className="mt-4 lg:mt-1">

                            <Link to="/voluntariados">
                                <Button
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto"
                                >
                                    Quero ser voluntário
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end w-full lg:w-1/2 mt-4 lg:-mt-6">
                        <img
                            src="/img-pets1-sobre.png"
                            alt="Cachorros felizes do abrigo"
                            className="w-60 sm:w-72 md:w-80 lg:w-96 h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-2/5 flex items-center justify-center">
                    <div className="w-96 bg-[#052759] rounded-2xl p-4 shadow-xl h-48 flex items-center justify-center relative mx-auto">

                        <div className="w-[140%] -mx-12 bg-[#052759] rounded-xl shadow-xl flex flex-col items-center justify-center p-4 text-center h-full relative overflow-hidden">
                            
                            <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
                                
                                <div className="flex items-center space-x-6 transition-transform duration-700 ease-in-out"
                                     style={{ transform: `translateX(-${currentSlide * 120}px)` }}>
                                    
                                    {[...images, ...images].map((img, index) => (
                                        <div key={index} className="flex-shrink-0">
                                            <img
                                                src={img}
                                                alt={`Imagem do abrigo ${(index % images.length) + 1}`}
                                                className="w-20 h-20 object-contain rounded-lg drop-shadow-lg transition-transform duration-200 hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#052759] to-transparent pointer-events-none"></div>
                                <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#052759] to-transparent pointer-events-none"></div>
                            </div>

                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentSlide 
                                                ? 'bg-[#052759] scale-125' 
                                                : 'bg-[#052759]/40 hover:bg-[#052759]/60'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}