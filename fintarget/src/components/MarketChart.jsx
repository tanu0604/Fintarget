// MarketChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MarketChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Crypto Prices',
      },
    },
    scales: {
      x: {
        display: true, // Ensure the x-axis is shown
        title: {
          display: true,
          text: 'Time', // Label for the x-axis
        },
      },
      y: {
        display: true, // Ensure the y-axis is shown
        title: {
          display: true,
          text: 'Price (USDT)', // Label for the y-axis
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MarketChart;
