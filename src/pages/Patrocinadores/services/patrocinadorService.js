import { api } from "../../../api/apiUserService";

export async function sendSponsor(formData, alertUtils, onError) {
    if (!formData) return;

    const SESSION_KEY = "USER_DATA";
    let user = null;

    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        user = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error("Erro ao ler sessionStorage:", err);
        alertUtils.forbidden(
            "Houve um erro.",
            "Você precisa estar logado para se tornar um patrocinador."
        );
        if (onError) onError();
        return;
    }

    if (!user || !user.id) {
        alertUtils.forbidden(
            "Houve um erro.",
            "Você precisa estar logado para se tornar um patrocinador."
        );
        if (onError) onError();
        return;
    }

    console.log("Dados do usuário (sessionStorage):", user);
    console.log("Dados do formulário:", formData);

    const sponsorshipPayload = {
        sponsor_id: user.id,
        type: user.type || "PF",
        description: formData.descricao || "Sem descrição fornecida",
        department: getSponsorshipDepartment(formData.areasApoio),
    };

    console.log("Enviando sponsorship:", sponsorshipPayload);

    let createdSponsorshipId = null;

    api
        .post("/sponsorships", sponsorshipPayload)
        .then((sponsorshipResponse) => {
            console.log("Sponsorship created:", sponsorshipResponse.data);

            createdSponsorshipId = sponsorshipResponse.data.id;

            alertUtils.success(
                "Proposta enviada com sucesso!",
                "Agradecemos seu interesse em apoiar o Abrigo Dog Feliz. Nossa equipe entrará em contato em breve para discutir os próximos passos."
            );
        })
        .catch((error) => {
            console.error("Erro no fluxo de patrocínio:", error);

            if (error.response) {
                console.error("Resposta do servidor:", error.response.data);
            }

            if (createdSponsorshipId) {
                console.log(
                    "Cancelando sponsorship criado devido ao erro. ID:",
                    createdSponsorshipId
                );

                api
                    .delete(`/sponsorships/${createdSponsorshipId}`)
                    .then(() => {
                        console.log("Sponsorship deletado com sucesso (rollback)");
                        alertUtils.error(
                            "Ocorreu um erro ao enviar sua proposta.",
                            "A operação foi cancelada. Tente novamente mais tarde."
                        );
                    })
                    .catch((deleteError) => {
                        console.error(
                            "Erro ao deletar sponsorship (rollback falhou):",
                            deleteError
                        );
                        alertUtils.error(
                            "Ocorreu um erro crítico.",
                            "Tente novamente mais tarde ou nos envie um e-mail."
                        );
                    });
            } else {
                alertUtils.error(
                    "Ocorreu um erro ao enviar sua proposta.",
                    "Tente novamente mais tarde."
                );
            }
            if (onError) onError();
        });
}

export function getSponsorshipDepartment(areas) {
    const areaToDepartmentMap = {
        financeiramente: "Financeiro",
        alimentos: "Alimentício",
        remedios: "Saúde",
        divulgacao: "Marketing",
        campanhas: "Marketing",
        obras: "Infraestrutura",
        transporte: "Logística",
        higiene: "Saúde",
    };

    const areasArray = Array.isArray(areas) ? areas : [areas];

    const departments = areasArray
        .map((area) => areaToDepartmentMap[area])
        .filter((dept) => dept !== undefined);

    const uniqueDepartments = [...new Set(departments)];

    return uniqueDepartments.join(", ") || "Não especificado";
}
