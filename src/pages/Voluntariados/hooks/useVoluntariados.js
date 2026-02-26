import { useState, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";
import { cadastrarVoluntario, enviarWhatsApp } from "../services/voluntarioService";

export function useVoluntariados() {
    const alert = useAlertUtils();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
        cpf: "",
        message: "",
        calendario: "",
    });

    // Preencher dados do usuário logado
    useEffect(() => {
        const token = sessionStorage.getItem("USER_DATA");

        if (token) {
            const jsonData = JSON.parse(token);
            console.log("JSON DATA COMPLETO:", jsonData);

            setFormData((prev) => ({
                ...prev,
                name: jsonData?.name || "",
                email: jsonData?.mail_address || "",
                cpf: jsonData?.document || "",
                whatsapp: jsonData?.phone || "",
            }));
        }
    }, []);

    // Inicializar flatpickr
    useEffect(() => {
        const fp = flatpickr("#calendario", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (dates) => {
                const dataFormatada =
                    dates.length > 0 ? flatpickr.formatDate(dates[0], "d/m/Y") : "";

                setFormData((prev) => ({ ...prev, calendario: dataFormatada }));
            },
        });
        return () => fp.destroy();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = sessionStorage.getItem("USER_DATA");

            if (!token) {
                handleHttpFeedback(alert, {
                    errorTitle: "Erro de autenticação",
                    errorMessage: "Você precisa estar logado para se voluntariar.",
                });
                return;
            }

            const jsonData = JSON.parse(token);
            const userId = jsonData?.id;

            if (!userId) {
                handleHttpFeedback(alert, {
                    errorTitle: "Erro de autenticação",
                    errorMessage: "ID do usuário não encontrado. Faça login novamente.",
                });
                return;
            }

            // Converter data para ISO
            const [dia, mes, ano] = formData.calendario.split("/");
            const isoDate = `${ano}-${mes}-${dia}`;

            const response = await cadastrarVoluntario(userId, formData.message, isoDate);

            console.log("Voluntário cadastrado:", response.data);
            handleHttpFeedback(alert, response, {
                successTitle: "Cadastro realizado",
                successMessage: "Obrigado por se voluntariar! Entraremos em contato em breve.",
            });

            await enviarWhatsApp(formData, alert);
            handleHttpFeedback(alert, response, {
                successTitle: "Mensagem enviada",
                successMessage: "Uma mensagem de desejo de voluntariado foi enviada via WhatsApp para nossa equipe.",
            });
        } catch (error) {
            console.error("Erro ao cadastrar voluntário:", error);
            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro no cadastro",
                errorMessage: "Ocorreu um erro ao realizar seu cadastro. Tente novamente mais tarde.",
            });
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
}
