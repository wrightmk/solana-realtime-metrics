import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../../Loading";
import { TTps } from "../../../types";

type TpsTimeSeriesChartProps = {
  data: TTps[];
};

const TpsTimeSeriesChart: React.FC<TpsTimeSeriesChartProps> = ({ data }) => {
  const [seriesData, setSeriesData] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Sort data by slot in ascending order
    const sortedData = data.slice().sort((a, b) => a.slot - b.slot);

    // Transform sorted data to { x, y } format
    const transformedData = sortedData.map((d) => ({
      x: d.slot,
      y: Math.round(d.tps * 100) / 100, // Round TPS to two decimal places
    }));
    setSeriesData(transformedData);
  }, [data]);

  if (seriesData.length === 0) {
    return <Loading />;
  }

  const series = [{ name: "TPS", data: seriesData }];

  const options = {
    chart: {
      type: "area" as const,
      zoom: { enabled: false },
      redrawOnWindowResize: false,
    },

    xaxis: {
      title: {
        text: "Slot",
        style: {
          color: "#858585",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          colors: "#858585",
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      title: {
        text: "TPS",
        style: {
          color: "#858585",
          fontSize: "14px",
        },
      },
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
        style: {
          colors: "#858585",
          fontSize: "12px",
        },
      },
    },
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#8731DD",
            opacity: 0.5,
          },
          {
            offset: 100,
            color: "#8731DD",
            opacity: 0.1,
          },
        ],
      },
    },
    colors: ["#8731DD"],
    tooltip: {
      style: {
        fontSize: "14px",
        color: "#FFFFFF",
      },
      theme: "dark",
      marker: {
        fillColors: ["#8731DD"],
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default TpsTimeSeriesChart;
