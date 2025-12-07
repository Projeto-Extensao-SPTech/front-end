import { useState, useEffect, useRef } from 'react'
import { api } from "../../api/apiUserService"
import { handleHttpFeedback } from '../../js/utils/handleHttpFeedback'
import { useAlertUtils } from '../../hooks/useAlertUtils'

function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [threshold])

    return [ref, isVisible]
}

export default function FaleConosco() {
    const [titleRef, titleVisible] = useScrollReveal(0.1)
    const [formRef, formVisible] = useScrollReveal(0.1)
    const [socialRef, socialVisible] = useScrollReveal(0.1)

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    })

    const alert = useAlertUtils()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Dados do formulário:', formData)

        alert.loading("Enviando sua mensagem", "Não saia da página ou recarregue a sessão!")
        try {
            const result = await api.post(`/mails/gmail/default`, {
                subject: "Novo contato recebido pelo site!",
                content: `
                Olá! Você recebeu uma nova mensagem através do formulário de contato.

                Nome: ${formData.nome}
                E-mail: ${formData.email}

                Mensagem:
                ${formData.mensagem}

                Caso queira responder, é só retornar para o e-mail informado acima.
                `
            })

            alert.close()
            handleHttpFeedback(alert, result, {
                successTitle: "Mensagem enviada!",
                successMessage:
                    "A sua mensagem foi enviada e em breve será analisada pela nossa equipe"
            });
        } catch (error) {
            console.error("Erro ao enviar:", error);

            alert.close()
            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro ao enviar mensagem",
                errorMessage: error.response?.data?.message || "Não foi possível enviar a sua mensagem, aguarde alguns segundos e tente novamente"
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="relative bg-gradient-to-br from-[#052759] via-[#0d3a7a] to-[#052759] py-6 lg:py-8 overflow-hidden">

            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#FCAD0B] rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 lg:px-8 relative z-10">

                <div 
                    ref={titleRef}
                    className={`text-center mb-4 transition-all duration-700 ${
                        titleVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-8'
                    }`}
                >
                    <h2 className="text-xl lg:text-2xl font-black text-white mb-1 leading-tight">
                        Fale Conosco
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 items-start">

                    <div 
                        ref={formRef}
                        className={`bg-white rounded-xl p-4 shadow-2xl transition-all duration-700 ${
                            formVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-12'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#FCAD0B] to-[#f8b83d] rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#052759]">Envie uma mensagem</h3>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div>
                                <label htmlFor="nome" className="block text-[#052759] font-bold mb-1 text-xs">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    placeholder="Como devemos te chamar?"
                                    className="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[#052759] font-bold mb-1 text-xs">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="valeria@exemplo.com"
                                    className="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="mensagem" className="block text-[#052759] font-bold mb-1 text-xs">
                                    Sua Mensagem
                                </label>
                                <textarea
                                    id="mensagem"
                                    name="mensagem"
                                    value={formData.mensagem}
                                    onChange={handleChange}
                                    placeholder="Escreva sua mensagem aqui..."
                                    rows="2"
                                    className="w-full px-3 py-2 text-xs border-2 border-gray-200 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400 resize-none transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#FCAD0B] to-[#f8b83d] hover:from-[#f8b83d] hover:to-[#FCAD0B] text-white font-bold py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-xs flex items-center justify-center gap-2 group"
                            >
                                Enviar Mensagem
                                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    <div 
                        ref={socialRef}
                        className={`space-y-3 transition-all duration-700 ${
                            socialVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-12'
                        }`}
                    >

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-gradient-to-b from-[#FCAD0B] to-[#f8b83d] rounded-full"></span>
                                Conecte-se
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="https://instagram.com/abrigodogfeliz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-[#052759] rounded-lg p-3 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <img
                                        src="/img-ig.png"
                                        alt="Instagram"
                                        className="w-22 h-16 mx-auto mb-1 group-hover:scale-110 transition-transform"
                                    />
                                    <p className="text-center font-bold text-white group-hover:text-white transition-colors text-sm">
                                        Instagram
                                    </p>
                                </a>

                                <a
                                    href="https://wa.me/5511999999999"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-[#052759] rounded-lg p-3 hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <img
                                        src="/img-wpp.png"
                                        alt="WhatsApp"
                                        className="w-22 h-16 mx-auto mb-1 group-hover:scale-110 transition-transform"
                                    />
                                    <p className="text-center font-bold text-white group-hover:text-white transition-colors text-sm">
                                        WhatsApp
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#FCAD0B] to-[#f8b83d] rounded-lg flex items-center justify-center shadow-lg mb-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-0.5">E-mail</h4>
                                    <p className="text-white/70 text-[12px]">abrigodogfeliz@outlook.com</p>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#052759] to-[#0d3a7a] rounded-lg flex items-center justify-center shadow-lg mb-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-white font-bold text-sm mb-0.5">Local</h4>
                                    <p className="text-white/70 text-[12px]">Mauá - SP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}