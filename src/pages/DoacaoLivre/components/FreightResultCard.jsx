export default function FreightResultCard({ freightInfo, tipoEnvio, cepUsuario }) {
    if (!freightInfo) return null;

    return (
        <div className="flex flex-col items-center bg-white/20 p-4 rounded-lg border border-white/30 animate-fade-in mt-4 w-full">
            <p className="text-white font-bold text-lg">
                {tipoEnvio === "envio" ? "Estimativa de Entrega" : "Custo Estimado de Deslocamento"}
            </p>
            <div className="flex gap-8 mt-2">
                <div className="text-center">
                    <span className="block text-xs text-white/70">Valor</span>
                    <span className="text-[#FFB114] font-bold text-xl">
                        {Number(freightInfo.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
                <div className="text-center">
                    <span className="block text-xs text-white/70">Prazo</span>
                    <span className="text-white font-bold text-xl">
                        {freightInfo.deliveryTime} dias
                    </span>
                </div>
            </div>
            <p className="text-xs text-white/50 mt-2">
                {tipoEnvio === "ponto de coleta" && `CEP do Usuário (${cepUsuario})`}
            </p>
        </div>
    );
}
