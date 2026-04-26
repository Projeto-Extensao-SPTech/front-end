import { api } from "../../../api/apiUserService";

export async function cadastrarVoluntario(userId, message, availableDate) {
    const payload = {
        user_id: userId,
        message: message,
        available_date: availableDate,
    };

    console.log("Payload enviado:", payload);
    return await api.post("/volunteers", payload);
}
