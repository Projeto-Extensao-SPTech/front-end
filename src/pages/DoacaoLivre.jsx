import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputField({ field, value, onChange }) {
    return (
        <div className={`flex flex-col text-left ${field.fullWidth ? "w-full" : "w-[48%]"}`}>
            <label htmlFor={field.name} className="text-white mb-1 font-medium text-sm">
                {field.label}:
            </label>

            {field.component === "select" ? (
                <select
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={onChange}
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
                    value={value}
                    onChange={onChange}
                    className="rounded-lg w-full h-16 text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm resize-none"
                    placeholder="Descreva brevemente o item"
                />
            ) : (
                <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value}
                    onChange={onChange}
                    className="rounded-lg w-full text-black font-normal p-2 border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                />
            )}
        </div>
    );
}

function FormButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
        >
            {children}
        </button>
    );
}

function RadioOption({ id, checked, onChange, label }) {
    return (
        <div className="flex gap-2 items-center">
            <input type="radio" name="envio" id={id} checked={checked} onChange={onChange} />
            <label htmlFor={id} className="text-white">{label}</label>
        </div>
    );
}

function Informacoes({ onNext }) {
    const [formData, setFormData] = useState({
        nomeProduto: "", quantidade: "", categoria: "", estado: "", descricao: ""
    });

    const fields = [
        { label: "Nome do Produto", type: "text", name: "nomeProduto", component: "input", fullWidth: true },
        { label: "Categoria", type: "select", name: "categoria", component: "select", options: ["Alimento", "Medicamento", "Vestimentas", "Materiais de Construção"], fullWidth: true },
        { label: "Quantidade", type: "number", name: "quantidade", component: "input", fullWidth: false },
        { label: "Estado", type: "text", name: "estado", component: "select", options: ["Novo", "Usado"], fullWidth: false },
        { label: "Descrição", type: "text", name: "descricao", component: "textarea", fullWidth: true }
    ];

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <h3 className="text-lg text-white/80 font-normal">Preencha as informações do item que deseja doar</h3>

            <form className="flex flex-wrap w-full gap-4 justify-between">
                {fields.map(f => (
                    <InputField key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
                ))}
            </form>

            <FormButton onClick={e => {
                e.preventDefault();

                for (const key in formData) {
                    if (key !== "descricao" && !formData[key]) {
                        return alert(`Por favor, preencha o campo "${key}"`);
                    }
                }

                onNext();
            }}>Avançar</FormButton>


        </div>
    );
}

function EnviarFoto({ onNext }) {
    const [foto, setFoto] = useState(null);
    const handleFileChange = (e) => setFoto(e.target.files[0]);

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <h3 className="text-lg text-white/80 font-normal">Agora, envie uma foto do item</h3>

            <div className="flex flex-col items-center justify-center w-full mt-4">
                <label htmlFor="foto" className="cursor-pointer w-72 h-64 bg-gray-200 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-300 transition">
                    {foto ? (
                        <img src={URL.createObjectURL(foto)} alt="Pré-visualização" className="w-full h-full object-contain rounded-2xl" />
                    ) : (
                        <>
                            <img src="/img-doacao-livre-upload-photo.png" alt="Ícone de câmera" className="w-24 h-24 mb-10" />
                            <span className="text-[#052759] font-bold">Clique aqui para selecionar</span>
                        </>
                    )}
                </label>
                <input id="foto" name="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>

            <p className="text-lg text-white/80 font-normal">*Essa é apenas uma pré-visualização, o tamanho e a proporção originais serão mantidos</p>

            <FormButton onClick={e => {
                e.preventDefault();
                if (!foto) return alert("Por favor, selecione uma foto antes de avançar!");
                onNext();
            }}>Avançar</FormButton>
        </div>
    );
}

