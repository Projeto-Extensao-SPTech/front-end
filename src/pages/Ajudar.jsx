import { useNavigate } from "react-router-dom";

export default function Ajudar() {
    const navigate = useNavigate();

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
                        className="lg:w-2/5 bg-white rounded-xl p-6 shadow-md flex flex-col gap-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        <h2 className="text-xl font-bold text-center text-[#052759]">
                            PIX
                        </h2>

                        <div className="text-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-gray-600">Valor referência</label>
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
                                        className="text-xl animate-bounce hover:scale-125 transition-transform duration-300"
                                    >
                                        ❤️
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-3 border border-gray-200 mt-auto">
                            <p className="font-semibold text-sm text-[#052759] text-center">Chave PIX da ONG</p>
                            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <code className="text-xs tracking-wide text-gray-700">8242ejwjd32847aisf</code>
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

                        <div className="flex-1 flex flex-col lg:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="/img-secao-patroc.png"
                                alt="Quero ser patrocinador"
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="font-bold text-white mb-1 text-lg">Quero ser patrocinador</h3>
                                    <p className="text-gray-200 text-sm">
                                        Contribua regularmente para vacinas, alimentação e cuidados essenciais.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/patrocinadores")}
                                    className="bg-[#0a3a82] hover:bg-blue-900 text-white px-4 py-2 rounded text-sm transition mt-3 lg:mt-0 self-start"
                                >
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col lg:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <img
                                src="/img-secao-doar.png"
                                alt="Quero doar produtos"
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="font-bold text-white mb-1 text-lg">Quero doar produtos</h3>
                                    <p className="text-gray-200 text-sm">
                                        Doe ração, remédios, tapetes higiênicos e outros itens essenciais para nossos animais.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate("/doacao-livre")}
                                    className="bg-[#0a3a82] hover:bg-blue-900 text-white px-4 py-2 rounded text-sm transition mt-3 lg:mt-0 self-start"
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
