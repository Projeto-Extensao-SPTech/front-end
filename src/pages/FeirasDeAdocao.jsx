import { useState, useEffect, useRef } from 'react';
import { api } from "../api/apiUserService";
import { parseISO, format } from 'date-fns';
import Button from '../components/ui/Button';
import { useAlertUtils } from '../hooks/useAlertUtils';
import { handleHttpFeedback } from '../js/utils/handleHttpFeedback';

function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
}

export default function FeirasDeAdocao() {

    const [headerRef, headerVisible] = useScrollReveal(0.1);
    const [paginationRef, paginationVisible] = useScrollReveal(0.1);
    const [feiraCardsRef, feiraCardsVisible] = useScrollReveal(0.1);
    const [petsRef, petsVisible] = useScrollReveal(0.1);

    const [feiraSelecionada, setFeiraSelecionada] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [feiras, setFeiras] = useState([]);


    function selectText() {
        if (feiras.length === 0) {
            return "Nenhuma feira de adoção disponível no momento.";
        }else{
            return "Veja abaixo os pets disponíveis na feira selecionada:";
        }
    }

    async function getFairs() {
        try {
            const response = await api.get('/feiras');
            const data = response.data.map(feiras => ({
                ...feiras,
                card_image: randomImage()
            }));
            setFeiras(data);
        }
        catch (error) {
            console.error("Erro ao buscar feiras de adoção:", error);
        }
    }

    function randomImage() {
        const images = [
            '/img-card1.png',
            '/img-card2.png',
            '/img-card3.png',
            '/img-card4.png',
            '/img-card5.png',
            '/img-card6.png',
            '/img-card7.png'
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    useEffect(() => {
        getFairs();
    }, []);

    const CARDS_POR_PAGINA = 3;
    const totalPaginas = Math.ceil(feiras.length / CARDS_POR_PAGINA);

    const indiceInicio = (paginaAtual - 1) * CARDS_POR_PAGINA;
    const indiceFim = indiceInicio + CARDS_POR_PAGINA;
    const feirasVisiveis = feiras.slice(indiceInicio, indiceFim);

    const selecionarFeira = (index) => setFeiraSelecionada(index);
    const mudarPagina = (pagina) => setPaginaAtual(pagina);

    return (
        <div className="min-h-screen bg-[#052759] py-8 px-4 lg:px-8 relative overflow-hidden">

            <img src="/img-fade.png" alt="" className="absolute top-0 left-0 w-40 h-40" />

            <div className="max-w-7xl mx-auto mb-12">

                <div
                    ref={headerRef}
                    className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 transition-all duration-700
                        ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
                    `}
                >
                    <div className="lg:w-2/5">
                        <h1 className="text-3xl lg:text-4xl text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <span className="font-light">NAVEGUE PELAS</span><br />
                            <span className="font-bold">FEIRAS DE</span><br />
                            <span>ADOÇÃO</span>
                        </h1>
                    </div>

                    <div className="lg:w-3/5 w-full">

                        <nav
                            ref={paginationRef}
                            className={`flex justify-center gap-6 mb-6 transition-all duration-700
                                ${paginationVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            `}
                        >
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                                <button
                                    key={pagina}
                                    onClick={() => mudarPagina(pagina)}
                                    className={`text-xl font-light transition-all duration-500 ${paginaAtual === pagina
                                        ? 'text-white scale-125 drop-shadow-lg'
                                        : 'text-white/30 hover:text-white/60'
                                        }`}
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                >
                                    {pagina}
                                </button>
                            ))}
                        </nav>

                        <div
                            ref={feiraCardsRef}
                            className={`flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:grid lg:grid-cols-3 transition-all duration-700
                                ${feiraCardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            `}
                        >
                            {feirasVisiveis.map((feira, indexNaPagina) => {
                                const indexGlobal = indiceInicio + indexNaPagina;
                                const isSelected = feiraSelecionada === indexGlobal;

                                return (
                                    <div
                                        key={feira.id}
                                        style={{ transitionDelay: `${indexNaPagina * 150}ms` }}
                                        className="transition-all duration-700"
                                    >
                                        <CardFeira
                                            feira={feira}
                                            isSelected={isSelected}
                                            onClick={() => selecionarFeira(indexGlobal)}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>

            <div
                ref={petsRef}
                className={`max-w-7xl mx-auto transition-all duration-700
                    ${petsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
            >
                <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8">
                    Veja abaixo quais serão os pets presentes na Feira selecionada!
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {selectText()}
                </h2>

                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
                        {feiras[feiraSelecionada]?.images?.map((image, index) => (
                            <CardPet key={index} image={image} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardFeira({ feira, isSelected, onClick }) {
    const alert = useAlertUtils();

    function formatHour(iso) {
        if (!iso) return '';
        const afterT = iso.split('T')[1] || '';
        return afterT.slice(0, 5);
    }

    function formatDate(isoDate) {
        if (!isoDate) return '';
        const date = parseISO(isoDate);
        return format(date, 'dd/MM');
    }

    async function fairInterest() {
        try {
            const response = await api.patch(`/feiras/${feira.id}`);
            handleHttpFeedback(alert, response, {
                successTitle: "Interesse registrado!",
                successMessage: `Agradecemos seu interesse na feira de adoção em ${feira.address.street}.`,
            });
        } catch (error) {
            handleHttpFeedback(alert, error.response, {
                errorTitle: "Erro ao registrar interesse",
                errorMessage: "Não foi possível registrar seu interesse. Tente novamente mais tarde.",
            })
        }
    }

    return (
        <div
            onClick={onClick}
            className={`min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-6 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 relative
                ${isSelected ? 'scale-105' : ''}
                shadow-[inset_0_8px_30px_0_rgba(0,0,0,0.4)]
            `}
            style={{ height: '380px' }}
        >
            <Button className="absolute -top-2 -right-4 bg-[#FCAD0B] text-[#052759] text-sm font-bold" onClick={fairInterest}>
                Tenho interesse
            </Button>

            <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full transition-all duration-300 
                ${isSelected ? 'bg-white' : 'bg-white/40'}
            " />

            <div className="text-left mb-6">
                <span className="text-[#052759] font-normal text-2xl">
                    {formatDate(feira.fair_date)}
                </span>
            </div>

            <div className="text-center">
                <h3 className="font-semibold text-[#052759] text-xl mb-3">
                    {formatHour(feira.fair_hour)}
                </h3>
                <p className="text-[#052759] text-sm font-normal">
                    {feira.address.street}, {feira.address.number}
                </p>
            </div>

            <div className="flex justify-start mt-8 -ml-6">
                <img
                    src={feira.card_image}
                    alt="pet"
                    className="w-40 h-40 object-cover rounded-r-xl"
                />
            </div>
        </div>
    );
}

function CardPet({ image, index }) {

    const imageUrl = `http://localhost:7000/feiras/images/${image}`;

    return (
        <div
            className="group relative transition-all duration-700 opacity-0 translate-y-6"
            style={{
                animation: "fadeUp 0.6s forwards",
                animationDelay: `${index * 0.12}s`
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
