import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

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

        if (ref.current) observer.observe(ref.current)

        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [threshold])

    return [ref, isVisible]
}

export default function Ajudar() {
    const navigate = useNavigate()

    const [pixRef, pixVisible] = useScrollReveal(0.1)
    const [card1Ref, card1Visible] = useScrollReveal(0.1)
    const [card2Ref, card2Visible] = useScrollReveal(0.1)

    return (
        <div className="min-h-screen bg-[#052759] text-gray-800 relative">

            <main className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">

                <header className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-white drop-shadow-md mb-1">
                        Ajude e transforme vidas
                    </h1>
                    <p className="text-lg text-white/90">
                        Com amor, carinho e generosidade.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-6 items-stretch">

                    <section
                        ref={pixRef}
                        className={`lg:w-2/5 bg-white rounded-xl p-6 shadow-md flex flex-col gap-6 transition-all duration-700
                            ${pixVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                        `}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        <h2 className="text-xl font-bold text-center text-[#052759]">
                            PIX
                        </h2>

                        <div className="text-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-600">
                                Valor referência
                            </label>
                            <div className="inline-flex items-center justify-center gap-2 bg-[#052759] text-white font-semibold text-lg py-2 px-4 rounded-lg">
                                <span className="text-md">R$ 50,00</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 py-1 font-sans">
                                * R$50 compra 1 saco de ração para ~15 cães
                            </p>
                        </div>

                        <div className="text-center">
                            <label className="block text-sm text-gray-700 mb-1 font-extrabold">
                                Impacto da sua ajuda
                            </label>
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="text-xl hover:scale-125 transition-transform duration-300"
                                    >
                                        ❤️
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3 border border-gray-200 mt-auto">
                            <p className="font-semibold text-sm text-[#052759] text-center">
                                Chave PIX da ONG
                            </p>
                            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <code className="text-xs tracking-wide text-gray-700">
                                    8242ejwjd32847aisf
                                </code>
                                <button
                                    onClick={() => navigator.clipboard.writeText("8242ejwjd32847aisf")}
                                    className="bg-[#052759] hover:bg-blue-900 text-white text-xs px-2 py-1 rounded transition"
                                >
                                    Copiar
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="lg:w-3/5 flex flex-col gap-4">

                        <div
                            ref={card1Ref}
                            className={`flex-1 flex flex-col lg:flex-row items-center gap-4 bg-white rounded-xl p-6 shadow-md
                                hover:scale-105 transition-all duration-700 cursor-pointer
                                ${card1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            `}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <img
                                src="/img-secao-patroc.png"
                                alt="Quero ser patrocinador"
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="font-bold text-[#052759] mb-1 text-lg">
                                        Quero ser patrocinador
                                    </h3>
                                    <p className="text-gray-700 text-sm">
                                        Contribua regularmente para vacinas, alimentação e cuidados essenciais.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/patrocinadores")}
                                    className="bg-[#052759] hover:bg-blue-900 text-white px-4 py-2 rounded text-sm transition mt-3 lg:mt-0 self-start"
                                >
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                        <div
                            ref={card2Ref}
                            className={`flex-1 flex flex-col lg:flex-row items-center gap-4 bg-white rounded-xl p-6 shadow-md
                                hover:scale-105 transition-all duration-700 cursor-pointer
                                ${card2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            `}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                            <img
                                src="/img-secao-doar.png"
                                alt="Quero doar produtos"
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="font-bold text-[#052759] mb-1 text-lg">
                                        Quero doar produtos
                                    </h3>
                                    <p className="text-gray-700 text-sm">
                                        Doe ração, remédios, tapetes higiênicos e outros itens essenciais para nossos animais.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/doacao-livre")}
                                    className="bg-[#052759] hover:bg-blue-900 text-white px-4 py-2 rounded text-sm transition mt-3 lg:mt-0 self-start"
                                >
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        </div>
    );
}