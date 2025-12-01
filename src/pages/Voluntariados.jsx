import { useState, useEffect } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import { FaRegUser, FaEnvelope, FaWhatsapp, FaIdCard, FaPaw, FaCalendarAlt } from 'react-icons/fa'
import Button from '../components/ui/Button'
import { api } from '../api/apiUserService'

export default function Voluntariados() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        cpf: '',
        message: '',
        calendario: ''
    })

    useEffect(() => {
        const token = sessionStorage.getItem("USER_DATA")

        if (token) {
            const jsonData = JSON.parse(token)

             setFormData(prev => ({
            ...prev,
            name: jsonData?.name || '',
            email: jsonData?.email || '',
            cpf: jsonData?.cpf || '',
            whatsapp: jsonData?.whatsapp || ''
        }));
    }
}, []);

    useEffect(() => {
        const fp = flatpickr("#calendario", {
            locale: Portuguese,
            dateFormat: "d/m/Y",
            minDate: "today",
            disableMobile: true,
            onChange: (dates) => {
                const dataFormatada = dates.length > 0 ? flatpickr.formatDate(dates[0], "d/m/Y") : ''
                setFormData(prev => ({ ...prev, calendario: dataFormatada }))
            }
        })
        return () => fp.destroy()
    }, [])

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const InputComIcone = ({ icon: Icon, name, placeholder, type = "text" }) => (
        <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white overflow-hidden">
            <span className="p-3 text-[#052759]">
                <Icon className="text-lg" />
            </span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="w-full pr-3 py-2 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                value={formData[name]}
                onChange={handleChange}
            />
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Voluntário cadastrado:", formData)
    }

    return (
        <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center py-8">

            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-[#052759] mb-2">Quero ser Voluntário</h1>
                <p className="text-[#052759] text-sm">Faça parte de uma causa muito importante  e ajude um "aumigo" a encontrar um lar!</p>
            </div>

            <div className="w-11/12 max-w-5xl bg-[#052759] p-6 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8 relative">

                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputComIcone icon={FaRegUser} name="name" placeholder="Nome completo:" />
                    <InputComIcone icon={FaEnvelope} name="email" placeholder="E-mail:" type="email" />
                    <InputComIcone icon={FaWhatsapp} name="whatsapp" placeholder="WhatsApp (com DDD):" />
                    <InputComIcone icon={FaIdCard} name="cpf" placeholder="CPF:" />

                    <div className="flex items-start border-2 border-[#052759] rounded-lg bg-white">
                        <span className="p-3 text-[#052759]">
                            <FaPaw className="text-lg" />
                        </span>
                        <textarea
                            name="message"
                            placeholder="Mensagem (opcional):"
                            rows="3"
                            className="w-full pr-3 py-2 text-sm text-[#052759] resize-none focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center border-2 border-[#052759] rounded-lg bg-white">
                        <span className="p-3 text-[#052759]">
                            <FaCalendarAlt className="text-lg" />
                        </span>
                        <input
                            id="calendario"
                            type="text"
                            name="calendario"
                            placeholder="Disponibilidade:"
                            className="w-full pr-3 py-2 text-sm text-[#052759] focus:outline-none placeholder-[#052759] font-medium pl-3 bg-white cursor-pointer"
                            value={formData.calendario}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <Button className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] text-sm w-full py-3">
                        Tenho interesse
                    </Button>

                    <p className="text-xs text-white opacity-90 text-center">
                        Ao enviar, você concorda em receber notificações via WhatsApp e E-mail.
                    </p>
                </form>

                <div className="bg-[#052759] rounded-2xl p-6 border-2 border-[#052759] flex flex-col justify-center relative">

                    <img
                        src="/img-voluntariar.png"
                        className="w-32 h-auto mx-auto"
                        alt="Voluntário"
                    />

                    <div className="text-center space-y-3">

                        <div className="inline-block bg-[#FCAD0B] px-3 py-1 rounded-full shadow-md">
                            <span className="text-[#052759] font-bold text-xs">Por que me voluntariar?</span>
                        </div>

                        <h2 className="text-xl font-black text-white">Transforme vidas!</h2>

                        <p className="text-sm text-white leading-relaxed">
                            Ser voluntário é transformar compaixão em ação. 
                        </p>
                        <p className="text-sm text-white leading-relaxed">
                            Cada carinho, passeio ou cuidado
                            restaura a confiança de um animal que espera por um lar.
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <p className="text-xs italic text-white">
                                "É um ato que salva vidas — tanto as deles quanto a sua."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}