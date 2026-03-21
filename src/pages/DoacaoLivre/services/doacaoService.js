import { api } from "../../../api/apiUserService";

export async function getCollectionPoints() {
    try {
        const storedData = sessionStorage.getItem("USER_DATA");
        const token = storedData ? JSON.parse(storedData).token : null;
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        const response = await api.get("/collection-centers", config);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar pontos de coleta:", error);
        throw error;
    }
}

export async function calculateFreight(cepOrigin, cepDestination) {
    try {
        const storedData = sessionStorage.getItem("USER_DATA");
        const token = storedData ? JSON.parse(storedData).token : null;
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        const response = await api.get(
            `/shipment/calculate_origem_destination?origin=${cepOrigin}&destination=${cepDestination}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao calcular frete:", error);
        throw error;
    }
}

export async function submitDonation(formData) {
    try {
        const storedData = sessionStorage.getItem("USER_DATA");

        if (!storedData) {
            throw new Error("Usuário não autenticado");
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

        const response = await api.post("/donations", formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao enviar doação:", error);
        throw error;
    }
}
