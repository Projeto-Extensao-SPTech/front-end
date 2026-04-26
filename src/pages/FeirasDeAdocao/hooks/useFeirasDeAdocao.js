import { useState, useEffect } from "react";
import { getFairs } from "../services/feiraService";

export default function useFeirasDeAdocao() {
    const ITENS_POR_PAGINA = 3;

    const [feiraSelecionada, setFeiraSelecionada] = useState({});
    const [paginasTotais, setPaginasTotais] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [feiras, setFeiras] = useState([]);

    const [feirasInteressadas, setFeirasInteressadas] = useState(() => {
        const salvo = localStorage.getItem("feiras_interesse_usuario");
        return salvo ? JSON.parse(salvo) : [];
    });

    useEffect(() => {
        async function loadFairs() {
            try {
                const response = await getFairs(
                    paginaAtual <= 1 ? 0 : (paginaAtual - 1),
                    ITENS_POR_PAGINA,
                    "fairDate"
                );

                if (response.data.length === 0) {
                    setFeiraSelecionada({});
                    setFeiras([]);
                    setPaginasTotais(0);
                    return;
                }

                setFeiras(response.data);
                setPaginasTotais(response.totalPages);
                setFeiraSelecionada(response.data[0]);
            } catch (error) {
                console.error("Erro ao carregar feiras:", error);
            }
        }

        loadFairs();
    }, [paginaAtual]);

    const marcarComoInteressada = (feiraId) => {
        if (!feirasInteressadas.includes(feiraId)) {
            const novasFeiras = [...feirasInteressadas, feiraId];
            setFeirasInteressadas(novasFeiras);
            localStorage.setItem(
                "feiras_interesse_usuario",
                JSON.stringify(novasFeiras)
            );
        }
    };

    const jaDemonstrouInteresse = (feiraId) =>
        feirasInteressadas.includes(feiraId);

    const selecionarFeira = (index) => setFeiraSelecionada(index);

    const mudarPagina = (pagina) => {
        setPaginaAtual(pagina);
    };

    function getSelectText() {
        if (feiras.length === 0) {
            return "Nenhuma feira de adoção disponível no momento.";
        } else {
            return "Veja abaixo os pets disponíveis na feira selecionada:";
        }
    }

    return {
        feiraSelecionada,
        paginaAtual,
        feiras,
        selecionarFeira,
        mudarPagina,
        marcarComoInteressada,
        jaDemonstrouInteresse,
        getSelectText,
        paginasTotais
    };
}