function Envio({ onNext }) {
    const [sendType, setSendType] = useState("");
    const [collectionPointSelected, setCollectionPointSelected] = useState();
    const [formData, setFormData] = useState({ cep_origem: "", cep_destino: "13580-000" });

    const fields = [
        { label: "CEP de Origem", type: "text", name: "cep_origem", component: "input", fullWidth: true },
        { label: "CEP de Destino", type: "text", name: "cep_destino", component: "input", fullWidth: true }
    ];

    const [collectionPoints] = useState([
        { id: 1, formattedAddress: "Rua XV de Novembro, 120 - Centro, São Paulo - SP", name: "Associação Esperança" },
        { id: 2, formattedAddress: "Avenida Santo Amaro, 3450 - Brooklin, São Paulo - SP", name: "Instituto Cuidar Bem" },
        { id: 3, formattedAddress: "Rua Itaquera, 980 - Vila Carmosina, São Paulo - SP", name: "Abrigo São Francisco" },
        { id: 4, formattedAddress: "Rua da Consolação, 500 - Consolação, São Paulo - SP", name: "Lar dos Amigos" },
        { id: 5, formattedAddress: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP", name: "Instituto Vida Nova" }
    ]);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleRadioChange = (value) => setSendType(prev => (prev === value ? "" : value));

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <p className="text-lg text-white/80 font-normal">Selecione um método de envio para que possamos receber a sua doação</p>

            <form className="flex flex-col w-full gap-4">
                <div className="flex items-center justify-center text-left gap-4">
                    <RadioOption id="pontoColeta" checked={sendType === "ponto de coleta"} onChange={() => handleRadioChange("ponto de coleta")} label="Levar ao ponto de coleta" />
                    <RadioOption id="envio" checked={sendType === "envio"} onChange={() => handleRadioChange("envio")} label="Enviar para o abrigo" />
                </div>

                {sendType === "envio" && (
                    <>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {fields.map(f => (
                                <InputField key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
                            ))}
                            <p className="text-sm text-white/80 font-normal">
                                *Esse CEP se refere ao local onde se encontra o abrigo Dog Feliz
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1 bg-[#D9D9D9] rounded-2xl p-4">
                            <p className="text-[#052759]">Prazo de entrega: </p>
                            <p className="text-[#052759]">Preço base para envio: </p>
                            <p className="text-[#052759] font-normal">*Cálculo realizado por meio da API Oficial dos Correios</p>
                        </div>

                        <div className="flex justify-center mt-4">
                            <FormButton onClick={e => { e.preventDefault(); onNext(); }}>Avançar</FormButton>
                        </div>
                    </>
                )}

                {sendType === "ponto de coleta" && (
                    <>
                        <div className="flex justify-center flex-col items-center mt-4 w-full">
                            <p className="text-lg text-white/80 font-normal mb-2">Escolha um ponto de coleta</p>
                            <div className="flex flex-col gap-2 w-full max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFB114] scrollbar-track-[#E5E7EB] rounded-md p-2">
                                {collectionPoints.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => setCollectionPointSelected(p.id)}
                                        className={`flex flex-col items-start rounded-md p-3 w-full transition-colors duration-200 ${collectionPointSelected === p.id ? "bg-white border-2 border-[#FFB114]" : "bg-[#d9d9d9] hover:bg-white"}`}
                                    >
                                        <p className="text-[#052759] font-bold">{p.name}</p>
                                        <p className="text-[#052759] font-normal text-sm">{p.formattedAddress}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <FormButton onClick={e => {
                                e.preventDefault();
                                if (!sendType) return alert("Por favor, selecione um método de envio.");

                                if (sendType === "envio") {
                                    if (!formData.cep_origem) return alert("Por favor, preencha o CEP de Origem.");
                                    if (!formData.cep_destino) return alert("Por favor, preencha o CEP de Destino.");
                                }

                                if (sendType === "ponto de coleta" && !collectionPointSelected) {
                                    return alert("Por favor, selecione um ponto de coleta.");
                                }

                                onNext();
                            }}>Avançar</FormButton>
                        </div>
                    </>
                )}

            </form>
        </div>
    );
}

function Agradecimento() {
    const navigate = useNavigate();

    return (
        <div className="text-center space-y-6 w-full">
            <img src="/icons/verified1-icon.svg" alt="Ícone de verificação" className="w-12 h-12 mx-auto" />
            <h2 className="text-xl text-white font-bold">Muito obrigado por contribuir como doador da instituição!</h2>
            <img src="/img-doacao-livre-cat-2.png" alt="Cachorro agradecendo" className="w-48 mx-auto" />
            <h4 className="text-lg text-white/80 font-normal">Entraremos em contato com você pelo nosso Whatsapp, fique atento!</h4>

            <FormButton onClick={() => navigate('/')}>Retornar para a home</FormButton>
        </div>
    );
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
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 border-2 ${done || active ? "bg-[#052759] border-[#052759] text-white" : "bg-white border-gray-400 text-gray-400"}`} />
                            {i < steps.length - 1 && <div className={`w-[2px] mt-1 transition-colors duration-200 ${i < currentIndex ? "bg-[#052759]" : "bg-gray-300"}`} style={{ height: "1.5rem" }} />}
                        </div>
                        <span className={`text-sm ${active ? "text-[#052759] font-semibold" : done ? "text-[#052759] font-medium" : "text-gray-600"}`}>{step.label}</span>
                    </div>
                );
            })}
        </nav>
    );
}

export default function DoacaoLivre() {
    const [step, setStep] = useState(0);
    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));

    const steps = [
        { key: "sobre", label: "Sobre a doação" },
        { key: "foto", label: "Foto do item" },
        { key: "entrega", label: "Entrega" },
        { key: "finalizacao", label: "Finalização" },
    ];

    return (
        <div className="flex min-h-screen overflow-hidden">
            <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-r-3xl items-center justify-center p-8 gap-6">
                <div className="w-full max-w-md">
                    {step === 0 && <Informacoes onNext={nextStep} />}
                    {step === 1 && <EnviarFoto onNext={nextStep} />}
                    {step === 2 && <Envio onNext={nextStep} />}
                    {step === 3 && <Agradecimento />}
                </div>
            </div>

            <div className="flex-1 relative bg-[#EFEFEF] flex items-center">
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <Identificador steps={steps} currentIndex={step} />
                </div>
                <img src="/img-doacao-livre-cat.png" alt="Gato" className="w-2/3 absolute bottom-0 right-0 opacity-90" />
            </div>
        </div>
    );
}
