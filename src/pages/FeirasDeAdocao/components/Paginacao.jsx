export default function Paginacao({
    totalPaginas,
    paginaAtual,
    mudarPagina,
}) {
    return (
        <>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                    key={pagina}
                    onClick={() => mudarPagina(pagina)}
                    className={`text-xl font-light transition-all duration-500 ${paginaAtual === pagina
                            ? "text-white scale-125 drop-shadow-lg"
                            : "text-white/30 hover:text-white/60"
                        }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {pagina}
                </button>
            ))}
        </>
    );
}
