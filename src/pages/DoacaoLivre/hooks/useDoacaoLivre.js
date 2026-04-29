import { useState, useEffect } from "react";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import {
    getCollectionPoints,
    calculateFreight as calculateFreightService,
    submitDonation,
} from "../services/doacaoService";

export function useDoacaoLivre() {
    const alertUtils = useAlertUtils();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [collectionPoints, setCollectionPoints] = useState([]);
    const [freightInfo, setFreightInfo] = useState(null);

    const [formData, setFormData] = useState({
        nomeProduto: "",
        categoria: "",
        quantidade: "",
        estado: "",
        descricao: "",
        foto: null,
        tipoEnvio: "",
        pontoColetaId: null,
        cep_origem: "",
        cep_destino: "09609-000",
        peso: "",
        altura: "",
        largura: "",
        comprimento: "",
        preco: ""
    });

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const data = await getCollectionPoints();
                setCollectionPoints(data);
            } catch (error) {
                console.error("Erro ao buscar pontos:", error);
            }
        };
        fetchPoints();
    }, []);

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Limpar freightInfo quando mudar tipo de envio
        if (field === "tipoEnvio") {
            setFreightInfo(null);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);

    const calculateFreight = async (cepOrigin, cepDestination) => {
        if (
            !cepOrigin ||
            !cepDestination || 
            !formData.peso || 
            !formData.altura || 
            !formData.largura || 
            !formData.comprimento
        ) {
            alertUtils.warn("Atenção", "Preencha todos os campos para calcular o frete!");
            return;
        }

        alertUtils.loading("Calculando...", "Consultando opções de entrega");

        try {
            const freightData = {
                cep_origem: cepOrigin,
                cep_destino: cepDestination,
                peso: formData.peso,
                altura: formData.altura,
                largura: formData.largura,
                comprimento: formData.comprimento,
                quantidade: formData.quantidade,
                preco: formData.preco
            };
            
            const data = await calculateFreightService(freightData);
            setFreightInfo(data);
            alertUtils.close();
        } catch (error) {
            alertUtils.close();
            console.error("Erro ao calcular frete:", error);
        }
    };

    const finalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const storedData = sessionStorage.getItem("USER_DATA");

            if (formData.tipoEnvio === "envio") {
                if (
                    !formData.cep_origem ||
                    !formData.cep_destino ||
                    !formData.peso ||
                    !formData.altura ||
                    !formData.largura ||
                    !formData.comprimento
                ) {
                    alertUtils.warn(
                        "Atenção",
                        "Preencha todos os campos de endereço e dimensões para finalizar!"
                    );
                    setLoading(false);
                    return;
                }
            }

            if (formData.tipoEnvio === "ponto de coleta" && !formData.pontoColetaId) {
                alertUtils.warn(
                    "Atenção",
                    "Selecione um ponto de coleta para finalizar!"
                );
                setLoading(false);
                return;
            }

            if (!storedData) {
                alertUtils.warn(
                    "Sessão expirada. Por favor, faça login novamente."
                );
                setLoading(false);
                return;
            }

            await submitDonation(formData);
            alertUtils.success("Sucesso!", "Doação realizada com sucesso!");
            nextStep();
        } catch (error) {
            console.error("Erro no envio:", error);
            const msg = error.response?.data || error.message || "Erro desconhecido.";
            alertUtils.error(
                "Erro ao enviar doação: " +
                (typeof msg === "object" ? JSON.stringify(msg) : msg)
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        step,
        formData,
        loading,
        collectionPoints,
        freightInfo,
        updateFormData,
        nextStep,
        calculateFreight,
        finalSubmit,
    };
}
