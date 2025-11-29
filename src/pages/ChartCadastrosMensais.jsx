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
        background: "transparent"
      },

      colors: ["#FFFFFF"],

      dataLabels: { enabled: false },

      stroke: {
        curve: "smooth", 
        width: 4
      },

      grid: {
        borderColor: "#ffffff33",
        strokeDashArray: 0
      },

      xaxis: {
        categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"],
        labels: {
          style: { colors: "#FFF", fontSize: "20px", fontWeight: 600 }
        }
      },

      yaxis: {
        labels: {
          style: { colors: "#FFF", fontSize: "20px", fontWeight: 600 }
        }
      }
    }
  };

  return (
    <div className="w-9/12 mt-[-450px] ml-10">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={480}
        
      />
    </div>
  )
}