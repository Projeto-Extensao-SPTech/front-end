import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/apiUserService'

function Apoiar({ areasApoio, toggleArea, onNext }) {
    const checkBoxes = [
        { label: "Financeiramente", id: "financeiramente" },
        { label: "Alimentos", id: "alimentos" },
        { label: "Remédios", id: "remedios" },
        { label: "Divulgação", id: "divulgacao" },
        { label: "Campanhas", id: "campanhas" },
        { label: "Obras", id: "obras" },
        { label: "Transporte", id: "transporte" },
        { label: "Higiene", id: "higiene" }
    ]

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Seja um Patrocinador</h2>
            <h3 className="text-lg text-white/80 font-normal">Escolha com o que deseja apoiar</h3>

            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                {checkBoxes.map((checkbox) => (
                    <label key={checkbox.id} className="flex items-center gap-3 cursor-pointer text-base">
                        <input
                            type="checkbox"
                            checked={areasApoio.includes(checkbox.id)}
                            onChange={() => toggleArea(checkbox.id)}
                            className="appearance-none w-5 h-5 rounded-full border-2 border-white checked:bg-[#FFB114] checked:border-[#FFB114] hover:bg-[#d1ac61] cursor-pointer flex-shrink-0"
                        />
                        <span className="text-white">{checkbox.label}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={() => {
                    if (areasApoio.length > 0) {
                        onNext();
                    } else {
                        alert("Por favor, selecione ao menos uma área de apoio para continuar.");
                    }
                }}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Avançar
            </button>
        </div>
    )
}

function Descricao({ descricao, setDescricao, onNext }) {
    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Seja um Patrocinador</h2>
            <h3 className="text-lg text-white/80 font-normal">Descreva a maneira como pretende ajudar</h3>

            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rounded-lg w-full h-40 text-black font-normal p-3 resize-none border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                placeholder="Descreva como você pode ajudar nossa instituição..."
            />

            <button
                onClick={onNext}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Finalizar
            </button>
        </div>
    )
}

function Agradecimento() {
    const navigate = useNavigate()

    return (
        <div className="text-center space-y-6 w-full">
            <img src="/icons/verified1-icon.svg" alt="Ícone de verificação" className="w-12 h-12 mx-auto" />
            <h2 className="text-xl text-white font-bold">
                Muito obrigado por contribuir como patrocinador da instituição!!!
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

function Indicador({ currentStep }) {
    const steps = [
        { key: "apoio", label: "Onde deseja apoiar" },
        { key: "descricao", label: "Descreva como pode ajudar" },
        { key: "agradecimento", label: "Finalizado" }
    ]

    const currentIndex = Math.max(0, steps.findIndex(s => s.key === currentStep))

    return (
        <nav className="flex flex-col items-start gap-1 py-4">
            {steps.map((step, i) => {
                const active = i === currentIndex
                const done = i < currentIndex

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

                        <span className={`text-sm ${active ? "text-[#052759] font-semibold" :
                            done ? "text-[#052759] font-medium" : "text-gray-600"
                            }`}>
                            {step.label}
                        </span>
                    </div>
                )
            })}
        </nav>
    )
}

export default function Patrocinadores() {
    const [currentStep, setCurrentStep] = useState('apoio')

    // estados elevados (agregam dados de todos os passos)
    const [areasApoio, setAreasApoio] = useState([])
    const [descricao, setDescricao] = useState("")

    const toggleArea = (area) => {
        setAreasApoio(prev =>
            prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
        )
    }

    const steps = ['apoio', 'descricao', 'agradecimento']
    const handleNext = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) {
            // se está finalizando a descrição (próximo é agradecimento), envia os dados
            if (steps[currentIndex + 1] === 'agradecimento') {
                const aggregated = {
                    areasApoio,
                    descricao
                }
                sendSponsor(aggregated)
            }
            setCurrentStep(steps[currentIndex + 1])
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 'apoio':
                return <Apoiar areasApoio={areasApoio} toggleArea={toggleArea} onNext={handleNext} />
            case 'descricao':
                return <Descricao descricao={descricao} setDescricao={setDescricao} onNext={handleNext} />
            case 'agradecimento':
                return <Agradecimento />
            default:
                return <Apoiar areasApoio={areasApoio} toggleArea={toggleArea} onNext={handleNext} />
        }
    }

    return (
        <div className="flex h-full overflow-hidden">
            <div className="flex-1 relative bg-[#EFEFEF] flex items-center">
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <Indicador currentStep={currentStep} />
                </div>

                <img
                    src="/img-dog.svg"
                    alt="Cachorro"
                    className="w-1/2 absolute bottom-0 right-0 opacity-90"
                />
            </div>

            <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-l-3xl items-center justify-center p-8 gap-6">
                <div className="w-full max-w-md">
                    {renderStep()}
                </div>
            </div>
        </div>
    )
}

