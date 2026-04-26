import { useState, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { handleHttpFeedback } from "../../../js/utils/handleHttpFeedback";
import { cadastrarVoluntario } from "../services/voluntarioService";

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

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "Nome é obrigatório";
                } else if (value.trim().length < 3) {
                    error = "Nome muito curto";
                } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) {
                    error = "Nome não pode conter números ou caracteres especiais";
                }
                break;

            case "email":
                if (!value.trim()) {
                    error = "E-mail é obrigatório";
                } else if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ) {
                    error = "E-mail inválido";
                }
                break;

            case "whatsapp":
                const phone = value.replace(/\D/g, "");
                if (!phone) {
                    error = "WhatsApp é obrigatório";
                } else if (phone.length < 10 || phone.length > 11) {
                    error = "WhatsApp inválido";
                }
                break;

            case "cpf":
                const cpf = value.replace(/\D/g, "");
                if (!cpf) {
                    error = "CPF é obrigatório";
                } else if (cpf.length !== 11) {
                    error = "CPF inválido";
                }
                break;

            case "calendario":
                if (!value) {
                    error = "Selecione uma data";
                }
                break;

            default:
                break;
        }

        return error;
    };

    useEffect(() => {
        const token = sessionStorage.getItem("USER_DATA");

        if (token) {
            const jsonData = JSON.parse(token);

            setFormData((prev) => ({
                ...prev,
                name: jsonData?.name || "",
                email: jsonData?.mail_address || "",
                cpf: jsonData?.document || "",
                whatsapp: jsonData?.phone || "",
            }));
        }
    }, []);

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

                // valida data ao selecionar
                setErrors((prev) => ({
                    ...prev,
                    calendario: validateField("calendario", dataFormatada),
                }));
            },
        });

        return () => fp.destroy();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        const error = validateField(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            alert.error(
                "Campos inválidos",
                "Corrija os erros antes de continuar."
            );
            return;
        }

        try {
            const token = sessionStorage.getItem("USER_DATA");

            if (!token) {
                alert.error("Erro", "Você precisa estar logado.");
                return;
            }

            const jsonData = JSON.parse(token);
            const userId = jsonData?.id;

            if (!userId) {
                alert.error("Erro", "Usuário inválido.");
                return;
            }

            const [dia, mes, ano] = formData.calendario.split("/");
            const isoDate = `${ano}-${mes}-${dia}`;

            const response = await cadastrarVoluntario(
                userId,
                formData.message,
                isoDate
            );

            return handleHttpFeedback(alert, response, {
                successTitle: "Cadastro realizado",
                successMessage:
                    "Obrigado por se voluntariar! Entraremos em contato.",
            });

        } catch (error) {
            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro no cadastro",
                errorMessage:
                    "Ocorreu um erro ao realizar seu cadastro.",
            });
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
}