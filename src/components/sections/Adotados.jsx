import { useState, useEffect, useRef } from 'react'

function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    return [ref, isVisible]
}

export default function Adotados() {
    const [titleRef, titleVisible] = useScrollReveal(0.1)
    const [petsRef, petsVisible] = useScrollReveal(0.1)

    const pets = [
        '/img-petfeira1.png',
        '/img-petfeira2.png',
        '/img-petfeira3.png',
        '/img-petfeira4.png',
        '/img-petfeira5.png'
    ]

    return (
        <div className="min-h-[40vh] flex items-center justify-center bg-[#EFEFEF] py-8">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">

                <div ref={petsRef} className="flex flex-wrap justify-center gap-4">
                    {pets.map((pet, index) => (
                        <img
                            key={index}
                            src={pet}
                            alt={`Pet adotado ${index + 1}`}
                            className={`w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-xl transition-all duration-700 hover:scale-110 shadow-2xl ${
                                index % 2 === 0 ? 'lg:translate-y-8' : 'lg:-translate-y-8'
                            } ${
                                petsVisible 
                                    ? 'opacity-100 scale-100' 
                                    : 'opacity-0 scale-75'
                            }`}
                            style={{ 
                                transitionDelay: petsVisible ? `${index * 80}ms` : '0ms'
                            }}
                        />
                    ))}
                </div>

                <div 
                    ref={titleRef}
                    className={`text-center lg:text-left transition-all duration-700 ${
                        titleVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-12'
                    }`}
                >
                    <h2 className="text-2xl lg:text-3xl font-black text-[#052759] tracking-wider hover:scale-105 transition-transform cursor-pointer">
                        PETS
                    </h2>
                    <h2 className="text-2xl lg:text-3xl font-black text-[#052759] tracking-wider border-b-6 border-[#052759] pb-1 hover:scale-105 transition-transform cursor-pointer">
                        ADOTADOS
                    </h2>
                </div>

            </div>
        </div>
    )
}