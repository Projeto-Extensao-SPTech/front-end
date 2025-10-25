import { usePatrocinadores } from "../../contexts/PatrocinadoresContext"

export function Informacoes() {
    const { setTelaAtual } = usePatrocinadores()

    const inputs = [
        { label: 'Nome', type: 'text', name: 'nome' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Telefone', type: 'tel', name: 'telefone' },
        { label: 'CPF', type: 'text', name: 'cpf' },
        { label: 'Data de Nascimento', type: 'date', name: 'dataNascimento' },
    ]

    return (
        <>
            <h2 className="text-4xl m-0">Seja um Patrocinador</h2>
            <h3 className="font-normal m-0">Preencha suas informações</h3>

            <form className="flex flex-col w-[70%] gap-4">
                {inputs.map((input) => (
                    <div key={input.name} className="flex flex-col">
                        <label htmlFor={input.name} >{input.label}:</label>
                        <input
                            type={input.type}
                            name={input.name}
                            id={input.name}
                            className="rounded-lg w-full text-black font-normal p-2"
                        />
                    </div>
                ))}
            </form>

            <button
                onClick={() => setTelaAtual("descricao")}
                className="w-[50%] bg-[#FFB114] text-white rounded-lg p-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300"
            >
                Avançar
            </button>
        </>
    )
}