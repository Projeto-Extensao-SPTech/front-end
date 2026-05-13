import { useNavigate } from 'react-router-dom';

export default function CardAjuda({
    cardRef,
    cardVisible,
    icone,
    bgInicio,
    bgFim,
    titulo,
    descricao,
    onSaibaMais,
    accentColor = "#052759",
}) {
    const navigate = useNavigate();

    const handleSaibaMais = () => {
        const userDataString = sessionStorage.getItem("USER_DATA");
        if (!userDataString) {
            navigate('/auth?mode=login');
            return;
        }
        onSaibaMais();
    };

    return (
        <div
            ref={cardRef}
            className="bg-white rounded-[20px] overflow-hidden flex flex-col"
            style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible ? "translateY(0)" : "translateY(2rem)",
                transition: "opacity 700ms ease, transform 700ms ease",
                boxShadow: "0 12px 40px rgba(0,0,0,0.24)",
            }}
        >
            <div
                className="h-[120px] flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${bgInicio}, ${bgFim})` }}
            >
                {icone}
            </div>

            <div className="flex-1 flex flex-col gap-2.5 p-5 pb-6">

                <div className="flex items-start gap-2">
                    <div
                        className="w-2 h-2 rounded-full shrink-0 mt-1"
                        style={{ background: accentColor }}
                    />
                    <h3 className="font-bold text-[#052759] text-[15px] leading-snug m-0">
                        {titulo}
                    </h3>
                </div>

                <p className="text-gray-400 text-[13px] leading-relaxed flex-1 m-0">
                    {descricao}
                </p>

                <button
                    onClick={handleSaibaMais}
                    className="mt-1.5 text-white border-none outline-none rounded-[11px] py-3 w-full text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-1.5"
                    style={{ background: accentColor }}
                >
                    Saiba mais
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}