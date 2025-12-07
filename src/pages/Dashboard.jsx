import React from "react";
import ChartCadastros from "./ChartCadastrosMensais";
import { BarChart3, Calendar, MapPin, Users } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">

                <div className="max-w-6xl mx-auto mb-3">
                    <h1
                        className="text-xl md:text-2xl font-bold text-[#052759] tracking-tight"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Painel de Administração
                    </h1>
                    <p className="text-gray-500 text-xs">Métricas e insights importantes</p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">

                    <div className="bg-gradient-to-r from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-4 relative overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-300 animate-[fadeIn_0.6s_ease-out]">

                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-4 shadow-md border border-blue-100/20 relative z-10 flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-lg">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Cadastros Mensais
                                </p>
                                <p className="text-gray-500 text-xs">Análise do crescimento anual</p>
                            </div>
                        </div>

                        <div className="h-52 pt-2 pb-4 relative">
                            <ChartCadastros />
                        </div>
                        
                        <img
                            className="absolute bottom-[-20px] right-[-8px] h-40 w-auto object-contain drop-shadow-lg opacity-80 hover:opacity-100 transition-all duration-300 pointer-events-none"
                            src="img-dog2-dash.png"
                            alt="Ilustração"
                        />
                    </div>

                    <div className="flex flex-col gap-3">

                        <div className="bg-gradient-to-br from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-[slideInRight_0.6s_ease-out_0.1s_both] relative overflow-hidden group">

                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-2 shadow-sm relative flex items-center gap-2">
                                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-1.5 rounded-lg">
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Mês com Maior Interesse
                                    </p>
                                    <p className="text-gray-500 text-xs">Período de maior procura</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center relative min-h-[64px]">
                                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full px-4 py-1.5 shadow-lg">
                                    <p className="font-bold text-base text-white drop-shadow-md">
                                        Outubro
                                    </p>
                                </div>
                                <img className="absolute bottom-[-12px] right-[-12px] w-20 h-20 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300" src="img-dog-dash.png" alt="Ilustração" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-[slideInRight_0.6s_ease-out_0.2s_both] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-2 shadow-sm relative flex items-center gap-2">
                                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-1.5 rounded-lg">
                                    <MapPin className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Local com Maior Interesse
                                    </p>
                                    <p className="text-gray-500 text-xs">Área mais requisitada</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center relative min-h-[64px] pb-0">
                                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full px-4 py-1.5 shadow-lg z-10">
                                    <p className="font-bold text-base text-white drop-shadow-md">
                                        São Bernardo
                                    </p>
                                </div>
                                <img className="absolute bottom-[-16px] right-[-16px] w-16 h-20 object-contain object-bottom drop-shadow-lg group-hover:scale-110 transition-transform duration-300" src="img-cat-dash.png" alt="Ilustração" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-[slideInRight_0.6s_ease-out_0.3s_both] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-2 shadow-sm relative flex items-center gap-2">
                                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-1.5 rounded-lg">
                                    <Users className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Dia com Maior Movimentação
                                    </p>
                                    <p className="text-gray-500 text-xs">Pico de voluntários</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center relative min-h-[64px] pb-0">
                                <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-4 py-1.5 shadow-lg z-10">
                                    <p className="font-bold text-base text-white drop-shadow-md">
                                        Sexta-feira
                                    </p>
                                </div>
                                <img className="absolute bottom-[-16px] right-[-16px] w-16 h-20 object-contain object-bottom drop-shadow-lg group-hover:scale-110 transition-transform duration-300" src="img-voluntario-dash.png" alt="Ilustração" />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}