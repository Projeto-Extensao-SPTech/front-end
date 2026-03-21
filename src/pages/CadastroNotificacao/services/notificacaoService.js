import { api } from "../../../api/apiUserService";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";
import { formatDate } from "../utils/dateFormatter";

export async function buscarFeiras(alert, onError) {
    try {
        const result = await api.get("/feiras/future");
        if (result.status === 200) {
            const data = result.data;
            console.log("Feiras obtidas: ", data);
            return data;
        } else {
            alert.warn(
                "Ops, não foi possível carregar a lista de feiras!",
                "No momento não existem feiras disponíveis para associar à notificação. Cadastre uma nova feira e tente novamente."
            );
            onError();
            return [];
        }
    } catch (error) {
        console.log("Erro ao coletar feiras:", error);
        handleHttpFeedback(alert, error);
        return [];
    }
}

export async function cadastrarNotificacao(formData, notificacoes, alert) {
    alert.loading("Aguarde", "Estamos cadastrando a sua notificação...");

    const dados = {
        type: formData.tipo,
        event_date: formatDate(formData.data, "/", "-"),
        message: formData.mensagem,
        fair_id: formData.id_feira,
        recurrences: notificacoes.map((it) => Number(it.quantidade)),
    };

    try {
        const result = await api.post("/notifications", dados);
        console.log("Resultado: ", result);

        handleHttpFeedback(alert, result, {
            successTitle: "Notificação criada!",
            successMessage:
                "A notificação está sendo processada. Ela será criada e enviada em breve!!",
        });

        return result;
    } catch (error) {
        console.error("Erro ao enviar:", error);

        handleHttpFeedback(alert, error.response ?? error, {
            errorTitle: "Erro ao criar notificação",
            errorMessage:
                error.response?.data?.message ||
                "Não foi possível criar a notificação.",
        });

        throw error;
    }
}
