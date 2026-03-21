import { FaClock, FaPlus, FaTrash } from "react-icons/fa";
import Button from "../../../components/ui/Button";

export default function AgendadorNotificacoes({
    form,
    datasAgendadas,
    notificacoes,
    onAdicionar,
    onRemover,
    onAtualizar,
}) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-[#052759] h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#052759] font-bold flex items-center gap-2 text-lg">
                        <FaClock className="text-[#FCAD0B] text-xl" />
                        Agendar as notificações
                    </h3>
                    <button
                        type="button"
                        onClick={onAdicionar}
                        className="flex items-center gap-2 bg-[#FCAD0B] text-[#052759] px-4 py-2.5 rounded-lg hover:bg-[#FFD166] transition-colors font-bold text-sm"
                    >
                        <FaPlus className="text-sm" />
                        Adicionar nova notificação
                    </button>
                </div>

                <p className="text-sm text-[#525252] mb-4">
                    Enviar lembretes quantos dias antes do evento?
                </p>

                <div className="flex-1 overflow-y-auto max-h-32 pr-3 space-y-4 custom-scrollbar">
                    {notificacoes.map((notif) => (
                        <div
                            key={notif.id}
                            className="bg-[#F8F9FA] rounded-lg p-4 border border-[#052759]/20 relative group"
                        >
                            {notificacoes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemover(notif.id)}
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
                                            onChange={(e) =>
                                                onAtualizar(notif.id, "quantidade", e.target.value)
                                            }
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 14, 21, 30].map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pr-3 pointer-events-none">
                                            <div className="w-1.5 h-1.5 border-r border-b border-[#052759] rotate-45"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-center border border-[#052759] rounded-lg bg-white overflow-hidden">
                                        <span className="w-full px-4 py-2.5 text-sm text-[#052759] font-medium text-center">
                                            dias antes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {form.data && datasAgendadas.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-[#052759]/20">
                        <p className="text-sm font-medium text-[#052759] mb-2">
                            Notificações agendadas:
                        </p>
                        <div className="space-y-1">
                            {datasAgendadas.map((item, index) => (
                                <p key={index} className="text-xs text-gray-600">
                                    • {item.data} ({item.diasAntes} {item.diasAntes === 1 ? "dia antes" : "dias antes"} do evento)
                                </p>
                            ))}
                            <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                                Data do evento: {form.data}
                            </p>
                        </div>
                    </div>
                )}

                {!form.data && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-[#052759]/20">
                        <p className="text-xs text-gray-500 italic">
                            Selecione uma data do evento para visualizar os lembretes agendados
                        </p>
                    </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#052759]/20">
                    <Button
                        type="submit"
                        className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto w-full py-4"
                    >
                        Agendar notificações
                    </Button>
                </div>
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
          background: #fcad0b;
        }
      `}</style>
        </div>
    );
}
