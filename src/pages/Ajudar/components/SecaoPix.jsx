export default function SecaoPix({ pixRef, pixVisible }) {
    const handleCopyPix = () => {
        navigator.clipboard.writeText("8242ejwjd32847aisf");
    };

    return (
        <section
            ref={pixRef}
            className={`lg:w-2/5 bg-white rounded-xl p-6 shadow-md flex flex-col gap-6 transition-all duration-700
                            ${pixVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                        `}
        >
            <h2 className="text-xl font-bold text-center text-[#052759]">PIX</h2>

            <div className="text-center">
                <label className="block text-sm font-medium text-gray-600 mb-1">
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
                        onClick={handleCopyPix}
                        className="bg-[#052759] hover:bg-blue-900 text-white text-xs px-2 py-1 rounded transition"
                    >
                        Copiar
                    </button>
                </div>
            </div>
        </section>
    );
}
