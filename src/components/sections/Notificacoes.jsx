import { useState, useEffect } from "react";
import { api } from '../../api/apiUserService';
import { handleHttpFeedback } from "../../js/utils/handleHttpFeedback";

export function Notificacoes() {
    const [notificacoes, setNotificacoes] = useState([])
    const [erroNotificacao, setErroNotificacao] = useState(false)

    useEffect(buscarNotificacoes, [])

    async function buscarNotificacoes() {
        try {
            const result = await api.get(``)
            const data = result.data
            console.log("Notificações coletadas: ", data)
            setNotificacoes(data)
        } catch (error) {
            console.error("Erro ao coletar notificações:", error);
            setErroNotificacao(true)
        }
    }

    function Notificacao(type, message) {
        return <div>
            <div>
                <h3 className="">{toSubject(type)}</h3>
                <p className="">{message}</p>
            </div>
        </div>
    }

    function toSubject(type) {
        switch(type) {
            case "FAIR":
                return "Feira de adoção se aproximando"
            case "DONATION":
                return "Precisando de doações"
            case "VOLUNTEER":
                return "Precisamos de voluntários"
            default:
                return "Abrigo Dog Feliz quer falar com você"
        }
    }

    return <>
        
    </>
}