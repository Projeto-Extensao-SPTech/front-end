import { useState, useEffect, useCallback } from "react";
import { buscarFeiras, cadastrarNotificacao } from "../services/notificacaoService";
import { formatFeira, calcularDatasAgendadas } from "../utils/dateFormatter";

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
    }, [form.tipo]);

    const converterInputDateParaBackend = (dataISO) => {
        if (!dataISO) return "";
        const partes = dataISO.split("-");
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return dataISO;
    };

    const converterBackendParaInputDate = (dataBR) => {
        if (!dataBR) return "";
        const partes = dataBR.split("/");
        if (partes.length === 3) {
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
        return dataBR;
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;

        if (name === "data") {
            const dataBackend = converterInputDateParaBackend(value);
            setForm((prev) => ({
                ...prev,
                data: dataBackend,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: name === "id_feira" ? Number(value) : value,
            }));
        }
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

    const datasAgendadas = calcularDatasAgendadas(form.data, notificacoes);
    
    const valorDataInput = converterBackendParaInputDate(form.data);

    return {
        form,
        notificacoes,
        feiras,
        datasAgendadas,
        atualizarForm,
        atualizarNotificacao,
        adicionarNotificacao,
        removerNotificacao,
        enviarFormulario,
        valorDataInput,
    };
}