import useScrollReveal from "./hooks/useScrollReveal";
import useFeirasDeAdocao from "./hooks/useFeirasDeAdocao";
import FeirasHeader from "./components/FeirasHeader";
import Paginacao from "./components/Paginacao";
import CardFeira from "./components/CardFeira";
import CardPet from "./components/CardPet";

export default function FeirasDeAdocao() {
    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [paginationRef, paginationVisible] = useScrollReveal(0.1);
    const [feiraCardsRef, feiraCardsVisible] = useScrollReveal(0.1);
    const [petsRef, petsVisible] = useScrollReveal(0.1);

    const {
        feiraSelecionada,
        paginaAtual,
        feiras,
        selecionarFeira,
        mudarPagina,
        marcarComoInteressada,
        jaDemonstrouInteresse,
        getSelectText,
    } = useFeirasDeAdocao();

    const CARDS_POR_PAGINA = 3;
    const totalPaginas = Math.ceil(feiras.length / CARDS_POR_PAGINA);

    const indiceInicio = (paginaAtual - 1) * CARDS_POR_PAGINA;
    const indiceFim = indiceInicio + CARDS_POR_PAGINA;
    const feirasVisiveis = feiras.slice(indiceInicio, indiceFim);

    return (
        <div className="min-h-screen bg-[#052759] py-8 px-4 lg:px-8 relative overflow-hidden">
            <img
                src="/img-fade.png"
                alt=""
                className="absolute top-0 left-0 w-40 h-40"
            />

            <div className="max-w-7xl mx-auto mb-12">
                <div
                    ref={headerRef}
                    className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 transition-all duration-700
            ${headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-8"
                        }
          `}
                >
                    <div className="lg:w-2/5">
                        <FeirasHeader />
                    </div>

                    <div className="lg:w-3/5 w-full">
                        <nav
                            ref={paginationRef}
                            className={`flex justify-center gap-6 mb-6 transition-all duration-700
                ${paginationVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }
              `}
                        >
                            <Paginacao
                                totalPaginas={totalPaginas}
                                paginaAtual={paginaAtual}
                                mudarPagina={mudarPagina}
                            />
                        </nav>

                        <div
                            ref={feiraCardsRef}
                            className={`flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:grid lg:grid-cols-3 transition-all duration-700
                ${feiraCardsVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                                }
              `}
                        >
                            {feirasVisiveis.map((feira, indexNaPagina) => {
                                const indexGlobal = indiceInicio + indexNaPagina;
                                const isSelected = feiraSelecionada === indexGlobal;
                                const jaTemInteresse = jaDemonstrouInteresse(feira.id);

                                return (
                                    <div
                                        key={feira.id}
                                        style={{ transitionDelay: `${indexNaPagina * 150}ms` }}
                                        className="transition-all duration-700"
                                    >
                                        <CardFeira
                                            feira={feira}
                                            isSelected={isSelected}
                                            jaTemInteresse={jaTemInteresse}
                                            onClick={() => selecionarFeira(indexGlobal)}
                                            onRegistrarInteresse={() => marcarComoInteressada(feira.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={petsRef}
                className={`max-w-7xl mx-auto transition-all duration-700
          ${petsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
            >
                <h2
                    className="text-2xl lg:text-3xl font-bold text-white text-center mb-8"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                >
                    {getSelectText()}
                </h2>

                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
                        {feiras[feiraSelecionada]?.images?.map((image, index) => (
                            <CardPet key={index} image={image} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
