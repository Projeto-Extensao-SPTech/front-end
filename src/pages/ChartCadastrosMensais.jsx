import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function ChartCadastrosMensais() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await axios.get("http://localhost:7000/dashboard/monthly-registrations");
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
  const totals = data.map(d => d.total); // total de cadastros por mês

  const chartData = {
    series: [
      { data: totals, name: "Cadastros realizados" }
    ],
    options: {
      chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false }, background: "transparent" },
      colors: ["#FFFFFF"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 4 },
      xaxis: { categories: months, labels: { style: { colors: "#FFF", fontSize: "20px", fontWeight: 600 } } },
      yaxis: { labels: { style: { colors: "#FFF", fontSize: "20px", fontWeight: 600 } } }
    }
  };

  return (
    <div className="w-9/12 mt-[-450px] ml-10">
      {loading ? (
        <p className="text-white text-xl">Carregando gráfico...</p>
      ) : (
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={480} />
      )}
    </div>
  );
}
