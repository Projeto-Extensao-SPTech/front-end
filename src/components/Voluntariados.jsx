import React, { useState } from 'react'
import { Link } from 'react-scroll'

export default function Voluntariados(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        cpf: '',
        message: ''
    })

  

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((s) => ({ ...s, [name]: value }))
    }

    return (
        <section id="voluntariados" className="px-4 py-8 w-120 mx-auto">
            <h1 className="text-4xl font-black mb-6 flex justify-center  text-[#052759]">Cadastro de Voluntários</h1>
            <h2 className="text-2xl font-bold mb-6 flex justify-center ">Faça parte de uma causa muito importante  e ajude um “aumigo” a encontrar um lar!</h2>

            <div className="grid lg:grid-cols-2 gap-10 mb-16">
                <form className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-xl font-bold text-[#052759] mb-6 flex justify-start">
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
                                className="w-5/12 pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-blue-900 focus:outline-none placeholder-[#052759]"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-5/12  pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-blue-900 focus:outline-none placeholder-[#052759]"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="tel"
                                name="whatsapp"
                                placeholder="Whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                className="w-5/12 pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-blue-900 focus:outline-none placeholder-[#052759]"
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                value={formData.cpf}
                                onChange={handleInputChange}
                                className="w-5/12 pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-blue-900 focus:outline-none placeholder-[#052759]"
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                name="message"
                                placeholder="Enviar mensagem (opcional):"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-5/12 pl-4 pr-4 py-3 border-2 border-[#052759] rounded-lg focus:border-blue-900 focus:outline-none resize-none placeholder-[#052759]"
                            />
                        </div>

                        <div className="w-5/12 rounded-lg p-4 border-2 border-[#052759] text-[#052759]">
                            <p className='mb-4'>Qual data você tem disponibilidade para ser voluntário na ONG?</p>
                            <input
                                type="date"
                                name="calendar"
                                placeholder='DD/MM/YY'
                                className='w-full pl-4 pr-4 py-3 border-2 border-[#052759] text-[#052759] rounded-lg focus:border-blue-900 focus:outline-none resize-none placeholder-[#052759]'
                                 />
                        </div>

                        <button
                            type="submit"
                            className="w-5/12 bg-[#052759] text-xl text-white font-bold py-4 rounded-lg hover:bg-[#023582] transition-colors"
                        >
                            Enviar formulário
                        </button>

                        
                    </div>
              

                <div className="flex items-center justify-center">
                    <div className="text-center">            
                        <p className="text-sm text-gray-600 text-center mt-4">
                            Ao clicar em Enviar Formulário, você concorda em receber notificações e alertas no seu WhatsApp do número informado.
                        </p>
                    </div>
                </div>
                  </form>
            </div>
            
        </section>
    )
}