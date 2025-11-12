import Button from '../ui/Button'
import { Link } from 'react-scroll'

export default function Participar() {
    return (
        <div className="relative bg-gradient-to-br from-[#052759] via-[#0d3a7a] to-[#052759] py-16 lg:py-24 overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FCAD0B] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    
                    <div className="group relative bg-white rounded-2xl p-5 shadow-xl hover:shadow-[#FCAD0B]/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FCAD0B]/10 to-transparent rounded-tr-2xl"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#FCAD0B] to-[#f8b83d] rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <img src="/img-participar-1.png" alt="Adotar" className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#052759] mb-2 group-hover:text-[#FCAD0B] transition-colors">
                                Adote
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Dê um lar definitivo e ganhe um companheiro para vida toda.
                            </p>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-5 shadow-xl hover:shadow-[#052759]/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#052759]/10 to-transparent rounded-tr-2xl"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#052759] to-[#0d3a7a] rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <img src="/img-participar-1.png" alt="Apadrinhar" className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#052759] mb-2 group-hover:text-[#0d3a7a] transition-colors">
                                Patrocine
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Ajude financeiramente um animal até ele encontrar um lar.
                            </p>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-5 shadow-xl hover:shadow-[#FCAD0B]/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FCAD0B]/10 to-transparent rounded-tr-2xl"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#FCAD0B] to-[#f8b83d] rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <img src="/img-participar-2.png" alt="Doar" className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#052759] mb-2 group-hover:text-[#FCAD0B] transition-colors">
                                Doe
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Ração, medicamentos, brinquedos ou recursos financeiros.
                            </p>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-2xl p-5 shadow-xl hover:shadow-[#052759]/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#052759]/10 to-transparent rounded-tr-2xl"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#052759] to-[#0d3a7a] rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <img src="/img-participar-3.png" alt="Compartilhar" className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-[#052759] mb-2 group-hover:text-[#0d3a7a] transition-colors">
                                Divulgue
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Compartilhe nas redes e ajude a aumentar nosso alcance.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="text-center mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                        FAÇA PARTE DA MUDANÇA
                    </h1>
                    <p className="text-white/90 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Dezenas de animais esperam por uma chance. Sua ajuda pode transformar vidas através de 
                        <span className="font-bold text-[#FCAD0B]"> doações</span>, 
                        <span className="font-bold text-[#FCAD0B]"> voluntariado</span> ou 
                        <span className="font-bold text-[#FCAD0B]"> adoção</span>.
                    </p>
                </div>

                <div className="relative bg-gradient-to-r from-white via-white to-gray-50 rounded-2xl p-6 lg:p-8 shadow-xl overflow-hidden">

                    <div className="absolute right-6 bottom-0 w-48 lg:w-56 opacity-100">
                        <img 
                            src="/img-adotar.png" 
                            alt="Cachorro feliz" 
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    
                    <div className="relative z-10 max-w-lg">
                        <h2 className="text-2xl lg:text-3xl font-black text-[#052759] mb-3 leading-tight">
                            Pronto para fazer a diferença?
                        </h2>
                        <p className="text-gray-700 text-base mb-6 leading-relaxed">
                            Junte-se a centenas de voluntários que já transformam vidas. 
                            Cada pequena ação conta.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link to="voluntariado" spy={true} smooth={true} duration={800}>
                                <Button
                                    className="shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)] bg-[#FCAD0B] hover:bg-[#052759] hover:[#052759] text-sm mx-auto"
                                >
                                    Quero participar!
                                </Button>
                            </Link>
                            
                            <button className="group relative overflow-hidden bg-white hover:bg-gray-50 text-[#052759] font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-2 border-[#052759]">
                                <span className="relative z-10 flex items-center gap-2">
                                    Saiba Mais
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}