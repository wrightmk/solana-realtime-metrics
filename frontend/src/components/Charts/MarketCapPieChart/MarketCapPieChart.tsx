import React from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../../Loading";

type MarketCapPieChartProps = {
  data: { name: string; marketCap: number }[];
};

const MarketCapPieChart: React.FC<MarketCapPieChartProps> = ({ data }) => {
  // Check if data is empty, and display a loading state if true
  if (data.length === 0) {
    return <Loading />;
  }

  const series = data.map((token) => token.marketCap);
  const labels = data.map((token) => token.name.toUpperCase());

  const options = {
    chart: {
      type: "pie" as const,
      redrawOnWindowResize: false,
    },
    legend: {
      position: "bottom" as const,
      labels: {
        colors: "#858585",
        fontSize: "12px",
      },
    },
    labels,
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart
      key={JSON.stringify(data)}
      options={options}
      series={series}
      type="pie"
      height={350}
    />
  );
};

export default MarketCapPieChart;
