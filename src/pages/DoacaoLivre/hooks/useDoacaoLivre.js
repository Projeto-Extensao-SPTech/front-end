import { useState, useEffect } from "react";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import {
    getCollectionPoints,
    calculateFreight as calculateFreightService,
    submitDonation,
} from "../services/doacaoService";

const CEP_FIXO_USUARIO = "01414-001";

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
    });

    // Buscar pontos de coleta ao montar
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
        if (!cepOrigin || !cepDestination) {
            alertUtils.warn("Atenção", "Preencha os dois CEPs para calcular.");
            return;
        }

        alertUtils.loading("Calculando...", "Consultando opções de entrega");

        try {
            const data = await calculateFreightService(cepOrigin, cepDestination);
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
        cepUsuario: CEP_FIXO_USUARIO,
        updateFormData,
        nextStep,
        calculateFreight,
        finalSubmit,
    };
}
