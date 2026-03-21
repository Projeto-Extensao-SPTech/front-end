import { usePatrocinadores } from "./hooks/usePatrocinadores";
import Indicador from "./components/Indicador";
import ApoiarStep from "./components/ApoiarStep";
import DescricaoStep from "./components/DescricaoStep";
import AgradecimentoStep from "./components/AgradecimentoStep";

export default function Patrocinadores() {
    const {
        currentStep,
        areasApoio,
        descricao,
        setDescricao,
        toggleArea,
        handleNext,
    } = usePatrocinadores();

    const renderStep = () => {
        switch (currentStep) {
            case "apoio":
                return (
                    <ApoiarStep
                        areasApoio={areasApoio}
                        toggleArea={toggleArea}
                        onNext={handleNext}
                    />
                );
            case "descricao":
                return (
                    <DescricaoStep
                        descricao={descricao}
                        setDescricao={setDescricao}
                        onNext={handleNext}
                    />
                );
            case "agradecimento":
                return <AgradecimentoStep />;
            default:
                return (
                    <ApoiarStep
                        areasApoio={areasApoio}
                        toggleArea={toggleArea}
                        onNext={handleNext}
                    />
                );
        }
    };

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
                <div className="w-full max-w-md">{renderStep()}</div>
            </div>
        </div>
    );
}
