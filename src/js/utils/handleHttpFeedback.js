export function handleHttpFeedback(alert, response, message = {}) {
    const status = response?.status;

    if (status >= 200 && status < 300) {
        alert.success(
            message.successTitle || "Sucesso!",
            message.successMessage || "Operação realizada com sucesso."
        );
        return;
    }

    if (status === 400) {
        alert.warn(
            "Dados inválidos!",
            "Verifique os campos preenchidos e tente novamente."
        );
        return;
    }

    if (status === 403) {
        alert.forbidden(
            "Ops, parece que você não está logado...",
            "Faça login ou cadastre-se e tente novamente."
        );
        return;
    }

    alert.error(
        message.errorTitle || "Erro!",
        message.errorMessage || "Algo deu errado. Tente novamente."
    );
}
