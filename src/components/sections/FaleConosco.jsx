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
        <div className="flex items-center justify-center bg-[#052759] py-12 w-full">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 px-8 items-center">

                <div className="lg:w-3/5 bg-[#EFEFEF] rounded-2xl p-6 shadow-2xl">
                    <h2 className="text-2xl font-black text-[#052759] mb-4 text-center">
                        Fale Conosco
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="nome" className="block text-[#052759] font-bold mb-1 text-sm">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Seu nome completo"
                                className="w-full px-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-[#052759] font-bold mb-1 text-sm">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                className="w-full px-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="mensagem" className="block text-[#052759] font-bold mb-1 text-sm">
                                Mensagem
                            </label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                value={formData.mensagem}
                                onChange={handleChange}
                                placeholder="Deixe sua mensagem..."
                                rows="4"
                                className="w-full px-3 py-2 text-sm border-2 border-[#052759] rounded-lg focus:border-[#FCAD0B] focus:outline-none placeholder-gray-400 resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#052759] text-white font-bold py-2.5 rounded-lg hover:bg-[#023582] transition-colors text-base"
                        >
                            Enviar Mensagem
                        </button>
                    </form>
                </div>

                <div className="lg:w-2/5 flex flex-col items-center justify-center text-center space-y-6">
                    <h3 className="text-2xl font-bold text-white">ou nos encontre em...</h3>

                    <div className="flex gap-8 justify-center items-center">
                        <a
                            href="https://instagram.com/abrigodogfeliz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                        >
                            <img 
                                src="/img-ig.png" 
                                alt="Instagram" 
                                className="w-36 h-36 object-contain" 
                            />
                            <span className="text-white font-bold text-lg">Instagram</span>
                        </a>

                        <a
                            href="https://wa.me/5511999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 hover:scale-110 transition-transform"
                        >
                            <img 
                                src="/img-wpp.png" 
                                alt="WhatsApp" 
                                className="w-36 h-36 object-contain" 
                            />
                            <span className="text-white font-bold text-lg">WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}