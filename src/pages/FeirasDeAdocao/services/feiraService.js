import { api } from "../../../api/apiUserService";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";
import { randomImage } from "../utils/imageUtils";

export async function getFairs(page, size, sortBy) {
    try {
        const response = await api.get(`/fairs/future?page=${page}&size=${size}&sortBy=${sortBy}`);
        const data = response.data.content.map((feira) => ({
            ...feira,
            card_image: randomImage(),
        }));
        return {
            data: data, 
            totalPages: response.data.total_pages
        };
    } catch (error) {
        console.error("Erro ao buscar feiras de adoção:", error);
        return [];
    }
}

export async function registrarInteresse(feiraId, enderecoFeira, alert) {
    try {
        const response = await api.patch(`/fairs/${feiraId}`);
        handleHttpFeedback(alert, response, {
            successTitle: "Interesse registrado!",
            successMessage: `Agradecemos seu interesse na feira de adoção em ${enderecoFeira}.`,
        });
        return { success: true };
    } catch (error) {
        handleHttpFeedback(alert, error.response, {
            errorTitle: "Erro ao registrar interesse",
            errorMessage:
                "Não foi possível registrar seu interesse. Tente novamente mais tarde.",
        });
        return { success: false };
    }
}
