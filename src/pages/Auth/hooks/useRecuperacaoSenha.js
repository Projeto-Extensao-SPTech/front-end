import { useState } from "react";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { api } from "../../../api/apiUserService";

export function useRecuperacaoSenha() {
    const alertUtils = useAlertUtils();

    const [etapaRecuperarSenha, setEtapaRecuperarSenha] = useState(0);
    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const [codigoDigitado, setCodigoDigitado] = useState("");

    const enviarCodigo = async (email) => {
        try {
            const { data: emailCadastrado } = await api.get(
                `/users/exists-by-mail/${encodeURIComponent(email)}`
            );

            if (!emailCadastrado) {
                alertUtils.warn(
                    "Email não encontrado",
                    "Esse email não pertence a nenhum usuário cadastrado"
                );
                return;
            }
        } catch (error) {
            console.error("Erro ao verificar email:", error);

            alertUtils.error(
                "Não foi possível continuar",
                "Tente novamente mais tarde."
            );

            return;
        }

        try {
            await api.post(
                `/users/send-code/${encodeURIComponent(email)}`
            );

            setEmailRecuperacao(email);
            setEtapaRecuperarSenha(2);

            alertUtils.success(
                "Código enviado",
                "Verifique sua caixa de entrada."
            );
        } catch (error) {
            console.error("Erro ao enviar código:", error);

            alertUtils.error(
                "Não foi possível enviar o código",
                "Tente novamente mais tarde."
            );
        }
    };

    const verificarCodigo = async (codigo) => {
        try {
            await api.post("/users/validate-code", {
                mail: emailRecuperacao,
                code: codigo,
            });

            setCodigoDigitado(codigo);
            setEtapaRecuperarSenha(3);
        } catch (error) {
            console.error("Erro ao validar código:", error);

            alertUtils.error(
                "Código inválido",
                "Verifique o código informado e tente novamente."
            );
        }
    };

    const atualizarSenha = async (email, novaSenha) => {
        try {
            await api.patch("/users/update-password", {
                mail: email,
                password: novaSenha,
                code: codigoDigitado,
            });

            setEtapaRecuperarSenha(4);
        } catch (error) {
            console.error("Erro ao atualizar senha:", error);

            alertUtils.error(
                "Não foi possível alterar a senha",
                "Verifique os dados informados."
            );
        }
    };

    const voltarAoLogin = () => {
        setEtapaRecuperarSenha(0);
        setEmailRecuperacao("");
        setCodigoDigitado("");
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
        emailRecuperacao,
    };
}