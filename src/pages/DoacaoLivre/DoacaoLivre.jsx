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
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen overflow-hidden">

            <div className="flex flex-col w-full lg:w-1/2 min-h-screen lg:min-h-0 lg:h-full bg-[#052759] text-white lg:border-l lg:rounded-r-3xl items-center justify-center p-6 sm:p-8 gap-6">

                <div className="lg:hidden w-full max-w-md">
                    <Identificador steps={STEPS} currentIndex={step} variant="light" />
                </div>

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

            <div className="hidden lg:flex flex-1 relative bg-[#EFEFEF] items-center">
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