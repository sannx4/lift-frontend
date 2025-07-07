import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function MacroPieChart({ protein, carbs, fat }) {
  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Macros (g)',
        data: [protein, carbs, fat],
        backgroundColor: [
          'rgba(34,197,94,0.7)',   // green
          'rgba(234,179,8,0.7)',   // yellow
          'rgba(239,68,68,0.7)',   // red
        ],
        borderColor: [
          'rgba(34,197,94,1)',
          'rgba(234,179,8,1)',
          'rgba(239,68,68,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}g` } },
    },
    animation: { animateScale: true },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mt-4 w-80 h-80 hover:scale-105 transform transition duration-300 ease-in-out">
      <h2 className="text-lg font-semibold text-green-800 mb-3 text-center">🥗 Macro Breakdown</h2>
      <div className="relative h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default MacroPieChart;
