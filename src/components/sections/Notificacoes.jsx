import { useEffect, useState } from "react"
import { api } from "../../api/apiUserService"

export function Notificacoes({ onClose }) {
    const [notificacoes, setNotificacoes] = useState([])
    const [erro, setErro] = useState(false)
    const [loading, setLoading] = useState(true)
    const [toggleNotification, setToggleNotification] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        buscarNotificacoes()
        const userData = JSON.parse(sessionStorage.getItem("USER_DATA"))
        setUser(userData)
        setToggleNotification(userData.receive_notification)
    }, [])

    async function alterarNotificacaoToggle() {
        try {
            await api.patch(`users/notification/${user.id}/${!toggleNotification}`)
            setToggleNotification(!toggleNotification)
            updateUserData("receive_notification", !toggleNotification)
        } catch (e) {
            console.error(e)
            setErro(true)
        } finally {
            setLoading(false)
        }
    }

    async function buscarNotificacoes() {
        try {
            const notificationRes = await api.get("/notifications")
            const notificacoesOrdenadas = [...notificationRes.data].sort(
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

    function updateUserData(key, value) {
        const updatedUserData = [{ ...user, [key]: value }]
        sessionStorage.setItem("USER_DATA", JSON.stringify(updatedUserData))
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

            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-start">
                    <span className="font-medium text-[#052759]">
                        Envio de notificações via e-mail
                    </span>

                    <button
                        onClick={alterarNotificacaoToggle}
                        className={`
                        ml-3 w-12 h-6 flex items-center rounded-full p-1 transition
                        ${toggleNotification ? "bg-green-500" : "bg-gray-400"}
                        `}
                    >
                        <div
                            className={`
                            bg-white w-5 h-5 rounded-full shadow-md transform transition
                            ${toggleNotification ? "translate-x-5" : ""}
                            `}
                        />
                    </button>
                </div>
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
                            items-center hover:bg-gray-100 transition-colors"
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