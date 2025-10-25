import { useState } from "react"
import { usePatrocinadores } from "../../contexts/PatrocinadoresContext"
import { stringFormatter, cpfFormatter, phoneFormatter } from "../../js/utils/formatter"

export function Informacoes() {
    const { setTelaAtual } = usePatrocinadores()

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        dataNascimento: "" // armazena YYYY-MM-DD via input[type=date]
    })

    function handleChange(e) {
        const { name, value } = e.target
        let newValue = value

        if (name === "nome") {
            newValue = stringFormatter(value)
        } else if (name === "cpf") {
            const digits = value.replace(/\D/g, "")
            newValue = cpfFormatter(digits)
        } else if (name === "telefone") {
            const digits = value.replace(/\D/g, "")
            newValue = phoneFormatter(digits)
        } else {
            newValue = value
        }

        setFormData(prev => ({ ...prev, [name]: newValue }))
    }

    const inputs = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Telefone', type: 'text', name: 'telefone' },
        { label: 'CPF', type: 'text', name: 'cpf' },
        { label: 'Data de Nascimento', type: 'date', name: 'dataNascimento' },
    ]

    return (
        <>
            <h2 className="text-2xl md:text-3xl m-0">Seja um Patrocinador</h2>
            <h3 className="text-sm md:text-base font-normal m-0 mb-2">Preencha suas informações</h3>

            <form className="flex flex-col w-[70%] gap-3">
                {inputs.map((input) => (
                    <div key={input.name} className="flex flex-col">
                        <label htmlFor={input.name} className="text-sm mb-1">{input.label}:</label>

                        <input
                            id={input.name}
                            name={input.name}
                            type={input.type}
                            value={formData[input.name]}
                            onChange={handleChange}
                            className="rounded-lg w-full text-black font-normal p-2"
                            placeholder={
                                input.name === "telefone" ? "(xx) xxxxx-xxxx"
                                : input.name === "cpf" ? "000.000.000-00"
                                : ""
                            }
                        />
                    </div>
                ))}
            </form>

            <button
                onClick={() => setTelaAtual("descricao")}
                className="w-full md:w-[50%] bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300"
            >
                Avançar
            </button>
        </>
    )
}