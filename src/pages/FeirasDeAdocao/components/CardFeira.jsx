import Button from "../../../components/ui/Button";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { registrarInteresse } from "../services/feiraService";
import { formatHour, formatDate } from "../utils/dateFormatter";
import { MapPin } from "lucide-react";

export default function CardFeira({
    feira,
    isSelected,
    onClick,
    jaTemInteresse,
    onRegistrarInteresse,
}) {
    const alert = useAlertUtils();

    async function fairInterest() {
        const result = await registrarInteresse(
            feira.id,
            feira.address.street,
            alert
        );

        if (result.success) {
            onRegistrarInteresse();
        }
    }

    return (
        <div
            onClick={onClick}
            className={`min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-6 shadow-2xl cursor-pointer transform transition-all duration-500 relative
                ${isSelected
                    ? "scale-105 ring-2 ring-[#FCAD0B] shadow-[0_8px_30px_rgba(252,173,11,0.3)]"
                    : "hover:scale-105 ring-2 ring-transparent"
                }
                shadow-[inset_0_8px_30px_0_rgba(0,0,0,0.4)]
            `}
            style={{ height: "380px" }}
        >
            <Button
                className={`absolute -top-2 -right-4 text-sm font-bold z-20 transition-all duration-300
                    ${jaTemInteresse
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-[#FCAD0B] text-[#052759] hover:bg-[#FFD166]"
                    }
                `}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!jaTemInteresse) {
                        fairInterest();
                    }
                }}
                disabled={jaTemInteresse}
            >
                {jaTemInteresse ? "✓ Interesse registrado!" : "Tenho interesse"}
            </Button>

            <div
                className={`absolute -bottom-9 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center
                    ${isSelected ? "bg-[#FCAD0B] scale-110" : "bg-white/40"}
                `}
            >
                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#FCAD0B] rounded-md p-2">
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <span className="text-[#052759] font-bold text-xl">
                    {formatDate(feira.fair_date)}
                </span>
            </div>

            <div className="space-y-3 mb-4">
                <div className="bg-gradient-to-r from-[#FCAD0B]/10 to-transparent rounded-lg p-3 border-l-4 border-[#FCAD0B]">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#FCAD0B] rounded-md p-1.5">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-[#052759]/50 text-[10px] font-semibold uppercase tracking-wide">
                                Horário
                            </p>
                            <h3 className="font-bold text-[#052759] text-xl leading-tight">
                                {formatHour(feira.fair_hour)}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#052759]/5 to-[#052759]/10 rounded-lg p-3 border border-[#052759]/10">
                    <div className="flex items-start gap-2">
                        <div className="bg-[#052759] rounded-md p-1.5 mt-0.5">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[#052759]/50 text-[10px] font-semibold uppercase tracking-wide mb-1">
                                Localização
                            </p>
                            <div className="space-y-1">
                                <p className="text-[#052759] text-sm font-bold leading-tight break-words">
                                    {feira.address.street}
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-0.5 bg-gradient-to-r from-[#FCAD0B] to-transparent rounded-full"></div>
                                    <p className="text-[#052759]/70 text-xs font-semibold">
                                        Nº {feira.address.number}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-start -ml-6">
                <img
                    src={feira.card_image}
                    alt="pet"
                    className="w-32 h-32 object-cover rounded-r-xl"
                />
            </div>
        </div>
    );
}
