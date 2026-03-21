import { useAlertUtils } from "../../../hooks/useAlertUtils";
import InputField from "./InputField";
import FormButton from "./FormButton";
import RadioOption from "./RadioOption";
import FreightResultCard from "./FreightResultCard";

export default function EnvioStep({
    data,
    updateData,
    collectionPoints,
    freightInfo,
    loading,
    onCalculateFreight,
    onFinalSubmit,
    cepUsuario,
}) {
    const alertUtils = useAlertUtils();

    const handleChange = (e) => updateData(e.target.name, e.target.value);

    const handleRadioChange = (tipo) => {
        updateData("tipoEnvio", tipo);
        if (tipo === "envio") updateData("pontoColetaId", null);
        if (tipo === "ponto de coleta") {
            updateData("cep_origem", cepUsuario);
            updateData("cep_destino", collectionPoints[0]?.address.zipCode || "");
        }
    };

    const handleManualFreight = (e) => {
        e.preventDefault();
        if (!data.cep_origem || !data.cep_destino) {
            alertUtils.warn("Atenção", "Preencha os dois CEPs.");
            return;
        }
        onCalculateFreight(data.cep_origem, data.cep_destino);
    };

    const handlePointClick = (point) => {
        updateData("pontoColetaId", point.id);
        updateData("cep_destino", point.address.zipCode);
        onCalculateFreight(cepUsuario, point.address.zipCode);
    };

    return (
        <div className="text-center space-y-6 w-full">
            <h2 className="text-2xl text-white font-bold">Doação Livre</h2>
            <p className="text-lg text-white/80 font-normal">
                Selecione um método de envio para que possamos receber a sua doação
            </p>

            <form className="flex flex-col w-full gap-4">
                <div className="flex items-center justify-center text-left gap-4">
                    <RadioOption
                        id="pontoColeta"
                        checked={data.tipoEnvio === "ponto de coleta"}
                        onChange={() => handleRadioChange("ponto de coleta")}
                        label="Levar ao ponto de coleta"
                    />
                    <RadioOption
                        id="envio"
                        checked={data.tipoEnvio === "envio"}
                        onChange={() => handleRadioChange("envio")}
                        label="Enviar para o abrigo"
                    />
                </div>

                {data.tipoEnvio === "envio" && (
                    <div className="flex flex-wrap gap-4 mt-4">
                        <InputField
                            field={{
                                label: "CEP Origem",
                                name: "cep_origem",
                                component: "input",
                                fullWidth: true,
                            }}
                            value={data.cep_origem}
                            onChange={handleChange}
                        />
                        <InputField
                            field={{
                                label: "CEP Destino (Abrigo)",
                                name: "cep_destino",
                                component: "input",
                                fullWidth: true,
                            }}
                            value={data.cep_destino}
                            onChange={handleChange}
                        />

                        <div className="w-full flex justify-center">
                            <button
                                onClick={handleManualFreight}
                                className="text-white text-sm underline hover:text-[#FFB114] transition-colors"
                            >
                                Calcular Frete e Prazo
                            </button>
                        </div>

                        <FreightResultCard
                            freightInfo={freightInfo}
                            tipoEnvio={data.tipoEnvio}
                            cepUsuario={cepUsuario}
                        />

                        <div className="w-full flex justify-center mt-4">
                            <FormButton onClick={onFinalSubmit} disabled={loading}>
                                {loading ? "Enviando..." : "Finalizar Doação"}
                            </FormButton>
                        </div>
                    </div>
                )}

                {data.tipoEnvio === "ponto de coleta" && (
                    <>
                        <div className="flex justify-center flex-col items-center mt-4 w-full">
                            <p className="text-lg text-white/80 font-normal mb-2">
                                Escolha um ponto de coleta
                            </p>
                            <div className="flex flex-col gap-2 w-full max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFB114] scrollbar-track-[#E5E7EB] rounded-md p-2">
                                {collectionPoints.length === 0 && (
                                    <p className="text-white">Carregando pontos...</p>
                                )}
                                {collectionPoints.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => handlePointClick(p)}
                                        className={`flex flex-col items-start rounded-md p-3 w-full transition-colors duration-200 ${data.collectionCenterId === p.id
                                                ? "bg-white border-2 border-[#FFB114]"
                                                : "bg-[#d9d9d9] hover:bg-white"
                                            }`}
                                    >
                                        <p className="text-[#052759] font-bold">{p.name}</p>
                                        {p.address && (
                                            <p className="text-[#052759] font-normal text-sm">
                                                {p.address.street}, {p.address.number} -{" "}
                                                {p.address.city}/{p.address.state}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <FreightResultCard
                            freightInfo={freightInfo}
                            tipoEnvio={data.tipoEnvio}
                            cepUsuario={cepUsuario}
                        />

                        <div className="flex justify-center mt-4">
                            <FormButton onClick={onFinalSubmit} disabled={loading}>
                                {loading ? "Enviando..." : "Finalizar Doação"}
                            </FormButton>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
