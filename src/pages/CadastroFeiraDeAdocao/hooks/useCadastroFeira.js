import { useState, useEffect, useCallback } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { buscarCep } from "../../../api/apiCep";
import { cadastrarFeira } from "../services/feiraService";

export default function useCadastroFeira(alert) {
    const [formData, setFormData] = useState({
        horario: "",
        data: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
    });

    const [fotos, setFotos] = useState([]);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "horario":
                if (!value) error = "Informe o horário";
                break;

            case "data":
                if (!value) error = "Selecione uma data";
                break;

            case "cep":
                const cep = value.replace(/\D/g, "");
                if (cep.length !== 8) error = "CEP inválido";
                break;

            case "logradouro":
                if (!value.trim()) error = "Rua obrigatória";
                break;

            case "numero":
                if (!value) error = "Número obrigatório";
                break;

            case "cidade":
                if (!value.trim()) error = "Cidade obrigatória";
                break;

            case "estado":
                if (!value.trim()) error = "Estado obrigatório";
                break;

            case "pais":
                if (!value.trim()) error = "País obrigatório";
                break;
        }

        return error;
    };

    const handleChange = useCallback((e) => {
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
    }, []);

    const handleBuscaCep = useCallback(
        async (e) => {
            const cepValue = e.target.value;
            const cepLimpo = cepValue.replace(/\D/g, "");

            if (cepLimpo.length !== 8) return;

            try {
                const resultado = await buscarCep(cepValue);

                setFormData((prev) => ({
                    ...prev,
                    logradouro: resultado.logradouro || "",
                    complemento: resultado.complemento || "",
                    bairro: resultado.bairro || "",
                    cidade: resultado.localidade || "",
                    estado: resultado.uf || "",
                    pais: "Brasil",
                }));

                alert.success("CEP encontrado!", "Endereço preenchido automaticamente.");
            } catch {
                alert.error("CEP não encontrado", "Verifique o CEP informado.");
            }
        },
        [alert]
    );

    const handleFotosChange = useCallback((novasFotos) => {
        setFotos((prev) => [...prev, ...novasFotos]);
    }, []);

    const removerFoto = useCallback((index) => {
        setFotos((prev) => prev.filter((_, i) => i !== index));
    }, []);

    useEffect(() => {
        const fp = flatpickr("#calendar-input", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (dates) => {
                const dataFormatada =
                    dates.length > 0 ? flatpickr.formatDate(dates[0], "d/m/Y") : "";

                setFormData((prev) => ({ ...prev, data: dataFormatada }));

                setErrors((prev) => ({
                    ...prev,
                    data: validateField("data", dataFormatada),
                }));
            },
        });

        return () => fp.destroy();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (fotos.length === 0) {
            newErrors.fotos = "Adicione ao menos uma foto";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            alert.error("Campos inválidos", "Corrija os erros antes de continuar.");
            return;
        }

        const dadosCompletos = {
            ...formData,
            fotos,
        };

        await cadastrarFeira(dadosCompletos, alert);
    };

    return {
        formData,
        fotos,
        errors,
        handleChange,
        handleBuscaCep,
        handleFotosChange,
        removerFoto,
        handleSubmit,
    };
}