// src/components/PieChart.js
import React, { useRef, useState } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const PieChart = ({ data = [] }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [chartType, setChartType] = useState('pie');
  const chartRef = useRef(null);

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-muted">No data to display.</p>;
  }

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: ['#007bff', '#dc3545'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#000',
          boxWidth: 10,
        },
      },
    },
    scales:
      chartType === 'bar'
        ? {
            x: {
              ticks: { color: darkMode ? '#fff' : '#000' },
            },
            y: {
              ticks: { color: darkMode ? '#fff' : '#000' },
            },
          }
        : {},
  };

  const exportAsImage = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'chart.png';
      link.click();
    });
  };

  const exportAsPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL(), 'PNG', 10, 10, 180, 100);
      pdf.save('chart.pdf');
    });
  };

  const ChartComp =
    chartType === 'bar' ? Bar : chartType === 'doughnut' ? Doughnut : Pie;

  return (
    <div className={`card p-2 ${darkMode ? 'bg-dark text-white' : ''}`} style={{ maxWidth: 400, margin: 'auto' }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
        <select
          className="form-select form-select-sm w-auto"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="pie">Pie</option>
          <option value="doughnut">Doughnut</option>
          <option value="bar">Bar</option>
        </select>
        <button className="btn btn-sm btn-outline-success" onClick={exportAsImage}>
          PNG
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={exportAsPDF}>
          PDF
        </button>
      </div>
      <div ref={chartRef} style={{ height: 200, maxWidth: 350, margin: 'auto' }}>
        <ChartComp data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
