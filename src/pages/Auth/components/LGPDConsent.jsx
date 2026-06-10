export default function LGPDConsent({ aceite, onChange }) {
    return (
        <div className={`w-full rounded-2xl border-2 transition-all duration-300 ${aceite ? "border-[#052759] bg-[#052759]/5" : "border-gray-200 bg-gray-50"
            }`}>
            <label className="flex items-start gap-3 p-3.5 cursor-pointer select-none">
                <div className="relative flex-shrink-0 mt-0.5">
                    <input
                        type="checkbox"
                        checked={aceite}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${aceite
                            ? "bg-[#052759] border-[#052759]"
                            : "bg-white border-gray-300"
                        }`}>
                        {aceite && (
                            <svg className="w-3 h-3 text-[#FCAD0B]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </div>

                <span className="text-xs text-gray-600 leading-relaxed">
                    Li e concordo com a{" "}
                    <span className="font-semibold text-[#052759]">Política de Privacidade</span>{" "}
                    e autorizo o tratamento dos meus dados pessoais pelo{" "}
                    <span className="font-semibold text-[#052759]">Abrigo Dog Feliz</span>{" "}
                    para fins de cadastro e contato, conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
                </span>
            </label>

            {!aceite && (
                <div className="flex items-center gap-1.5 px-3.5 pb-3 -mt-1">
                    <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] text-amber-600 font-medium">
                        Necessário para concluir o cadastro
                    </span>
                </div>
            )}
        </div>
    );
}