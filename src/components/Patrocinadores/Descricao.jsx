import { usePatrocinadores } from "../../contexts/PatrocinadoresContext";

export function Descricao() {
    const { setTelaAtual } = usePatrocinadores();

    return (
        <>
            <h2 className="text-4xl m-0">Seja um Patrocinador</h2>
            <h3 className="font-normal m-0">Descreva a maneira como pretende ajudar</h3>

            <textarea name="descricao" id="descricao" className="rounded-lg w-[70%] h-64 text-black font-normal p-2" />

            <button
                onClick={() => setTelaAtual("agradecimento")}
                className="w-[50%] bg-[#FFB114] text-white rounded-lg p-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300"
            >
                Finalizar
            </button>
        </>
    )
}