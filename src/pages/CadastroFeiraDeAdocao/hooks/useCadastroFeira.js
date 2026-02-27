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

    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleBuscaCep = useCallback(
        async (e) => {
            const cepValue = e.target.value;
            const cepLimpo = cepValue.replace(/\D/g, "");

            if (cepLimpo.length !== 8) {
                return;
            }

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
                alert.error(
                    "CEP não encontrado",
                    "Verifique o CEP informado e tente novamente."
                );
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
            },
        });

        return () => fp.destroy();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosCompletos = {
            ...formData,
            fotos,
        };

        await cadastrarFeira(dadosCompletos, alert);
    };

    return {
        formData,
        fotos,
        handleChange,
        handleBuscaCep,
        handleFotosChange,
        removerFoto,
        handleSubmit,
    };
}
