import { usePatrocinadores } from "../../contexts/PatrocinadoresContext";

export function Indicador({ className = "" }) {
    const { telaAtual } = usePatrocinadores();

    const steps = [
        { key: "apoio", label: "Onde deseja apoiar" },
        { key: "info", label: "Preencha suas informações" },
        { key: "descricao", label: "Descreva como pode ajudar" },
        { key: "agradecimento", label: "Finalizado" }
    ];

    const currentIndex = Math.max(0, steps.findIndex(s => s.key === telaAtual));

    return (
        <nav className={`flex flex-col items-start gap-1 py-4 ${className}`}>
            {steps.map((step, i) => {
                const active = i === currentIndex;
                const done = i < currentIndex;

                return (
                    <div key={step.key} className="flex items-start gap-4 z-10">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200
                                    ${done || active ? "bg-[#052759] border-0" : "bg-white border-2 border-[#CBD5E1]"}`}
                            />
                            {i < steps.length - 1 && (
                                <div
                                    className={`w-[2px] mt-1 transition-colors duration-200
                                        ${i < currentIndex ? "bg-[#052759]" : "bg-gray-200" }`}
                                    style={{ height: "1.5rem" }}
                                />
                            )}
                        </div>

                        <span className={`${active ? "text-[#052759] font-semibold" : "text-gray-600"}`}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
}
