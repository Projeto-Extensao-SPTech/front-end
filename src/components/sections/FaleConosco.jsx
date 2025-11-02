import { useState } from 'react'

export default function FaleConosco() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Dados do formulário:', formData)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="flex items-center justify-center bg-[#052759] py-8 w-full">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6 px-6 items-center">

                <div className="lg:w-3/5 bg-[#EFEFEF] rounded-xl p-5 shadow-xl">
                    <h2 className="text-xl font-black text-[#052759] mb-3 text-center">
                        Fale Conosco
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="nome" className="block text-[#052759] font-bold mb-1 text-xs">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Seu nome completo"
                                className="w-full px-3 py-2 text-xs border-2 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400"
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
                                placeholder="seu@email.com"
                                className="w-full px-3 py-2 text-xs border-2 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="mensagem" className="block text-[#052759] font-bold mb-1 text-xs">
                                Mensagem
                            </label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                value={formData.mensagem}
                                onChange={handleChange}
                                placeholder="Deixe sua mensagem..."
                                rows="3"
                                className="w-full px-3 py-2 text-xs border-2 rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400 resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#052759] text-white font-bold py-2 rounded-lg hover:bg-[#023582] transition-colors text-sm"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

                <div className="lg:w-2/5 flex flex-col items-center justify-center text-center space-y-4">
                    <h3 className="text-xl font-bold text-white">ou nos encontre em...</h3>

                    <div className="flex gap-6 justify-center items-center">
                        <a
                            href="https://instagram.com/abrigodogfeliz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                        >
                            <img 
                                src="/img-ig.png" 
                                alt="Instagram" 
                                className="w-28 h-28 object-contain" 
                            />
                            <span className="text-white font-bold text-base">Instagram</span>
                        </a>

                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                        >
                            <img 
                                src="/img-wpp.png" 
                                alt="WhatsApp" 
                                className="w-28 h-28 object-contain" 
                            />
                            <span className="text-white font-bold text-base">WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}