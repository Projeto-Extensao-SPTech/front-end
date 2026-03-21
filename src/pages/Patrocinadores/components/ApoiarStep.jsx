import { useAlertUtils } from "../../../hooks/useAlertUtils";

export default function ApoiarStep({ areasApoio, toggleArea, onNext }) {
    const alertUtils = useAlertUtils();

    const checkBoxes = [
        { label: "Financeiramente", id: "financeiramente" },
        { label: "Alimentos", id: "alimentos" },
        { label: "Remédios", id: "remedios" },
        { label: "Divulgação", id: "divulgacao" },
        { label: "Campanhas", id: "campanhas" },
        { label: "Obras", id: "obras" },
        { label: "Transporte", id: "transporte" },
        { label: "Higiene", id: "higiene" },
    ];

    const handleNext = () => {
        if (areasApoio.length > 0) {
            onNext();
        } else {
            alertUtils.error(
                "Erro",
                "Por favor, selecione ao menos uma área de apoio para continuar."
            );
        }
    };

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Seja um Patrocinador</h2>
            <h3 className="text-lg text-white/80 font-normal">
                Escolha com o que deseja apoiar
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                {checkBoxes.map((checkbox) => (
                    <label
                        key={checkbox.id}
                        className="flex items-center gap-3 cursor-pointer text-base"
                    >
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
                onClick={handleNext}
                className="w-64 bg-[#FFB114] text-white rounded-lg py-2 mt-6 hover:bg-[#ffd175] transition-colors duration-300 font-bold"
            >
                Avançar
            </button>
        </div>
    );
}
