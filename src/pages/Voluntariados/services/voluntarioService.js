import { api } from "../../../api/apiUserService";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";

export async function cadastrarVoluntario(userId, message, availableDate) {
    const payload = {
        user_id: userId,
        message: message,
        available_date: availableDate,
    };

    console.log("Payload enviado:", payload);
    return await api.post("/volunteers", payload);
}

export async function enviarWhatsApp(formData, alert) {
    const token = sessionStorage.getItem("USER_DATA");

    if (!token) {
        return handleHttpFeedback(alert, {
            errorTitle: "Erro de autenticação",
            errorMessage: "Você precisa estar logado para enviar a mensagem pelo WhatsApp.",
        });
    }

    const user = JSON.parse(token);

    const msg =
        `Olá!\nSou um voluntário interessado! 🐶\n\n` +
        `Nome: ${user.name || formData.name}\n` +
        `Email: ${user.mail_address || formData.email}\n` +
        `Mensagem: ${formData.message || "Não informado"}\n` +
        `Data disponível: ${formData.calendario}`;

    const beneficiaryNumber = `5511930144580`;
    const payload = {
        number: beneficiaryNumber,
        text: msg,
    };

    const instance = "api-manager";

    try {
        const response = await api.post(`/messages/sendText/${instance}`, payload);
        console.log("Mensagem enviada com sucesso:", response.data);
        return response;
    } catch (error) {
        console.error("Erro ao enviar WhatsApp:", error.response);
        handleHttpFeedback(alert, {
            errorTitle: "Erro ao enviar mensagem",
            errorMessage: "Não foi possível enviar a mensagem via WhatsApp. Tente novamente mais tarde.",
        });
        throw error;
    }
}
