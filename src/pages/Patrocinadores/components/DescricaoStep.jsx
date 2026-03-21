import { useAlertUtils } from "../../../hooks/useAlertUtils";

export default function DescricaoStep({ descricao, setDescricao, onNext }) {
    const alertUtils = useAlertUtils();

    const handleSubmit = () => {
        if (!descricao.trim()) {
            alertUtils.error(
                "Campo obrigatório",
                "Por favor, descreva como você pode ajudar a instituição."
            );
            return;
        }
        onNext();
    };

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Seja um Patrocinador</h2>
            <h3 className="text-lg text-white/80 font-normal">
                Descreva a maneira como pretende ajudar
            </h3>

            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rounded-lg w-full h-40 text-black font-normal p-3 resize-none border border-gray-300 focus:border-[#FFB114] focus:outline-none text-sm"
                placeholder="Descreva como você pode ajudar nossa instituição..."
            />

            <button
                onClick={handleSubmit}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-4 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Finalizar
            </button>
        </div>
    );
}
