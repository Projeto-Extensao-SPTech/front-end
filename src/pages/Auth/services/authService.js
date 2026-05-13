import { api, setHeaderParam } from "../../../api/apiUserService";

export async function cadastroUser(formData, tipoPessoa, alertUtils) {

    alertUtils.loading("Cadastrando usuário...", "Aguarde um momento")

    try {
        const requestBody = {
            name: formData.nome,
            document: formData.documento,
            phone: formData.telefone,
            address: {
                zip_code: formData.cep,
                state: formData.estado,
                city: formData.municipio,
                street: formData.rua,
                complement: formData.complemento,
                number: formData.numero,
                country: "Brasil"
            },
            mail_address: formData.email,
            password: formData.senha,
            type: tipoPessoa
        }
        console.log("Dados da requisição: ", requestBody)
        const response = await api.post('/auth/register', requestBody)

        alertUtils.close()
        await alertUtils.success("Cadastro realizado com sucesso!", "Bem-vindo ao abrigo dog feliz 🐶")
        return response.data
    } catch (error) {
        alertUtils.close()
        await alertUtils.error("Erro!", "Tentativa de cadastro falhou!", "Verifique os dados informados e tente novamente.")
        throw new Error(error.message)
    }
}

export async function loginUser(formData, alertUtils) {
    alertUtils.loading("Realizando login...", "Aguarde um momento")

    try {
        const response = await api.post('/auth/login', {
            mail_address: formData.email,
            password: formData.senha
        })

        alertUtils.close()
        alertUtils.success("Login realizado com sucesso!", "Bem vindo de volta 🐾")

        const data = response.data;
        sessionStorage.setItem("USER_DATA", JSON.stringify(data));
        setHeaderParam("Authorization", `Bearer ${data.token}`);

        if (data.is_admin === 1 || data.is_admin === true) {
            window.location.href = '/feiras-de-adocao'; 
        } else {
            window.location.href = '/ajudar';
        }

        return data;
    } catch (error) {
        alertUtils.close()
        await alertUtils.error("Falha no login!", "Verifique suas credenciais e tente novamente.")
        throw new Error(error.message)
    }
}