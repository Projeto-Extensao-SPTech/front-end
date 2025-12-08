import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {api} from "../api/apiUserService";

export default function ChartCadastrosMensais() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await api.get("/dashboard/monthly-registrations");
        setData(resp.data);
      } catch (err) {
        console.error("Erro ao carregar gráfico:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const months = data.map(d => d.month);
  const totals = data.map(d => d.total);

  const chartData = {
    series: [
      { data: totals, name: "Cadastros realizados" }
    ],
    options: {
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
        background: "transparent",
        height: "100%",
      },
      colors: ["#FFFFFF"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      grid: {
        borderColor: "#ffffff33",
        padding: { top: 0, right: 10, bottom: 0, left: 10 }
      },
      xaxis: {
        categories: months,
        labels: {
          style: { colors: "#FFF", fontSize: "12px", fontWeight: 500 }
        }
      },
      yaxis: {
        labels: {
          style: { colors: "#FFF", fontSize: "12px", fontWeight: 500 }
        }
      }
    }
  };

  return (
    <div className="h-full w-full">
      {loading ? (
        <p className="text-white text-sm">Carregando gráfico...</p>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height="100%"
        />
      )}
    </div>
  );
}
