export default function CardAjuda({
    cardRef,
    cardVisible,
    imagem,
    titulo,
    descricao,
    onSaibaMais,
}) {
    return (
        <div
            ref={cardRef}
            className={`flex-1 flex flex-col lg:flex-row items-center gap-4 bg-white rounded-xl p-6 shadow-md
                                hover:scale-105 transition-all duration-700 cursor-pointer
                                ${cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            `}
            style={{ fontFamily: "Poppins, sans-serif" }}
        >
            <img
                src={imagem}
                alt={titulo}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                    <h3 className="font-bold text-[#052759] mb-1 text-lg">{titulo}</h3>
                    <p className="text-gray-700 text-sm">{descricao}</p>
                </div>
                <button
                    onClick={onSaibaMais}
                    className="bg-[#052759] hover:bg-blue-900 text-white px-4 py-2 rounded text-sm transition mt-3 lg:mt-0 self-start"
                >
                    Saiba mais
                </button>
            </div>
        </div>
    );
}
