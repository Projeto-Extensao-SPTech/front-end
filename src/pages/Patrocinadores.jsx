import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendSponsor } from '../js/sponsors'
import * as validators from "../js/utils/validators"

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
                onClick={()=> {
                    if(areasApoio.length > 0) {
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

function Informacoes({ formInfo, setFormField, onNext }) {
    const inputs = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Telefone', type: 'text', name: 'telefone' },
        { label: 'CPF', type: 'text', name: 'cpf' },
        { label: 'Data de Nascimento', type: 'date', name: 'dataNascimento' },
    ]

    const [errors, setErrors] = useState({})

    const getFriendlyMessage = (name, rawValue, validatorResult) => {
        const value = (rawValue || '').toString().trim()
        if (!value) return 'Campo obrigatório'

        switch (name) {
            case 'nome':
                return 'Informe seu nome completo (mínimo 3 caracteres).'
            case 'email':
                return 'Informe um email válido (ex: usuario@exemplo.com).'
            case 'telefone':
                return 'Informe um telefone com DDD — 10 ou 11 dígitos (somente números).'
            case 'cpf':
                return 'Informe um CPF válido com 11 dígitos (somente números).'
            default:
                return validatorResult && validatorResult.message
                    ? validatorResult.message
                    : 'Valor inválido'
        }
    }

    const validateField = (name, value) => {
        let result = { isValid: true, message: '' }

        switch (name) {
            case 'nome':
                result = validators.validateUserName(value || '')
                break
            case 'email':
                result = validators.validateEmail(value || '')
                break
            case 'telefone': {
                const digits = (value || '').replace(/\D/g, '')
                result = validators.validatePhoneNumber(digits)
                break
            }
            case 'cpf': {
                const digits = (value || '').replace(/\D/g, '')
                result = validators.validateCpf(digits)
                break
            }
            default:
                result = { isValid: true, message: '' }
        }

        if (!result.isValid) {
            const friendly = getFriendlyMessage(name, value, result)
            setErrors(prev => ({ ...prev, [name]: friendly }))
            return false
        }

        setErrors(prev => ({ ...prev, [name]: null }))
        return true
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormField(name, value)
        validateField(name, value)
    }

    const handleNextClick = () => {
        const required = ['nome', 'email', 'telefone', 'cpf']
        const allValid = required.every((field) => validateField(field, formInfo[field]))
        if (allValid) {
            onNext()
        } else {
            const firstErrorField = required.find(f => errors[f])
            if (firstErrorField) {
                const el = document.getElementById(firstErrorField)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Seja um Patrocinador</h2>
            <h3 className="text-lg text-white/80 font-normal">Preencha suas informações</h3>

            <form className="flex flex-col w-full gap-4" onSubmit={(e) => e.preventDefault()}>
                {inputs.map((input) => {
                    const fieldError = errors[input.name]
                    const errorClasses = fieldError
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : "border border-gray-300 focus:border-[#FFB114]"

                    return (
                        <div key={input.name} className="flex flex-col text-left">
                            <label htmlFor={input.name} className="text-white mb-1 font-medium text-sm">{input.label}:</label>
                            <input
                                id={input.name}
                                name={input.name}
                                type={input.type}
                                value={formInfo[input.name] || ""}
                                onChange={handleChange}
                                className={`rounded-lg w-full text-black font-normal p-2 ${errorClasses} focus:outline-none text-sm`}
                                placeholder={
                                    input.name === "telefone" ? "(xx) xxxxx-xxxx" :
                                        input.name === "cpf" ? "000.000.000-00" : ""
                                }
                            />
                            {fieldError && <p className="text-sm text-red-500 mt-1 text-left">{fieldError}</p>}
                        </div>
                    )
                })}
            </form>

            <button
                onClick={handleNextClick}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
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
        { key: "info", label: "Preencha suas informações" },
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
    const [formInfo, setFormInfo] = useState({ nome: "", email: "", telefone: "", cpf: "", dataNascimento: "" })
    const [descricao, setDescricao] = useState("")

    const toggleArea = (area) => {
        setAreasApoio(prev =>
            prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
        )
    }

    const setFormField = (name, value) => {
        setFormInfo(prev => ({ ...prev, [name]: value }))
    }

    const steps = ['apoio', 'info', 'descricao', 'agradecimento']
    const handleNext = () => {
        const currentIndex = steps.indexOf(currentStep)
        if (currentIndex < steps.length - 1) {
            // se está finalizando a descrição (próximo é agradecimento), você pode consolidar os dados aqui
            if (steps[currentIndex + 1] === 'agradecimento') {
                const aggregated = {
                    areasApoio,
                    ...formInfo,
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
            case 'info':
                return <Informacoes formInfo={formInfo} setFormField={setFormField} onNext={handleNext} />
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