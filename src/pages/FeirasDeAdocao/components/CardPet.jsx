export default function CardPet({ image, index }) {
    const imageUrl = `http://abrigodogfeliz.qzz.io:80/api/fairs/images?key=${encodeURIComponent(image)}`;

    return (
        <div
            className="group relative"
            style={{
                animation: "petFadeUp 0.5s both",
                animationDelay: `${index * 0.08}s`,
            }}
        >
            <style>{`
                @keyframes petFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="absolute inset-0 bg-gradient-to-br from-[#FCAD0B] to-orange-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

            <div className="relative bg-white rounded-2xl p-4 shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                <span className="absolute -top-2 right-3 bg-[#FCAD0B] text-[#052759] px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow">
                    ❤ Adote
                </span>

                <img
                    src={imageUrl}
                    alt="Pet disponível para adoção"
                    className="w-28 h-28 object-cover rounded-xl mx-auto mb-2"
                />

                <p className="text-center text-xs font-semibold text-[#052759]/70">
                    Disponível para adoção
                </p>
            </div>
        </div>
    );
}