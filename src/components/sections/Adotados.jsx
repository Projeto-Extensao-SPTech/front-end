export default function Adotados() {
    const pets = [
        '/img-adotado1.png',
        '/img-adotado2.png',
        '/img-adotado3.png',
        '/img-adotado4.png',
        '/img-adotado5.png'
    ]

    return (
        <div className="min-h-[40vh] flex items-center justify-center bg-[#EFEFEF] py-8">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-4">

                <div className="flex flex-wrap justify-center gap-4">
                    {pets.map((pet, index) => (
                        <img
                            key={index}
                            src={pet}
                            alt={`Pet adotado ${index + 1}`}
                            className={`w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-xl transition-transform hover:scale-110 ${index % 2 === 0 ? 'lg:translate-y-6' : 'lg:-translate-y-6'
                                }`}
                        />
                    ))}
                </div>

                <div className="text-center lg:text-left">
                    <h2 className="text-2xl lg:text-3xl font-black text-[#052759] tracking-wider hover:scale-105 transition-transform cursor-pointer">
                        PETS
                    </h2>
                    <h2 className="text-2xl lg:text-3xl font-black text-[#052759] tracking-wider border-b-6 border-[#052759] pb-1 hover:scale-105 transition-transform cursor-pointer">
                        ADOTADOS
                    </h2>
                </div>

            </div>
        </div>
    )
}