// CÓDIGO DEDICADO AO CRUD DE PATROCINADORES (SPONSORS) NA APLICAÇÃO
function sendSponsor(formData) {
    if (!formData) return;

    const SESSION_KEY = "USER_DATA";
    let user = null;

    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        user = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error("Erro ao ler sessionStorage:", err);
        alert("Você precisa estar logado para se tornar um patrocinador.");
        return;
    }

    if (!user || !user.id) {
        alert("Você precisa estar logado para se tornar um patrocinador.");
        return;
    }

    console.log("Dados do usuário (sessionStorage):", user);
    console.log("Dados do formulário:", formData);

    const sponsorshipPayload = {
        sponsor_id: user.id,
        type: user.type || "PF", // Dado padrão é PF caso não exista
        description: formData.descricao || "Sem descrição fornecida",
        department: getSponsorshipDepartment(formData.areasApoio)
    };

    console.log("Enviando sponsorship:", sponsorshipPayload);

    // Envia a sponsorship
    api.post("/sponsorships", sponsorshipPayload)
        .then(sponsorshipResponse => {
            console.log("Sponsorship created:", sponsorshipResponse.data);

            const sponsorship = sponsorshipResponse.data

            // Envia notificação via WhatsApp
            const departments = getSponsorshipDepartment(formData.areasApoio);

            const messageText = `Olá Andressa,\nTemos uma nova proposta de Patrocinador! 😻\n\n*Nome*: ${sponsorship.sponsor.name}\n*Departamento*: ${departments}\n*Descrição*: ${sponsorship.description || "Não informado"}\n*Tipo*: ${sponsorship.type}\n*Email*: ${sponsorship.sponsor.mail_address || "Não informado"}\n*Telefone*: ${sponsorship.sponsor.phone || "Não informado"}\n\nEntre em contato para saber mais detalhes! 🐶🦴`;

            return api.post("/messages/sendText/Evolution-teste-api", {
                number: "5511930144580",
                text: messageText
            });
        })
        .then(messageResponse => {
            console.log("WhatsApp message sent:", messageResponse.data);
        })
        .catch(error => {
            console.error("Erro no envio de patrocínio:", error);
            if (error.response) {
                console.error("Resposta do servidor:", error.response.data);
            }
            alert("Ocorreu um erro ao enviar sua proposta. Tente novamente.");
        });
}


function getSponsorshipDepartment(areas) {
    const areaToDepartmentMap = {
        financeiramente: "Financeiro",
        alimentos: "Alimentício",
        remedios: "Saúde",
        divulgacao: "Marketing",
        campanhas: "Marketing",
        obras: "Infraestrutura",
        transporte: "Logística",
        higiene: "Saúde"
    };
    const areasArray = Array.isArray(areas) ? areas : [areas];

    // Mapeia cada área para o departamento correspondente
    const departments = areasArray
        .map(area => areaToDepartmentMap[area])
        .filter(dept => dept !== undefined);

    // Remove duplicatas (ex: Marketing aparece 2x)
    const uniqueDepartments = [...new Set(departments)];

    return uniqueDepartments.join(", ") || "Não especificado";
}