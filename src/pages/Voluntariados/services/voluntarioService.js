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
