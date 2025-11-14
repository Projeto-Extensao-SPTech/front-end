import { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import { FaCalendarAlt, FaBell, FaEnvelope, FaClock, FaPlus, FaTrash } from 'react-icons/fa';
import Button from '../components/ui/Button'

export default function CadastroNotificacao() {
    const [form, setForm] = useState({
        tipo: 'feira-adocao',
        data: '',
        mensagem: ''
    });

    const [notificacoes, setNotificacoes] = useState([
        { id: 1, quantidade: '1', unidade: 'dias' }
    ]);

    useEffect(() => {
        const calendario = flatpickr("#data-evento", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (datas) => {
                const dataFormatada = datas.length > 0 ? flatpickr.formatDate(datas[0], "d/m/Y") : '';
                setForm(prev => ({ ...prev, data: dataFormatada }));
            },
        });

        return () => calendario.destroy();
    }, []);

    const atualizarForm = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const atualizarNotificacao = (id, campo, valor) => {
        setNotificacoes(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, [campo]: valor } : notif
            )
        );
    };

    const adicionarNotificacao = () => {
        const novoId = Math.max(...notificacoes.map(n => n.id), 0) + 1;
        setNotificacoes(prev => [...prev, { id: novoId, quantidade: '1', unidade: 'dias' }]);
    };

    const removerNotificacao = (id) => {
        if (notificacoes.length > 1) {
            setNotificacoes(prev => prev.filter(notif => notif.id !== id));
        }
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const dados = {
            ...form,
            notificacoes: notificacoes
        };

        console.log('Dados para enviar:', dados);
    };

    const SelectComIcone = ({ icone: Icone, nome, opcoes, valor, onChange }) => (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden relative">
            <span className="p-3 text-[#052759]">
                <Icone className="text-lg" />
            </span>
            <select
                name={nome}
                className="w-full pr-10 py-3 text-sm text-[#052759] focus:outline-none font-medium pl-3 bg-white appearance-none cursor-pointer"
                value={valor}
                onChange={onChange}
            >
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
    );

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

            <div className="w-11/12 max-w-4xl bg-[#052759] p-8 rounded-xl shadow-lg relative">

                <form onSubmit={enviarFormulario} className="grid lg:grid-cols-2 gap-6">

                    <div className="space-y-4">

                        <SelectComIcone
                            icone={FaBell}
                            nome="tipo"
                            valor={form.tipo}
                            onChange={atualizarForm}
                            opcoes={[
                                { value: 'feira-adocao', label: 'Feira de Adoção' },
                                { value: 'evento-especial', label: 'Evento Especial' }
                            ]}
                        />

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

                        <div className="flex items-start border-2 border-[#052759] rounded-lg bg-white min-h-[200px]">
                            <span className="p-3 text-[#052759] self-start">
                                <FaEnvelope className="text-lg" />
                            </span>
                            <textarea
                                name="mensagem"
                                placeholder="Mensagem (opcional)..."
                                className="w-full pr-3 py-3 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white resize-none"
                                value={form.mensagem}
                                onChange={atualizarForm}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">

                        <div className="bg-white rounded-xl p-4 border-2 border-[#052759]">

                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[#052759] font-bold flex items-center gap-2">
                                    <FaClock className="text-[#FCAD0B]" />
                                    Agendar Notificações
                                </h3>
                                <button
                                    type="button"
                                    onClick={adicionarNotificacao}
                                    className="flex items-center gap-2 bg-[#FCAD0B] text-[#052759] px-3 py-2 rounded-lg hover:bg-[#FFD166] transition-colors font-bold text-sm"
                                >
                                    <FaPlus className="text-xs" />
                                    Adicionar
                                </button>
                            </div>

                            <p className="text-xs text-[#525252] mb-3">Enviada com antecedência de: </p>

                            <div className="space-y-3">
                                {notificacoes.map((notif) => (
                                    <div key={notif.id} className="bg-[#F8F9FA] rounded-lg p-3 border border-[#052759]/20 relative group">

                                        {notificacoes.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removerNotificacao(notif.id)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        )}

                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <div className="flex items-center border border-[#052759] rounded-lg bg-white overflow-hidden">
                                                    <select
                                                        name={`quantidade-${notif.id}`}
                                                        className="w-full px-3 py-2 text-sm text-[#052759] focus:outline-none font-medium bg-white appearance-none cursor-pointer"
                                                        value={notif.quantidade}
                                                        onChange={(e) => atualizarNotificacao(notif.id, 'quantidade', e.target.value)}
                                                    >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="5">5</option>
                                                        <option value="7">7</option>
                                                    </select>
                                                    <div className="pr-2 pointer-events-none">
                                                        <div className="w-1.5 h-1.5 border-r border-b border-[#052759] rotate-45"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center border border-[#052759] rounded-lg bg-white overflow-hidden">
                                                    <select
                                                        name={`unidade-${notif.id}`}
                                                        className="w-full px-3 py-2 text-sm text-[#052759] focus:outline-none font-medium bg-white appearance-none cursor-pointer"
                                                        value={notif.unidade}
                                                        onChange={(e) => atualizarNotificacao(notif.id, 'unidade', e.target.value)}
                                                    >
                                                        <option value="horas">horas</option>
                                                        <option value="dias">dias</option>
                                                        <option value="semanas">semanas</option>
                                                        <option value="meses">meses</option>
                                                    </select>
                                                    <div className="pr-2 pointer-events-none">
                                                        <div className="w-1.5 h-1.5 border-r border-b border-[#052759] rotate-45"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto w-full py-3"
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
                    className="absolute bottom-0 left-0 w-32 max-h-28 object-contain pointer-events-none"
                />
            </div>
        </div>
    );
}