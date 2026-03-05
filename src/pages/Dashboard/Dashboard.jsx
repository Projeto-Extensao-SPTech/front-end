import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import useDashboard from "./hooks/useDashboard";
import ChartCard from "./components/ChartCard";
import KpiCard from "./components/KpiCard";

export default function Dashboard() {
    const { monthInterest, locationInterest, volunteerDay, loading } =
        useDashboard();

    return (
        <>
            <style>{`
          @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
              from { opacity: 0; transform: translateX(30px); }
              to { opacity: 1; transform: translateX(0); }
          }
      `}</style>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
                <div className="max-w-6xl mx-auto mb-3">
                    <h1
                        className="text-xl md:text-2xl font-bold text-[#052759]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                        Painel de Administração
                    </h1>
                    <p className="text-gray-500 text-xs">Métricas e insights importantes</p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">
                    <ChartCard />

                    <div className="flex flex-col gap-4">
                        <KpiCard
                            Icon={Calendar}
                            iconBg="from-amber-400 to-orange-500"
                            title="Mês com maior interesse"
                            subtitle="Período de maior procura"
                            label={loading ? "..." : monthInterest}
                            color="from-amber-400 to-orange-500"
                            img="img-dog-dash.png"
                        />

                        <KpiCard
                            Icon={MapPin}
                            iconBg="from-emerald-400 to-teal-500"
                            title="Local com maior interesse"
                            subtitle="Área mais requisitada"
                            label={loading ? "..." : locationInterest}
                            color="from-emerald-400 to-teal-500"
                            img="img-cat-dash.png"
                        />

                        <KpiCard
                            Icon={Users}
                            iconBg="from-purple-400 to-pink-500"
                            title="Dia com maior disponibilidade de voluntários"
                            subtitle="Pico de voluntários"
                            label={loading ? "..." : volunteerDay}
                            color="from-purple-400 to-pink-500"
                            img="img-voluntario-dash.png"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
