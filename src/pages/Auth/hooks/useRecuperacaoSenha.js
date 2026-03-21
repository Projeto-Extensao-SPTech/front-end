import { useState } from "react";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { api } from "../../../api/apiUserService";

export function useRecuperacaoSenha() {
    const alertUtils = useAlertUtils();
    const [etapaRecuperarSenha, setEtapaRecuperarSenha] = useState(0);
    const [codigoVerificacao, setCodigoVerificacao] = useState("");

    const enviarCodigo = async (telefone) => {
        const codigo = Math.floor(1000 + Math.random() * 9000).toString();
        setCodigoVerificacao(codigo);
        const telefoneLimpo = telefone.replace(/\D/g, "");
        const numeroFormatado = `55${telefoneLimpo}`;

        try {
            const telefoneCadastrado = await api.get(
                `/users/exists-by-phone/${telefoneLimpo}`
            );
            if (!telefoneCadastrado) {
                alertUtils.warn(
                    "Telefone não encontrado",
                    "Esse telefone não pertence a nenhum usuário cadastrado"
                );
                return;
            }
            console.log("Telefone encontrado");
        } catch (error) {
            console.log("Erro ao verificar o telefone: ", error.message);
            alertUtils.error(
                "Não foi possível continuar",
                "Tente novamente mais tarde."
            );
            return;
        }

        const requestBody = {
            number: numeroFormatado,
            text: `Abrigo Dog Feliz: Seu código de verificação é: ${codigo}`,
        };

        try {
            const response = await fetch(
                "http://localhost:7000/messages/sendText/api-manager",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody),
                }
            );

            if (response.ok) {
                setEtapaRecuperarSenha(2);
            } else {
                const errorText = await response.text();
                alertUtils.error({ text: `Erro ao enviar mensagem: ${errorText}` });
            }
        } catch {
            alertUtils.error({
                text: "Erro ao enviar mensagem. Tente novamente mais tarde.",
            });
        }
    };

    const verificarCodigo = (codigoDigitado) => {
        if (codigoDigitado === codigoVerificacao) {
            setCodigoVerificacao("");
            setEtapaRecuperarSenha(3);
        } else {
            alertUtils.warn({
                text: "Código de verificação inválido. Tente novamente.",
            });
        }
    };

    const atualizarSenha = async (telefone, novaSenha) => {
        try {
            await api.patch("/users/update-password", {
                phone: telefone.replace(/\D/g, ""),
                password: novaSenha,
            });
            setEtapaRecuperarSenha(4);
        } catch (error) {
            console.error("Erro ao atualizar a senha: " + error.message);
            alertUtils.error(
                "Não foi possível continuar",
                "Tente novamente mais tarde."
            );
            return;
        }
    };

    const voltarAoLogin = () => {
        setEtapaRecuperarSenha(0);
    };

    const iniciarRecuperacao = () => {
        setEtapaRecuperarSenha(1);
    };

    return {
        etapaRecuperarSenha,
        enviarCodigo,
        verificarCodigo,
        atualizarSenha,
        voltarAoLogin,
        iniciarRecuperacao,
    };
}
