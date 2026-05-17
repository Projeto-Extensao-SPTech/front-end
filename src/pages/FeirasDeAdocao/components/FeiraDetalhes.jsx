import { useMemo } from "react";
import { Calendar, Clock, MapPin, Navigation, PawPrint } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useAlertUtils } from "../../../hooks/useAlertUtils";
import { registrarInteresse } from "../services/feiraService";
import { formatHour, formatDate } from "../utils/dateFormatter";
import CardPet from "./CardPet";

export default function FeiraDetalhes({
    feira,
    jaTemInteresse,
    onRegistrarInteresse,
}) {
    const alert = useAlertUtils();

    const endereco = useMemo(() => {
        if (!feira?.address) return "";
        const { street, number, city, state } = feira.address;
        return [street, number].filter(Boolean).join(", ") + (city ? ` — ${city}/${state}` : "");
    }, [feira]);

    const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        endereco
    )}&output=embed`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        endereco
    )}`;

    const pets = feira?.images ?? [];

    async function handleInteresse() {
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
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-[#052759] px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <p
                        className="text-[#FCAD0B] text-xs font-bold uppercase tracking-wider mb-1"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Feira selecionada
                    </p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-white">
                        <span className="flex items-center gap-2 font-bold text-lg text-white">
                            <Calendar className="w-5 h-5 text-[#FCAD0B]" />
                            {formatDate(feira.fair_date)}
                        </span>
                        <span className="flex items-center gap-2 text-white/80 text-sm font-semibold">
                            <Clock className="w-4 h-4 text-[#FCAD0B]" />
                            {formatHour(feira.fair_hour)}
                        </span>
                    </div>
                </div>

                <Button
                    onClick={() => !jaTemInteresse && handleInteresse()}
                    disabled={jaTemInteresse}
                    className={`text-sm font-bold whitespace-nowrap transition-all duration-300
                        ${jaTemInteresse
                            ? "bg-green-500 text-white cursor-default"
                            : "bg-[#FCAD0B] text-[#052759] hover:bg-[#FFD166]"
                        }`}
                >
                    {jaTemInteresse
                        ? "✓ Interesse registrado"
                        : "Tenho interesse nesta feira"}
                </Button>
            </div>

            <div className="grid lg:grid-cols-2">
                <div className="border-b lg:border-b-0 lg:border-r border-black/5">
                    <div className="px-5 pt-4 pb-1.5 flex items-center gap-2 text-[#052759]">
                        <MapPin className="w-4 h-4 text-[#FCAD0B]" />
                        <h3
                            className="font-bold text-sm"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            Onde acontece
                        </h3>
                    </div>
                    <p className="px-5 pb-2 text-xs text-[#052759]/70 font-medium">
                        {endereco}
                    </p>

                    <div className="px-5">
                        <div className="rounded-2xl overflow-hidden ring-1 ring-black/10">
                            <iframe
                                title={`Mapa da feira em ${endereco}`}
                                src={mapsEmbedUrl}
                                className="w-full h-48 lg:h-56 block"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="px-5 py-3">
                        <a
                            href={mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#052759]
                                bg-[#052759]/5 hover:bg-[#052759]/10 transition-colors rounded-xl px-3 py-2"
                        >
                            <Navigation className="w-4 h-4 text-[#FCAD0B]" />
                            Como chegar
                        </a>
                    </div>
                </div>

                <div>
                    <div className="px-5 pt-4 pb-1.5 flex items-center gap-2 text-[#052759]">
                        <PawPrint className="w-4 h-4 text-[#FCAD0B]" />
                        <h3
                            className="font-bold text-sm"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                            Pets disponíveis nesta feira
                        </h3>
                        {pets.length > 0 && (
                            <span className="ml-1 bg-[#FCAD0B] text-[#052759] text-xs font-bold px-2 py-0.5 rounded-full">
                                {pets.length}
                            </span>
                        )}
                    </div>

                    {pets.length === 0 ? (
                        <div className="px-6 py-14 text-center">
                            <p className="text-[#052759]/50 text-sm font-medium">
                                Os pets desta feira ainda não foram cadastrados.
                            </p>
                        </div>
                    ) : (
                        <div className="px-5 pb-4 pt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
                            {pets.map((image, index) => (
                                <CardPet key={index} image={image} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}