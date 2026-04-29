import { api } from "../../../api/apiUserService";
import { parseCEP } from "../../../js/utils/formatter";

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

export async function calculateFreight(freightData) {
    try {
        const storedData = sessionStorage.getItem("USER_DATA");
        const token = storedData ? JSON.parse(storedData).token : null;
        const config = token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {};

        const payload = {
            from: {
                postal_code: parseCEP(freightData.cep_origem || "")
            },
            to: {
                postal_code: parseCEP(freightData.cep_destino || "")
            },
            products: [
                {
                    id: "donation",
                    width: freightData.largura ? parseFloat(freightData.largura) : 0,
                    height: freightData.altura ? parseFloat(freightData.altura) : 0,
                    length: freightData.comprimento ? parseFloat(freightData.comprimento) : 0,
                    weight: freightData.peso ? parseFloat(freightData.peso) : 0,
                    insuranceValue: freightData.preco ? parseFloat(freightData.preco) : 0,
                    quantity: freightData.quantidade ? parseInt(freightData.quantidade) : 1,
                }
            ],
            options: {
                receipt: false,
                ownHand: false
            }
        };

        console.log("Payload para cálculo de frete:", payload);

        const response = await api.post(
            `/shipment/calculate`,
            payload,
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
