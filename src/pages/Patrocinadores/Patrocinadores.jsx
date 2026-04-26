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
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-full overflow-hidden">

            <div className="hidden lg:flex flex-1 relative bg-[#EFEFEF] items-center">
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                    <Indicador currentStep={currentStep} />
                </div>
                <img
                    src="/img-dog.svg"
                    alt="Cachorro"
                    className="w-1/2 absolute bottom-0 right-0 opacity-90"
                />
            </div>

            <div className="flex flex-col w-full lg:w-1/2 min-h-screen lg:min-h-0 lg:h-full bg-[#052759] text-white lg:border-l lg:rounded-l-3xl items-center justify-center p-6 sm:p-8 gap-6">

                <div className="lg:hidden w-full max-w-md">
                    <Indicador currentStep={currentStep} variant="light" />
                </div>

                <div className="w-full max-w-md">
                    {renderStep()}
                </div>

            </div>

        </div>
    );
}