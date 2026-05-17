export default function Paginacao({ totalPaginas, paginaAtual, mudarPagina }) {
    return (
        <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                    key={pagina}
                    onClick={() => mudarPagina(pagina)}
                    aria-current={paginaAtual === pagina ? "page" : undefined}
                    aria-label={`Ir para a página ${pagina}`}
                    className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                        paginaAtual === pagina
                            ? "bg-[#FCAD0B] text-[#052759] shadow-[0_0_14px_rgba(252,173,11,0.55)] scale-110"
                            : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {pagina}
                </button>
            ))}
        </div>
    );
}
