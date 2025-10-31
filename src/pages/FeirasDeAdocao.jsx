import { useState } from 'react';

export default function FeirasDeAdocao() {

    const [feiraSelecionada, setFeiraSelecionada] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const fotosDogs = [
        '/img-card1.png',
        '/img-card2.png',
        '/img-card3.png'
    ];

    const fotosPetsFeira = [
        '/img-petfeira1.png',
        '/img-petfeira2.png',
        '/img-petfeira3.png',
        '/img-petfeira4.png'
    ];

    const feiras = [
        {
            id: 1,
            data: '20/12',
            bairro: 'Barra Funda',
            rua: 'Rua dos Alfeneiros',
            numero: '123',
            horario: '14:00 - 18:00',
            pets: [
                { id: 1, nome: 'Kiara', foto: '/img-petfeira1.png' }, 
                { id: 2, nome: 'Jailton', foto: '/img-petfeira2.png' }, 
                { id: 3, nome: 'Hugo', foto: '/img-petfeira3.png' }, 
                { id: 4, nome: 'Cueca', foto: '/img-petfeira4.png' }  
            ]
        },
        {
            id: 2,
            data: '22/12',
            bairro: 'Jardins',
            rua: 'Av. Paulista',
            numero: '1500',
            horario: '10:00 - 16:00',
            pets: [
                { id: 1, nome: 'Aiello', foto: '/img-petfeira1.png' },
                { id: 2, nome: 'Pereira', foto: '/img-petfeira2.png' }  
            ]
        },
        {
            id: 3,
            data: '25/12',
            bairro: 'Mauá',
            rua: 'Rua da Amizade',
            numero: '300',
            horario: '09:00 - 15:00',
            pets: [
                { id: 1, nome: 'Liriel', foto: '/img-petfeira1.png' },
                { id: 2, nome: 'Angel', foto: '/img-petfeira2.png' },
                { id: 3, nome: 'Zukauskas', foto: '/img-petfeira3.png' }
            ]
        },
        {
            id: 4,
            data: '28/12',
            bairro: 'Moema',
            rua: 'Rua Alguma Coisa',
            numero: '450',
            horario: '13:00 - 17:00',
            pets: [
                { id: 1, nome: 'Caio', foto: '/img-petfeira1.png' }, 
                { id: 2, nome: 'Frizza', foto: '/img-petfeira2.png' } 
            ]
        }
    ];

    const cardsPorPagina = 3;
    const totalPaginas = Math.ceil(feiras.length / cardsPorPagina);
    const feirasNaPagina = feiras.slice(
        (paginaAtual - 1) * cardsPorPagina,
        paginaAtual * cardsPorPagina
    );

    return (
        <div className="min-h-screen bg-[#052759] py-8 px-4 lg:px-8 relative overflow-hidden">

            <img
                src="/img-fade.png"
                alt="Decoração"
                className="absolute top-0 left-0 w-40 h-40"
            />

            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">

                    <div className="lg:w-2/5">
                        <h1 className="text-3xl lg:text-4xl text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <span className="font-light">NAVEGUE PELAS</span>
                            <p className="font-bold">FEIRAS DE</p>
                            <p>ADOÇÃO</p>
                        </h1>
                    </div>

                    <div className="lg:w-3/5 w-full">

                        <div className="flex justify-center gap-6 mb-6">
                            {Array.from({ length: totalPaginas }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPaginaAtual(i + 1)}
                                    className={`text-xl font-light transition-all duration-500 ${paginaAtual === i + 1
                                        ? 'text-white scale-125 drop-shadow-lg'
                                        : 'text-white/30 hover:text-white/60'
                                        }`}
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:grid lg:grid-cols-3">
                            {feirasNaPagina.map((feira, index) => (
                                <div
                                    key={feira.id}
                                    onClick={() => setFeiraSelecionada(feira.id - 1)}
                                    className={`min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative ${feiraSelecionada === feira.id - 1
                                        ? 'scale-105'
                                        : ''
                                        } shadow-[inset_0_8px_30px_0_rgba(0,0,0,0.4)]`}
                                    style={{ height: '380px' }}
                                >

                                    <div className={`absolute -bottom-9 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full transition-all duration-300 ${feiraSelecionada === feira.id - 1
                                        ? 'bg-white'
                                        : 'bg-white/40'
                                        }`}></div>

                                    <div className="text-left mb-6">
                                        <span className="text-gray-600 font-normal text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {feira.data}
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="font-semibold text-[#052759] text-xl mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {feira.bairro}
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="text-[#052759] text-sm font-normal" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {feira.rua}, {feira.numero}
                                            </p>
                                            <p className="text-[#052759] text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                                {feira.horario}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-start mt-8 -ml-6">
                                        <img
                                            src={fotosDogs[index % fotosDogs.length]}
                                            alt="Cachorro para adoção"
                                            className="w-40 h-40 object-cover rounded-r-xl shadow-lg"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Veja abaixo quais serão os pets presentes na Feira selecionada!
                    </h2>
                </div>

                {feiras[feiraSelecionada] && (
                    <div className="flex justify-center">
                        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                            {feiras[feiraSelecionada].pets.map((pet) => (
                                <div
                                    key={pet.id}
                                    className=" rounded-2xl p-4 shadow-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-36 flex-shrink-0"
                                >
                                    <img
                                        src={pet.foto}
                                        alt={pet.nome}
                                        className="w-28 h-28 object-cover rounded-xl mx-auto mb-3"
                                    />
                                    <h3
                                        className="font-bold text-white text-xl"
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                    >
                                        {pet.nome}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}