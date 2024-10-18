import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const BarChart = ({ chartData, month }) => {
  const getMonthName = (monthNumber) => {
    return new Date(0, monthNumber - 1).toLocaleString("en", { month: "long" });
  };

  // Prepare data for the Bar chart
  const data = {
    labels: chartData.map((item) => item.range),
    datasets: [
      {
        label: "Items in Price Range",
        data: chartData.map((item) => item.count),
        backgroundColor: "rgba(122, 227, 248, 0.8)", // light blue color
        borderRadius: 2, // rounded bars
        barPercentage: 0.2, // adjust bar width
      },
    ],
  };

  // Chart options for customization
  const options = {
    plugins: {
      legend: {
        display: false, // hide legend
      },
      title: {
        display: true,
        text: `Bar Chart Stats - ${getMonthName(month)}`,
        font: {
          size: 30,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
        color: "#000",
        align: "start",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#666",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // remove grid lines from x-axis
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#666",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "#ccc", // light grey grid lines
        },
      },
    },
  };

  return (
    <div style={chartContainerStyle}>
      <Bar data={data} options={options} />
    </div>
  );
};

// Inline styles for container
const chartContainerStyle = {
  width: "80%",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#EAF4F4",
  borderRadius: "10px",
};

export default BarChart;
