import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Informacoes({ onNext }) {
    const [formData, setFormData] = useState({
        nomeProduto: "",
        quantidade: "",
        categoria: "",
        estado: "",
        descricao: ""
    });

    const fields = [
        { label: "Nome do Produto", type: "text", name: "nomeProduto", component: "input", fullWidth: true },
        { label: "Categoria", type: "select", name: "categoria", component: "select", options: ["Alimento", "Medicamento", "Vestimentas", "Materiais de Construção"], fullWidth: true },
        { label: "Quantidade", type: "number", name: "quantidade", component: "input", fullWidth: false },
        { label: "Estado", type: "text", name: "estado", component: "select", options: ["Novo", "Usado"], fullWidth: false },
        { label: "Descrição", type: "text", name: "descricao", component: "textarea", fullWidth: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <h3 className="text-lg text-white/80 font-normal">Preencha as informações do item que deseja doar</h3>

            <form className="flex flex-wrap w-full gap-4 justify-between">
                {fields.map((field) => (
                    <div
                        key={field.name}
                        className={`flex flex-col text-left ${field.fullWidth ? "w-full" : "w-[48%]"}`}
                    >
                        <label htmlFor={field.name} className="text-white mb-1 font-medium text-sm">
                            {field.label}:
                        </label>

                        {field.component === "select" ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                            >
                                <option value="">Selecione...</option>
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        ) : field.component === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="rounded-lg w-full h-16 text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm resize-none"
                                placeholder="Descreva brevemente o item"
                            />
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                            />
                        )}
                    </div>
                ))}
            </form>

            <button
                onClick={(e) => { e.preventDefault(); onNext(); }}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Avançar
            </button>
        </div>
    )
}

function Envio({ onNext }) {
    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Envio da Doação</h2>
            <p className="text-white/80">Informe como a doação será entregue à instituição.</p>

            <form className="flex flex-col w-full gap-4">
                <div className="flex flex-col text-left">
                    <label className="text-white mb-1 font-medium text-sm">Método de envio:</label>
                    <select className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm">
                        <option value="">Selecione...</option>
                        <option value="entrega">Entrega pessoalmente</option>
                        <option value="retirada">Solicitar retirada</option>
                    </select>
                </div>
            </form>

            <button
                onClick={(e) => { e.preventDefault(); onNext(); }}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Continuar
            </button>
        </div>
    )
}

function Agradecimento() {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-6 w-full">
            <img src="/icons/verified1-icon.svg" alt="Ícone de verificação" className="w-12 h-12 mx-auto" />
            <h2 className="text-xl text-white font-bold">
                Muito obrigado por contribuir com sua doação!
            </h2>
            <img src="/photos/dog-agradecimento-photo.svg" alt="Cachorro agradecendo" className="w-24 mx-auto" />
            <h4 className="text-sm text-white/80">
                Entraremos em contato com você pelo nosso Whatsapp, fique atento!
            </h4>

            <button
                onClick={() => navigate('/')}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Finalizar
            </button>
        </div>
    )
}

function Identificador({ steps, currentIndex }) {
    return (
        <nav className="flex flex-col items-start gap-1 py-4">
            {steps.map((step, i) => {
                const active = i === currentIndex;
                const done = i < currentIndex;

                return (
                    <div key={step.key} className="flex items-start gap-3 z-10">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 border-2 ${done || active
                                    ? "bg-[#052759] border-[#052759] text-white"
                                    : "bg-white border-gray-400 text-gray-400"
                                    }`}
                            />
                            {i < steps.length - 1 && (
                                <div
                                    className={`w-[2px] mt-1 transition-colors duration-200 ${i < currentIndex ? "bg-[#052759]" : "bg-gray-300"
                                        }`}
                                    style={{ height: "1.5rem" }}
                                />
                            )}
                        </div>

                        <span
                            className={`text-sm ${active
                                ? "text-[#052759] font-semibold"
                                : done
                                    ? "text-[#052759] font-medium"
                                    : "text-gray-600"
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
}

export default function DoacaoLivre() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));

    const steps = [
        { key: "info", label: "Informações" },
        { key: "envio", label: "Envio" },
        { key: "agradecimento", label: "Agradecimento" }
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-r-3xl items-center justify-center p-8 gap-6">
                <div className="w-full max-w-md">
                    {step === 0 && <Informacoes onNext={nextStep} />}
                    {step === 1 && <Envio onNext={nextStep} />}
                    {step === 2 && <Agradecimento />}
                </div>
            </div>

            <div className="flex-1 relative bg-[#EFEFEF] flex items-center">
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <Identificador steps={steps} currentIndex={step} />
                </div>
                <img src="/img-doacao-livre-cat.png" alt="Cachorro" className="w-1/2 absolute bottom-0 right-0 opacity-90" />
            </div>
        </div>
    )
}
