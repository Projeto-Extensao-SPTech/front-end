import { useState, useEffect } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { FaCalendarAlt, FaPaw, FaBell, FaEnvelope, FaClock, FaPlus, FaTrash} from 'react-icons/fa'
import Button from '../components/ui/Button'
import { api } from '../api/apiUserService'
import { handleHttpFeedback } from '../js/utils/handleHttpFeedback'
import { useAlertUtils } from '../hooks/useAlertUtils'

export default function CadastroNotificacao() {
    const alert = useAlertUtils()

    const [form, setForm] = useState({
        tipo: '',
        data: '',
        mensagem: '',
        id_feira: ''
    })

    const [notificacoes, setNotificacoes] = useState([
        { id: 1, quantidade: '1', unidade: 'dias' }
    ])

    const [feiras, setFeiras] = useState([
        {
            id: 1,
            fairDate: "2025-11-18",
            fairHour: "2025-11-18T19:07:40",
            address: {
                id: 2,
                zipCode: "08341150",
                street: "Rua 2000",
                number: 100,
                complement: "Casa",
                city: "São Paulo",
                state: "SP",
                country: "BR",
            },
        },
        {
            id: 2,
            fairDate: "2025-12-01",
            fairHour: "2025-12-01T14:30:00",
            address: {
                id: 3,
                zipCode: "04534011",
                street: "Av. Faria Lima",
                number: 1500,
                complement: "7º andar",
                city: "São Paulo",
                state: "SP",
                country: "BR",
            },
        },
        {
            id: 3,
            fairDate: "2026-01-05",
            fairHour: "2026-01-05T09:45:00",
            address: {
                id: 4,
                zipCode: "88000000",
                street: "Rua das Flores",
                number: 250,
                complement: "",
                city: "Florianópolis",
                state: "SC",
                country: "BR",
            },
        },
    ])

    function formatFeira(feira) {
        const date = feira.fairDate.split("-").reverse().join("/")
        const { street, number, city, state } = feira.address
        const addressFormatted = `${street}, n° ${number} | ${city}/${state}`
        return `${date} - ${addressFormatted}`
    }



    useEffect(() => {
        const calendario = flatpickr("#data-evento", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (datas) => {
                const dataFormatada = datas.length > 0 ? flatpickr.formatDate(datas[0], "d/m/Y") : ''
                setForm(prev => ({ ...prev, data: dataFormatada }))
            },
        })

        return () => calendario.destroy()
    }, [])

    const atualizarForm = (e) => {
        const { name, value } = e.target

        setForm(prev => ({
            ...prev,
            [name]: name === "id_feira" ? Number(value) : value
        }))
    }

    const atualizarNotificacao = (id, campo, valor) => {
        setNotificacoes(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, [campo]: valor } : notif
            )
        )
    }

    const adicionarNotificacao = () => {
        const novoId = Math.max(...notificacoes.map(n => n.id), 0) + 1
        setNotificacoes(prev => [...prev, { id: novoId, quantidade: '1', unidade: 'dias' }])
    }

    const removerNotificacao = (id) => {
        if (notificacoes.length > 1) {
            setNotificacoes(prev => prev.filter(notif => notif.id !== id))
        }
    }

    function formatDate(dateStr, currentSplit, desiredSplit) {
        const parts = dateStr.split(currentSplit);
        if (parts.length !== 3) return dateStr;

        if (parts[0].length === 2) {
            const [day, month, year] = parts;
            return `${year}${desiredSplit}${month}${desiredSplit}${day}`;
        }

        if (parts[0].length === 4) {
            const [year, month, day] = parts;
            return `${day}${desiredSplit}${month}${desiredSplit}${year}`;
        }

        return dateStr;
    }


    const enviarFormulario = async (e) => {
        e.preventDefault()

        alert.loading("Aguarde", "Estamos cadastrando a sua notificação...")
        const dados = {
            type: form.tipo,
            event_date: formatDate(form.data, "/", "-"),
            message: form.mensagem,
            adoption_fair_id: form.id_feira,
            recurrences: notificacoes.map(it => Number(it.quantidade)),
        }

        try {
            const result = await api.post("/notifications", dados);
            console.log("Resultado: ", result);

            handleHttpFeedback(alert, result, {
                successTitle: "Notificação criada!",
                successMessage:
                    `A notificação foi cadastrada com sucesso para os dias: ` +
                    result.data.recurrences.map(r => formatDate(r, "-", "/")).join(", ") + "!"
            });

        } catch (error) {
            console.error("Erro ao enviar:", error);

            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro ao criar notificação",
                errorMessage: error.response?.data?.message || "Não foi possível criar a notificação."
            });
        }

    }


    function mostrarFeedback(response) {

    }

    const SelectComIcone = ({ icone: Icone, nome, opcoes, valor, onChange, placeholder }) => (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden relative">
            <span className="p-3 text-[#052759]">
                <Icone className="text-lg" />
            </span>

            <select
                name={nome}
                className="w-full pr-10 py-3 text-sm text-[#052759] focus:outline-none font-medium pl-3 bg-white appearance-none cursor-pointer"
                value={valor === null ? "" : valor}
                onChange={onChange}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {opcoes.map(opcao => (
                    <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                    </option>
                ))}
            </select>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r-2 border-b-2 border-[#052759] rotate-45"></div>
            </div>
        </div>
    )


    return (
        <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center py-8">

            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#052759] mb-2">
                    Cadastrar Notificação
                </h1>
                <p className="text-[#052759] text-sm">
                    Existe algum evento ou necessidade? Notifique aqui seus usuários cadastrados!
                </p>
            </div>

            <div className="w-11/12 max-w-5xl bg-[#052759] p-8 rounded-xl shadow-lg relative">

                <form onSubmit={enviarFormulario} className="grid lg:grid-cols-2 gap-8 items-start">


                    <div className="space-y-6">

                        <SelectComIcone
                            key={1}
                            icone={FaBell}
                            nome="tipo"
                            valor={form.tipo}
                            onChange={atualizarForm}
                            placeholder="Selecione o tipo da notificação"
                            opcoes={[
                                { value: 'ADOPTION_FAIR', label: 'Feira de Adoção' },
                                { value: 'DONATION', label: 'Precisamos de Doações' },
                                { value: 'VOLUNTEER', label: 'Precisamos de Voluntários' },
                                { value: 'GENERAL', label: 'Outro' }
                            ]}
                        />

                        {
                            form.tipo == 'ADOPTION_FAIR' &&
                            <SelectComIcone
                                key={2}
                                icone={FaPaw}
                                nome="id_feira"
                                valor={form.id_feira}
                                onChange={atualizarForm}
                                placeholder="Selecione uma feira para associar a notificação"
                                opcoes={feiras.map(feira => ({
                                    value: feira.id,
                                    label: formatFeira(feira)
                                }))}
                            />

                        }

                        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
                            <span className="p-3 text-[#052759]">
                                <FaCalendarAlt className="text-lg" />
                            </span>
                            <input
                                id="data-evento"
                                name="data"
                                placeholder="Data do Evento:"
                                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white cursor-pointer"
                                value={form.data}
                                onChange={atualizarForm}
                            />
                        </div>

                        <div className="flex items-start border-2 border-[#052759] rounded-lg bg-white min-h-[220px]">
                            <span className="p-3 text-[#052759] self-start">
                                <FaEnvelope className="text-lg" />
                            </span>
                            <textarea
                                name="mensagem"
                                placeholder="Mensagem"
                                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white resize-none"
                                value={form.mensagem}
                                onChange={atualizarForm}
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">

                        <div className="bg-white rounded-xl p-6 border-2 border-[#052759] h-full flex flex-col">

                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[#052759] font-bold flex items-center gap-2 text-lg">
                                    <FaClock className="text-[#FCAD0B] text-xl" />
                                    Agendar Notificações
                                </h3>
                                <button
                                    type="button"
                                    onClick={adicionarNotificacao}
                                    className="flex items-center gap-2 bg-[#FCAD0B] text-[#052759] px-4 py-2.5 rounded-lg hover:bg-[#FFD166] transition-colors font-bold text-sm"
                                >
                                    <FaPlus className="text-sm" />
                                    Adicionar
                                </button>
                            </div>

                            <p className="text-sm text-[#525252] mb-4">Enviada com antecedência de: </p>

                            <div className="flex-1 overflow-y-auto max-h-32 pr-3 space-y-4 custom-scrollbar">
                                {notificacoes.map((notif) => (
                                    <div key={notif.id} className="bg-[#F8F9FA] rounded-lg p-4 border border-[#052759]/20 relative group">

                                        {notificacoes.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removerNotificacao(notif.id)}
                                                className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        )}

                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <div className="flex max-h-60 items-center border border-[#052759] rounded-lg bg-white overflow-hidden">
                                                    <select
                                                        name={`quantidade-${notif.id}`}
                                                        className="w-full px-4 py-2.5 text-sm text-[#052759] focus:outline-none font-medium bg-white appearance-none cursor-pointer"
                                                        value={notif.quantidade}
                                                        onChange={(e) => atualizarNotificacao(notif.id, 'quantidade', e.target.value)}
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                    </select>
                                                    <div className="pr-3 pointer-events-none">
                                                        <div className="w-1.5 h-1.5 border-r border-b border-[#052759] rotate-45"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-center border border-[#052759] rounded-lg bg-white overflow-hidden">
                                                    <span className="w-full px-4 py-2.5 text-sm text-[#052759] font-medium text-center">
                                                        dias
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#052759]/20">
                                <Button
                                    onChange={enviarFormulario}
                                    type="submit"
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto w-full py-4"
                                >
                                    Agendar Notificações
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>

                <img
                    src="/img-cadastro.png"
                    alt="Cachorrinho"
                    className="absolute bottom-0 left-0 w-40 max-h-32 object-contain pointer-events-none"
                />
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #052759;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #FCAD0B;
                }
            `}</style>
        </div>
    );
}