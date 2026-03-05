import { useState, useEffect, useCallback } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { buscarFeiras, cadastrarNotificacao } from "../services/notificacaoService";
import { formatFeira } from "../utils/dateFormatter";

export default function useCadastroNotificacao(alert) {
    const [form, setForm] = useState({
        tipo: "",
        data: "",
        mensagem: "",
        id_feira: "",
    });

    const [notificacoes, setNotificacoes] = useState([
        { id: 1, quantidade: "1", unidade: "dias" },
    ]);

    const [feiras, setFeiras] = useState([]);

    const carregarFeiras = useCallback(async () => {
        const feirasData = await buscarFeiras(alert, () => {
            setForm((prev) => ({ ...prev, tipo: "" }));
        });

        const feirasFormatadas = feirasData.map((feira) => ({
            value: feira.id,
            label: formatFeira(feira),
        }));

        setFeiras(feirasFormatadas);
    }, [alert]);

    useEffect(() => {
        if (form.tipo === "FAIR") {
            carregarFeiras();
        } else {
            setFeiras([]);
            setForm((prev) => ({ ...prev, id_feira: "" }));
        }
    }, [form.tipo, carregarFeiras]);

    useEffect(() => {
        const calendario = flatpickr("#data-evento", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (datas) => {
                const dataFormatada =
                    datas.length > 0 ? flatpickr.formatDate(datas[0], "d/m/Y") : "";
                setForm((prev) => ({ ...prev, data: dataFormatada }));
            },
        });

        return () => calendario.destroy();
    }, []);

    const atualizarForm = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "id_feira" ? Number(value) : value,
        }));
    };

    const atualizarNotificacao = (id, campo, valor) => {
        setNotificacoes((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, [campo]: valor } : notif
            )
        );
    };

    const adicionarNotificacao = () => {
        const novoId = Math.max(...notificacoes.map((n) => n.id), 0) + 1;
        setNotificacoes((prev) => [
            ...prev,
            { id: novoId, quantidade: "1", unidade: "dias" },
        ]);
    };

    const removerNotificacao = (id) => {
        if (notificacoes.length > 1) {
            setNotificacoes((prev) => prev.filter((notif) => notif.id !== id));
        }
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        await cadastrarNotificacao(form, notificacoes, alert);
    };

    return {
        form,
        notificacoes,
        feiras,
        atualizarForm,
        atualizarNotificacao,
        adicionarNotificacao,
        removerNotificacao,
        enviarFormulario,
    };
}
