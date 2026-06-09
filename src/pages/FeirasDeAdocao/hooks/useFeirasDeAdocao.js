import { useState, useEffect } from "react";
import { getFairs } from "../services/feiraService";

export default function useFeirasDeAdocao() {
    const ITENS_POR_PAGINA = 3;

    const [feiraSelecionada, setFeiraSelecionada] = useState({});
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [totalFeiras, setTotalFeiras] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [feiras, setFeiras] = useState([]);

    const atualizarFeiraNaLista = (feiraAtualizada) => {
        setFeiras((prev) =>
            prev.map((feira) =>
                feira.id === feiraAtualizada.id
                    ? { ...feira, ...feiraAtualizada }
                    : feira
            )
        );
        setFeiraSelecionada((prev) =>
            prev?.id === feiraAtualizada.id
                ? { ...prev, ...feiraAtualizada }
                : prev
        );
    };

    useEffect(() => {
        async function loadFairs() {
            try {
                const response = await getFairs(
                    paginaAtual <= 1 ? 0 : paginaAtual - 1,
                    ITENS_POR_PAGINA,
                    "fairDate"
                );

                if (response.data.length === 0) {
                    setFeiraSelecionada({});
                    setFeiras([]);
                    setPaginasTotais(0);
                    setTotalFeiras(0);
                    return;
                }

                setFeiras(response.data);
                setPaginasTotais(response.totalPages);
                setTotalFeiras(
                    response.totalElements ?? response.totalPages * ITENS_POR_PAGINA
                );
                setFeiraSelecionada(response.data[0]);
            } catch (error) {
                console.error("Erro ao carregar feiras:", error);
            }
        }

        loadFairs();
    }, [paginaAtual]);

    const feiraIndex = feiras.findIndex((f) => f.id === feiraSelecionada?.id);

    const proximaFeira = () => {
        if (feiraIndex < feiras.length - 1) {
            setFeiraSelecionada(feiras[feiraIndex + 1]);
        }
    };

    const feiraAnterior = () => {
        if (feiraIndex > 0) {
            setFeiraSelecionada(feiras[feiraIndex - 1]);
        }
    };

    const marcarComoInteressada = (feiraAtualizada) => {
        if (feiraAtualizada) {
            atualizarFeiraNaLista(feiraAtualizada);
        }
    };

    const removerFeiraDaLista = (feiraId) => {
        setFeiras((prevFeiras) => {
            const nextFeiras = prevFeiras.filter((feira) => feira.id !== feiraId);
            if (nextFeiras.length === 0) {
                setFeiraSelecionada({});
                setTotalFeiras(0);
                return [];
            }

            if (feiraSelecionada?.id === feiraId) {
                const removedIndex = prevFeiras.findIndex((feira) => feira.id === feiraId);
                const nextIndex = Math.min(removedIndex, nextFeiras.length - 1);
                setFeiraSelecionada(nextFeiras[nextIndex]);
            }

            return nextFeiras;
        });
        setTotalFeiras((prev) => Math.max(prev - 1, 0));
    };

    const jaDemonstrouInteresse = (feira) =>
        Boolean(feira?.user_has_interest);

    const selecionarFeira = (feira) => setFeiraSelecionada(feira);

    const mudarPagina = (pagina) => {
        setPaginaAtual(pagina);
    };

    return {
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
    };
}
