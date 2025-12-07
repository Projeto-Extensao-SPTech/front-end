import { useEffect, useState } from "react"
import { api } from "../../api/apiUserService"

export function Notificacoes({ onClose }) {
    const [notificacoes, setNotificacoes] = useState([])
    const [erro, setErro] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        buscar()
    }, [])

    async function buscar() {
        try {
            const res = await api.get("/notifications")
            const notificacoesOrdenadas = [...res.data].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setNotificacoes(notificacoesOrdenadas)
        } catch (e) {
            console.error(e)
            setErro(true)
        } finally {
            setLoading(false)
        }
    }

    function toSubject(type) {
        switch (type) {
            case 'FAIR':
                return 'Feira de adoção se aproximando'
            case 'DONATION':
                return 'Precisamos de doações'
            case 'VOLUNTEER':
                return 'Precisamos de voluntários'
            default:
                return 'Notificação'
        }
    }

    return (
        <div className="bg-white w-[400px] max-w-full max-h-[60vh] rounded-2xl shadow-2xl border overflow-y-auto animate-fadeIn">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-3xl font-extrabold text-[#052759]">Notificações</h2>
                <button
                    onClick={onClose}
                    className="text-[#052759] hover:text-red-500 text-2xl font-bold"
                >
                    ×
                </button>
            </div>

            <div className="p-4 space-y-4 max-h-80">
                {loading ? (
                    <p className="text-center text-gray-500">Carregando...</p>
                ) : erro ? (
                    <p className="text-center text-red-600">
                        Erro ao carregar notificações. Tente novamente.
                    </p>

                ) : notificacoes.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No momento não há notificações para exibir.
                    </p>

                ) : (
                    notificacoes.map((n) => (
                        <div
                            key={n.id}
                            className="bg-gray-50 border rounded-xl p-4 flex gap-4 
                                       items-center hover:bg-gray-100 transition"
                        >
                            <div>
                                <h4 className="font-bold text-[#052759]">
                                    {toSubject(n.type)}
                                </h4>
                                <p className="text-sm text-gray-700">{n.message}</p>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}