import { useDoacaoLivre } from "./hooks/useDoacaoLivre";
import InformacoesStep from "./components/InformacoesStep";
import EnviarFotoStep from "./components/EnviarFotoStep";
import EnvioStep from "./components/EnvioStep";
import AgradecimentoStep from "./components/AgradecimentoStep";
import Identificador from "./components/Identificador";

const STEPS = [
    { key: "sobre", label: "Sobre a doação" },
    { key: "foto", label: "Foto do item" },
    { key: "entrega", label: "Entrega" },
    { key: "finalizacao", label: "Finalização" },
];

export default function DoacaoLivre() {
    const {
        step,
        formData,
        loading,
        collectionPoints,
        freightInfo,
        cepUsuario,
        updateFormData,
        nextStep,
        calculateFreight,
        finalSubmit,
    } = useDoacaoLivre();

    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Painel esquerdo - Formulário */}
            <div className="flex flex-col w-1/2 bg-[#052759] text-white border-l rounded-r-3xl items-center justify-center p-8 gap-6">
                <div className="w-full max-w-md">
                    {step === 0 && (
                        <InformacoesStep
                            data={formData}
                            updateData={updateFormData}
                            onNext={nextStep}
                        />
                    )}
                    {step === 1 && (
                        <EnviarFotoStep
                            data={formData}
                            updateData={updateFormData}
                            onNext={nextStep}
                        />
                    )}
                    {step === 2 && (
                        <EnvioStep
                            data={formData}
                            updateData={updateFormData}
                            collectionPoints={collectionPoints}
                            freightInfo={freightInfo}
                            loading={loading}
                            onCalculateFreight={calculateFreight}
                            onFinalSubmit={finalSubmit}
                            cepUsuario={cepUsuario}
                        />
                    )}
                    {step === 3 && <AgradecimentoStep />}
                </div>
            </div>

            {/* Painel direito - Ilustração e indicador */}
            <div className="flex-1 relative bg-[#EFEFEF] flex items-center">
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <Identificador steps={STEPS} currentIndex={step} />
                </div>
                <img
                    src="/img-doacao-livre-cat.png"
                    alt="Gato"
                    className="w-2/3 absolute bottom-0 right-0 opacity-90"
                />
            </div>
        </div>
    );
}
