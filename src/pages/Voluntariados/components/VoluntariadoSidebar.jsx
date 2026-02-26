export default function VoluntariadoSidebar() {
    return (
        <div className="bg-gradient-to-br from-[#0d3a7a] to-[#052759] p-5 lg:p-7 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FCAD0B]/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

            <div className="relative z-10 space-y-3.5">
                <img
                    src="/img-voluntariar.png"
                    className="w-20 h-auto mx-auto mb-1.5"
                    alt="Voluntário"
                />

                <div className="text-center">
                    <div className="inline-block bg-[#FCAD0B] px-3.5 py-1 rounded-full shadow-md mb-2.5">
                        <span className="text-[#052759] font-bold text-xs">Por que me voluntariar?</span>
                    </div>

                    <h3 className="text-lg font-black text-white mb-1.5">Transforme vidas!</h3>

                    <p className="text-xs text-white/90 leading-relaxed mb-1.5">
                        Ser voluntário é transformar compaixão em ação.
                    </p>

                    <p className="text-xs text-white/90 leading-relaxed">
                        Cada carinho, passeio ou cuidado restaura a confiança de um animal que espera por um
                        lar.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 border border-white/20">
                    <p className="text-[11px] italic text-white text-center">
                        "É um ato que salva vidas — tanto as deles quanto a sua."
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1.5">
                    <div className="text-center">
                        <div className="text-[#FCAD0B] font-black text-base"></div>
                        <div className="text-white/70 text-[10px] leading-tight"></div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#FCAD0B] font-black text-base">Somos gratos</div>
                        <div className="text-white/70 text-[10px] leading-tight">pelo seu apoio!</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[#FCAD0B] font-black text-base"></div>
                        <div className="text-white/70 text-[10px] leading-tight"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
