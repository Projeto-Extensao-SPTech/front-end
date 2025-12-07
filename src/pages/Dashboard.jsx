import React, { useEffect, useState } from "react";
import ChartCadastrosMensais from "./ChartCadastrosMensais";
import { BarChart3, Calendar, MapPin, Users } from "lucide-react";
import {api} from "../api/apiUserService";

export default function Dashboard() {
  const [monthInterest, setMonthInterest] = useState("-");
  const [locationInterest, setLocationInterest] = useState("-");
  const [volunteerDay, setVolunteerDay] = useState("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        

        const [monthResp, locationResp, volunteerResp] = await Promise.all([
          api.get(`dashboard/month-most-interest`),
          api.get(`dashboard/location-most-interest`),
          api.get(`dashboard/day-most-volunteers`)
        ]);

        setMonthInterest(monthResp.data?.label || "-");
        setLocationInterest(locationResp.data?.label || "-");
        setVolunteerDay(volunteerResp.data?.day || "-");

      } catch (err) {
        console.error("Erro carregando KPIs:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

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

        {/* TÍTULO */}
        <div className="max-w-6xl mx-auto mb-3">
          <h1 className="text-xl md:text-2xl font-bold text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Painel de Administração
          </h1>
          <p className="text-gray-500 text-xs">Métricas e insights importantes</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3">

          {/* CARD DO GRÁFICO */}
          <div className="bg-gradient-to-r from-[#052759] via-[#0a3a8a] to-[#1e4fa0] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-4 shadow-md border border-blue-100/20 flex items-center gap-2 relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 rounded-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cadastros Mensais
                </p>
                <p className="text-gray-500 text-xs">Análise do crescimento anual</p>
              </div>
            </div>

            <div className="h-52 pt-2 pb-4 relative z-10">
              <ChartCadastrosMensais />
            </div>

            <img
              className="absolute bottom-[-20px] right-[-8px] h-40 opacity-80 pointer-events-none"
              src="img-dog2-dash.png"
              alt="Ilustração"
            />
          </div>

          {/* --- KPIs --- */}
          <div className="flex flex-col gap-4">

            {/* KPI MÊS */}
          <div className="bg-gradient-to-r from-[#0f3875] via-[#215dc4] to-[#2a69cf] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">
              <KpiHeader iconBg="from-amber-400 to-orange-500" Icon={Calendar} title="Mês com Maior Interesse" subtitle="Período de maior procura" />
              <KpiValue label={loading ? "..." : monthInterest} color="from-amber-400 to-orange-500" img="img-dog-dash.png" />
            </div>

            {/* KPI LOCAL */}
          <div className="bg-gradient-to-r from-[#0f3875] via-[#215dc4] to-[#2a69cf] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">
              <KpiHeader iconBg="from-emerald-400 to-teal-500" Icon={MapPin} title="Local com Maior Interesse" subtitle="Área mais requisitada" />
              <KpiValue label={loading ? "..." : locationInterest} color="from-emerald-400 to-teal-500" img="img-cat-dash.png" />
            </div>

            {/* KPI VOLUNTÁRIOS */}
          <div className="bg-gradient-to-r from-[#0f3875] via-[#215dc4] to-[#2a69cf] rounded-xl p-4 shadow-xl relative animate-[fadeIn_0.6s_ease-out] overflow-hidden">
              <KpiHeader iconBg="from-purple-400 to-pink-500" Icon={Users} title="Dia com Maior Movimentação" subtitle="Pico de voluntários" />
              <KpiValue label={loading ? "..." : volunteerDay} color="from-purple-400 to-pink-500" img="img-voluntario-dash.png" />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

/* --- COMPONENTES INTERNOS DE DESIGN PARA NÃO REPETIR CÓDIGO --- */

function KpiHeader({ Icon, iconBg, title, subtitle }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 mb-2 shadow-sm relative flex items-center gap-2">
      <div className={`bg-gradient-to-br ${iconBg} p-1.5 rounded-lg`}>
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <p className="font-bold text-sm text-[#052759]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </p>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function KpiValue({ label, img, color }) {
  return (
    <div className="flex justify-between items-center relative min-h-[64px]">
      <div className={`bg-gradient-to-r ${color} rounded-full px-4 py-1.5 shadow-lg`}>
        <p className="font-bold text-base text-white drop-shadow-md">{label}</p>
      </div>
      <img className="absolute bottom-[-12px] right-[-12px] w-20 h-20 object-contain drop-shadow-lg" src={img} />
    </div>
  );
}
