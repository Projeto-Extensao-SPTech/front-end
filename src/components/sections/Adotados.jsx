export default function Adotados() {
    const pets = [
        '/img-adotado1.png',
        '/img-adotado2.png',
        '/img-adotado3.png',
        '/img-adotado4.png',
        '/img-adotado5.png'
    ]

    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-[#EFEFEF] py-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">

                <div className="flex flex-wrap justify-center gap-6">
                    {pets.map((pet, index) => (
                        <img
                            key={index}
                            src={pet}
                            alt={`Pet adotado ${index + 1}`}
                            className={`w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-2xl shadow-lg transition-transform hover:scale-110 ${index % 2 === 0 ? 'lg:translate-y-8' : 'lg:-translate-y-8'
                                }`}
                        />
                    ))}
                </div>

                <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#052759] tracking-wider hover:scale-105 transition-transform cursor-pointer">
                        PETS
                    </h2>
                    <h2 className="text-3xl lg:text-4xl font-black text-[#052759] tracking-wider border-b-8 border-[#052759] pb-2 hover:scale-105 transition-transform cursor-pointer">
                        ADOTADOS
                    </h2>
                </div>

            </div>
        </div>
    )
}