import useFeirasDeAdocao from "./hooks/useFeirasDeAdocao";
import FeirasHeader from "./components/FeirasHeader";
import Paginacao from "./components/Paginacao";
import CardFeira from "./components/CardFeira";
import FeiraDetalhes from "./components/FeiraDetalhes";

export default function FeirasDeAdocao() {
    const {
        feiraSelecionada,
        paginaAtual,
        feiras,
        selecionarFeira,
        mudarPagina,
        marcarComoInteressada,
        jaDemonstrouInteresse,
        paginasTotais,
    } = useFeirasDeAdocao();

    const temFeiras = feiras.length > 0;

    return (
        <div className="min-h-screen bg-[#052759] py-8 px-4 lg:px-8 relative overflow-hidden">
            <style>{`
                @keyframes revealUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes painelIn {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <img
                src="/img-fade.png"
                alt=""
                className="absolute top-0 left-0 w-40 h-40 pointer-events-none select-none"
            />

            <div className="max-w-7xl mx-auto">
                <div
                    className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8"
                    style={{ animation: "revealUp 0.6s ease both" }}
                >
                    <FeirasHeader />

                    {temFeiras && (
                        <div className="lg:text-right">
                            <p
                                className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                Página
                            </p>
                            <nav
                                className="flex lg:justify-end gap-5"
                                aria-label="Paginação das feiras de adoção"
                            >
                                <Paginacao
                                    totalPaginas={paginasTotais}
                                    paginaAtual={paginaAtual}
                                    mudarPagina={mudarPagina}
                                />
                            </nav>
                        </div>
                    )}
                </div>

                {!temFeiras ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl py-20 px-6 text-center">
                        <p
                            className="text-white/70 text-lg font-semibold"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            Nenhuma feira de adoção disponível no momento.
                        </p>
                        <p className="text-white/40 text-sm mt-2">
                            Volte em breve para conferir novas datas.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                        <div
                            className="flex lg:flex-col gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-[330px] lg:shrink-0"
                            style={{
                                animation: "revealUp 0.6s ease both",
                                animationDelay: "0.1s",
                            }}
                        >
                            {feiras.map((feira) => (
                                <CardFeira
                                    key={feira.id}
                                    feira={feira}
                                    isSelected={feiraSelecionada?.id === feira.id}
                                    jaTemInteresse={jaDemonstrouInteresse(feira.id)}
                                    onClick={() => selecionarFeira(feira)}
                                />
                            ))}
                        </div>

                        <div className="flex-1 min-w-0">
                            {feiraSelecionada?.id && (
                                <div
                                    key={feiraSelecionada.id}
                                    style={{ animation: "painelIn 0.45s ease both" }}
                                >
                                    <FeiraDetalhes
                                        feira={feiraSelecionada}
                                        jaTemInteresse={jaDemonstrouInteresse(
                                            feiraSelecionada.id
                                        )}
                                        onRegistrarInteresse={() =>
                                            marcarComoInteressada(feiraSelecionada.id)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}