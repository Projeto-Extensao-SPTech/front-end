import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ChartCadastros() {
  const chartData = {
    series: [
      {
        data: [10, 41, 35, 51, 49, 62, 69, 91, 120],
        name: "Cadastros realizados",
      }
    ],
    options: {
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
        background: "transparent",
        height: "100%", // 🔥 AGORA O GRÁFICO OCUPA 100% DA ALTURA
      },
      colors: ["#FFFFFF"],
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3
      },
      grid: {
        borderColor: "#ffffff33",
        strokeDashArray: 0,
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10
        }
      },
      xaxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
        labels: {
          style: { 
            colors: "#FFF", 
            fontSize: "12px", 
            fontWeight: 500 
          }
        }
      },
      yaxis: {
        labels: {
          style: { 
            colors: "#FFF", 
            fontSize: "12px", 
            fontWeight: 500 
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-full mt-20">
      {/* 🔥 TIREI A DIV QUE LIMITAVA O GRÁFICO */}
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height="100%" // 🔥 100% DA ALTURA DO CONTAINER PAI
        width="100%"
      />
    </div>
  )
}