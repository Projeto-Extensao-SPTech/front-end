import React, { useState } from 'react'
import { Link } from 'react-scroll'

export default function Voluntariados(props) {
    // Estado do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        cpf: '',
        message: ''
    })

    // Estado simples para calendário (mês de 0 a 11)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((s) => ({ ...s, [name]: value }))
    }

    const handleSubmit = (e) => {
        e?.preventDefault()
        console.log('Enviar voluntariado:', formData)
        // aqui você pode chamar API ou mostrar toast
        alert('Formulário enviado (simulação). Veja console para dados.')
    }

    return (
        <section id="voluntariados" className="px-4 py-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex justify-center">Cadastro de Voluntários</h1>
            <h2 className="text-1xl font-bold mb-6 flex justify-center">Faça parte de uma causa muito importante  e ajude um “aumigo” a encontrar um lar!</h2>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
                <form className="bg-white rounded-2xl shadow-lg p-8" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Venha fazer um dog feliz conosco!
                    </h2>

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="tel"
                                name="whatsapp"
                                placeholder="Whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none"
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                name="message"
                                placeholder="Enviar mensagem (opcional):"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none resize-none"
                            />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
                            <p className='mb-4'>Data de disponibilidade</p>
                            <input
                                type="date"
                                name="calendar"
                                placeholder='DD/MM/YY'
                                className='w-full pl-4 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-900 focus:outline-none resize-none'
                                 />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                            Enviar formulário
                        </button>

                        <p className="text-xs text-gray-600 text-center">
                            Ao clicar em Enviar Formulário, você concorda em receber notificações e alertas no seu WhatsApp do número informado.
                        </p>
                    </div>
                </form>

                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <p className="mb-4">Informações sobre os locais e horários disponíveis.</p>
                        <button
                            onClick={() => (props?.onNavigateToHome ? props.onNavigateToHome() : window.scrollTo({ top: 0, behavior: 'smooth' }))}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}