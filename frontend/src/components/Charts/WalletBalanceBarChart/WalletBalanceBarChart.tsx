import React from "react";
import ReactApexChart from "react-apexcharts";
import Loading from "../../Loading";
import { WalletBalance } from "../../../types";

type WalletBalanceBarChartProps = {
  data: WalletBalance[];
};

const WalletBalanceBarChart: React.FC<WalletBalanceBarChartProps> = ({
  data,
}) => {
  if (data.length === 0) {
    return <Loading />;
  }

  const balances = data.map((wallet) => wallet.balance);
  const address = data.map((wallet) => wallet.address);

  const series = [
    {
      name: "Balance",
      data: balances,
    },
  ];
  const options = {
    chart: {
      type: "bar" as const,
      redrawOnWindowResize: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      labels: {
        formatter: function (str: string) {
          const n = 10;
          return str.length > n ? str.substr(0, n - 1) + "..." : str;
        },
        style: {
          colors: "#858585",
          fontSize: "12px",
        },
      },
      title: {
        text: "Address",
        style: {
          color: "#858585",
          fontSize: "14px",
        },
      },
      categories: address,
    },
    yaxis: {
      title: {
        text: "Balance (sol)",
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
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => val.toFixed(8), // Format the balance to 8 decimal places
      },
      x: {
        formatter: (val: number) => address[val], // Show full address in tooltip
      },
      style: {
        fontSize: "14px",
        color: "#FFFFFF",
      },
      theme: "dark",
      marker: {
        fillColors: ["#8731DD"],
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
    colors: ["#8731DD"],
  };

  return (
    <ReactApexChart
      key={JSON.stringify(data)}
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default WalletBalanceBarChart;
