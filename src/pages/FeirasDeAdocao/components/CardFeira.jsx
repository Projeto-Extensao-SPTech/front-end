import { MapPin, Clock, Calendar } from "lucide-react";
import { formatHour, formatDate } from "../utils/dateFormatter";

export default function CardFeira({
    feira,
    isSelected,
    jaTemInteresse,
    onClick,
}) {
    return (
        <div
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`Feira de adoção em ${feira.address.street}, ${formatDate(
                feira.fair_date
            )}`}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick();
                }
            }}
            className={`group min-w-[280px] lg:min-w-0 bg-white rounded-2xl p-3 cursor-pointer
                flex flex-col outline-none transform transition-all duration-300 relative
                focus-visible:ring-[3px] focus-visible:ring-[#FFD166]
                ${isSelected
                    ? "ring-[5px] ring-[#FCAD0B] shadow-[0_0_0_2px_rgba(252,173,11,0.4),0_12px_40px_rgba(252,173,11,0.55)]"
                    : "ring-1 ring-black/5 shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                }`}
        >
            {isSelected && (
                <div
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[17px] w-0 h-0
                        border-t-[14px] border-b-[14px] border-l-[17px]
                        border-t-transparent border-b-transparent border-l-[#FCAD0B]"
                    style={{ filter: "drop-shadow(2px 0 2px rgba(0,0,0,0.15))" }}
                />
            )}

            {jaTemInteresse && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow z-10">
                    ✓ Interesse
                </span>
            )}

            <div className="flex gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#FCAD0B] rounded-lg p-1.5 shrink-0">
                            <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#052759] font-bold text-sm leading-tight">
                            {formatDate(feira.fair_date)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1 text-[#052759]">
                        <Clock className="w-3 h-3 text-[#FCAD0B] shrink-0" />
                        <span className="text-xs font-semibold">
                            {formatHour(feira.fair_hour)}
                        </span>
                    </div>

                    <div className="flex items-start gap-1.5 text-[#052759]">
                        <MapPin className="w-3 h-3 text-[#FCAD0B] mt-0.5 shrink-0" />
                        <span className="text-[11px] font-semibold leading-snug break-words">
                            {feira.address.street}, Nº {feira.address.number}
                        </span>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden shrink-0 bg-[#052759]/5 self-start">
                    <img
                        src={feira.card_image}
                        alt=""
                        className="w-[60px] h-[60px] object-cover"
                    />
                </div>
            </div>

            <div
                className={`mt-auto flex items-center justify-center gap-1.5 text-[11px] font-bold rounded-lg py-1.5 transition-colors
                    ${isSelected
                        ? "bg-[#FCAD0B] text-[#052759]"
                        : "bg-[#052759]/5 text-[#052759]/60 group-hover:bg-[#052759]/10"
                    }`}
            >
                {isSelected ? "Feira selecionada" : "Ver pets e localização"}
            </div>
        </div>
    );
}
