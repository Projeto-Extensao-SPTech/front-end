import { useState } from "react";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { sendSponsor } from "../services/patrocinadorService";

export function usePatrocinadores() {
    const alertUtils = useAlertUtils();
    const [currentStep, setCurrentStep] = useState("apoio");
    const [areasApoio, setAreasApoio] = useState([]);
    const [descricao, setDescricao] = useState("");

    const toggleArea = (area) => {
        setAreasApoio((prev) =>
            prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
        );
    };

    const steps = ["apoio", "descricao", "agradecimento"];

    const handleNext = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            // Se está finalizando a descrição (próximo é agradecimento), envia os dados
            if (steps[currentIndex + 1] === "agradecimento") {
                const aggregated = {
                    areasApoio,
                    descricao,
                };
                // Passa callback para resetar em caso de erro
                sendSponsor(aggregated, alertUtils, () => setCurrentStep("apoio"));
            }
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    return {
        currentStep,
        areasApoio,
        descricao,
        setDescricao,
        toggleArea,
        handleNext,
    };
}
