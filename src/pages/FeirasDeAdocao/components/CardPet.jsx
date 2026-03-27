export default function CardPet({ image, index }) {
    const imageUrl = `http://localhost:7000/fairs/images/${image}`;

    return (
        <div
            className="group relative transition-all duration-700 opacity-0 translate-y-6"
            style={{
                animation: "fadeUp 0.6s forwards",
                animationDelay: `${index * 0.12}s`,
            }}
        >
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-all duration-500" />

            <div className="relative bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-6 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                <div className="absolute -top-4 right-4 bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                    ❤️ Adote
                </div>

                <img
                    src={imageUrl}
                    alt="Pet disponível para adoção"
                    className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow"
                />

                <p className="text-center text-sm text-gray-600">
                    Disponível para adoção!
                </p>
            </div>
        </div>
    );
}
