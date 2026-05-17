import { ChevronDown, ChevronUp } from "lucide-react";
import useFeirasDeAdocao from "./hooks/useFeirasDeAdocao";
import FeirasHeader from "./components/FeirasHeader";
import Paginacao from "./components/Paginacao";
import CardFeira from "./components/CardFeira";
import FeiraDetalhes from "./components/FeiraDetalhes";

export default function FeirasDeAdocao() {
    const {
        feiraSelecionada,
        feiraIndex,
        paginaAtual,
        feiras,
        totalFeiras,
        selecionarFeira,
        proximaFeira,
        feiraAnterior,
        mudarPagina,
        marcarComoInteressada,
        jaDemonstrouInteresse,
        paginasTotais,
    } = useFeirasDeAdocao();

    const temFeiras = feiras.length > 0;
    const podeAnterior = feiraIndex > 0;
    const podeProxima = feiraIndex < feiras.length - 1;

    return (
        <div className="min-h-screen bg-[#052759] pt-4 pb-28 px-4 lg:px-8 relative overflow-hidden">
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
                    className="flex items-end justify-between mb-8"
                    style={{ animation: "revealUp 0.6s ease both" }}
                >
                    <FeirasHeader />
                    {totalFeiras > 0 && (
                        <p
                            className="text-[#FCAD0B] text-sm font-semibold shrink-0 pb-1"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            {totalFeiras} feiras agendadas no total
                        </p>
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
                            className="lg:sticky lg:top-4 lg:bottom-20 lg:shrink-0"
                            style={{
                                animation: "revealUp 0.6s ease both",
                                animationDelay: "0.1s",
                            }}
                        >
                            <div className="flex gap-3 items-stretch">
                                <div className="hidden lg:flex flex-col items-center justify-between py-1 shrink-0">
                                    <button
                                        onClick={feiraAnterior}
                                        disabled={!podeAnterior}
                                        aria-label="Feira anterior"
                                        className={`w-11 h-11 rounded-full flex items-center justify-center
                                            transition-all duration-200
                                            ${podeAnterior
                                                ? "bg-[#FCAD0B] text-[#052759] shadow-[0_4px_18px_rgba(252,173,11,0.45)] hover:scale-110 hover:shadow-[0_4px_26px_rgba(252,173,11,0.65)] active:scale-95"
                                                : "bg-white/10 text-white/20 cursor-default"
                                            }`}
                                    >
                                        <ChevronUp className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={proximaFeira}
                                        disabled={!podeProxima}
                                        aria-label="Próxima feira"
                                        className={`w-11 h-11 rounded-full flex items-center justify-center
                                            transition-all duration-200
                                            ${podeProxima
                                                ? "bg-[#FCAD0B] text-[#052759] shadow-[0_4px_18px_rgba(252,173,11,0.45)] hover:scale-110 hover:shadow-[0_4px_26px_rgba(252,173,11,0.65)] active:scale-95"
                                                : "bg-white/10 text-white/20 cursor-default"
                                            }`}
                                    >
                                        <ChevronDown className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="lg:w-[300px]">
                                    {paginasTotais > 1 && (
                                        <div className="flex items-center justify-center gap-3 mb-4">
                                            <span
                                                className="text-white/40 text-xs font-semibold uppercase tracking-wider"
                                                style={{ fontFamily: "Poppins, sans-serif" }}
                                            >
                                                Página
                                            </span>
                                            <nav aria-label="Paginação das feiras de adoção">
                                                <Paginacao
                                                    totalPaginas={paginasTotais}
                                                    paginaAtual={paginaAtual}
                                                    mudarPagina={mudarPagina}
                                                />
                                            </nav>
                                        </div>
                                    )}

                                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
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
                                </div>
                            </div>
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
