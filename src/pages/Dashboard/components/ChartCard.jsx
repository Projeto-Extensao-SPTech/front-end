import ChartCadastrosMensais from "./ChartCadastrosMensais";
import { BarChart3 } from "lucide-react";

export default function ChartCard() {
    return (
        <div className="bg-gradient-to-r from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-4 shadow-md border border-blue-100/20 flex items-center gap-2 relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p
                        className="font-bold text-[#052759]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Cadastros Mensais
                    </p>
                    <p className="text-gray-500 text-xs">Análise do crescimento anual</p>
                </div>
            </div>

            <div className="h-52 pt-2 pb-4 relative z-10">
                <ChartCadastrosMensais />
            </div>

            <img
                className="absolute bottom-[-20px] right-[-8px] h-40 opacity-80 pointer-events-none"
                src="img-dog2-dash.png"
                alt="Ilustração"
            />
        </div>
    );
}
