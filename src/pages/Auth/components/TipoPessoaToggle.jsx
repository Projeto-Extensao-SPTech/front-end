export default function TipoPessoaToggle({ tipoPessoa, onChange }) {
    return (
        <div className="flex justify-center mb-3 w-full">
            <div className="relative bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-2xl shadow-inner">
                <div
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-br from-[#052759] to-[#063a7a] rounded-xl transition-all duration-300 shadow-lg ${tipoPessoa === "PF" ? "left-1" : "left-[calc(50%+2px)]"
                        }`}
                ></div>
                <button
                    className={`relative z-10 w-28 md:w-32 h-8 md:h-9 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${tipoPessoa === "PF" ? "text-[#FCAD0B]" : "text-gray-600"
                        }`}
                    onClick={() => onChange("PF")}
                >
                    Pessoa Física
                </button>
                <button
                    className={`relative z-10 w-28 md:w-32 h-8 md:h-9 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${tipoPessoa === "PJ" ? "text-[#FCAD0B]" : "text-gray-600"
                        }`}
                    onClick={() => onChange("PJ")}
                >
                    Pessoa Jurídica
                </button>
            </div>
        </div>
    );
}
