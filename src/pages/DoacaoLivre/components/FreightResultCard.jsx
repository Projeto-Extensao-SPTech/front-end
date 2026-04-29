import { maskCEP } from "../../../js/utils/formatter";

export default function FreightResultCard({ freightInfo, tipoEnvio, cepUsuario }) {
    if (!freightInfo || !Array.isArray(freightInfo)) return null;

    // Filtrar opções válidas e ordenar por preço e prazo
    const validOptions = freightInfo
        .filter(option => option.price !== null && option.price !== undefined)
        .sort((a, b) => {
            const priceA = Number(a.price);
            const priceB = Number(b.price);
            if (priceA !== priceB) {
                return priceA - priceB;
            }

            const timeA = a.delivery_range?.min || a.delivery_time || 0;
            const timeB = b.delivery_range?.min || b.delivery_time || 0;
            return timeA - timeB;
        })
        .slice(0, 2);

    if (validOptions.length === 0) return null;

    return (
        <div className="flex flex-col items-center bg-white/20 p-3 rounded-lg border border-white/30 mt-2 w-full">
            <p className="text-white font-bold text-lg mb-4">
                {tipoEnvio === "envio" ? "Melhores Opções de Entrega" : "Melhores Opções de Deslocamento"}
            </p>
            <div className="flex flex-col gap-3 w-full">
                {validOptions.map((option, index) => (
                    <div
                        key={option.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                            index === 0
                                ? "bg-[#FFB114]/20 border-[#FFB114]/50"
                                : "bg-white/10 border-white/20"
                        }`}
                    >
                        <div className="flex items-center gap-3 flex-1">
                            {option.company_image && (
                                <img
                                    src={option.company_image}
                                    alt={option.company_name}
                                    className="h-8 w-auto"
                                />
                            )}
                            <div className="flex flex-col text-left">
                                <span className="text-white font-semibold text-sm">
                                    {option.company_name} - {option.name}
                                    {index === 0 && <span className="text-[#FFB114] ml-2">★ Recomendado</span>}
                                </span>
                                <span className="text-white/70 text-xs">
                                    {option.delivery_range?.min || option.delivery_time} a {option.delivery_range?.max || option.delivery_time} dias
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`font-bold text-lg ${index === 0 ? "text-[#FFB114]" : "text-[#FFB114]"}`}>
                                R$ {Number(option.price).toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-white/50 mt-3">
                {tipoEnvio === "ponto de coleta" && `CEP do Usuário (${maskCEP(cepUsuario)})`}
            </p>
        </div>
    );
}
