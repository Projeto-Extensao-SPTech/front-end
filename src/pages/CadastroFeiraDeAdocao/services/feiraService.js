import { api } from "../../../api/apiUserService";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";

export function convertDateToISO(dateStr) {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
}

export async function cadastrarFeira(formData, alert) {
    const formDataToSend = new FormData();

    const fairData = {
        fair_date: convertDateToISO(formData.data),
        fair_hour: `${convertDateToISO(formData.data)}T${formData.horario}`,
        address: {
            zip_code: formData.cep,
            street: formData.logradouro,
            number: formData.numero ? parseInt(formData.numero) : null,
            complement: formData.complemento,
            city: formData.cidade,
            state: formData.estado,
            country: formData.pais,
        },
    };

    formDataToSend.append(
        "fairRequest",
        new Blob([JSON.stringify(fairData)], { type: "application/json" })
    );

    formData.fotos.forEach((foto) => {
        formDataToSend.append("image", foto);
    });

    try {
        console.log("Enviando dados para cadastro:", fairData);
        const response = await api.post("/fairs/create", formDataToSend);

        handleHttpFeedback(alert, response, {
            successTitle: "Feira cadastrada com sucesso!",
            successMessage: `A feira de adoção na rua ${formData.logradouro} foi cadastrada com sucesso.`,
        });

        return response;
    } catch (error) {
        handleHttpFeedback(alert, error.response, {
            errorTitle: "Erro ao cadastrar feira",
            errorMessage:
                "Não foi possível cadastrar a feira de adoção. Tente novamente mais tarde.",
        });
        throw error;
    }
}
