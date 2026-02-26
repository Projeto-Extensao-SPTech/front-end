import { useState, useEffect } from "react";
import { api } from "../../../api/apiUserService";
import { useAlertUtils } from "../../../hooks/useAlertUtils";

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
                const storedData = sessionStorage.getItem("USER_DATA");
                const token = storedData ? JSON.parse(storedData).token : null;
                const config = token
                    ? { headers: { Authorization: `Bearer ${token}` } }
                    : {};

                const response = await api.get("/collection-centers", config);
                setCollectionPoints(response.data);
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

        const storedData = sessionStorage.getItem("USER_DATA");
        const token = storedData ? JSON.parse(storedData).token : null;
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        alertUtils.loading("Calculando...", "Consultando opções de entrega");

        try {
            const response = await api.get(
                `/shipment/calculate_origem_destination?origin=${cepOrigin}&destination=${cepDestination}`,
                config
            );
            setFreightInfo(response.data);
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
                alertUtils.warn("Sessão expirada. Por favor, faça login novamente.");
                setLoading(false);
                return;
            }

            const token = JSON.parse(storedData).token;
            const formDataToSend = new FormData();

            formDataToSend.append("name", formData.nomeProduto);
            formDataToSend.append("type", formData.categoria);
            formDataToSend.append("amount", parseInt(formData.quantidade));
            formDataToSend.append("state", formData.estado);
            formDataToSend.append("description", formData.descricao);
            formDataToSend.append(
                "shippingMethod",
                formData.tipoEnvio === "envio" ? "Correios" : "Ponto de Coleta"
            );

            if (formData.pontoColetaId) {
                formDataToSend.append("collectionCenterId", formData.pontoColetaId);
            }

            if (formData.foto) {
                formDataToSend.append("image", formData.foto);
            }

            await api.post("/donations", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alertUtils.success("Sucesso!", "Doação realizada com sucesso!");
            nextStep();
        } catch (error) {
            console.error("Erro no envio:", error);
            const msg = error.response?.data || "Erro desconhecido.";
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
