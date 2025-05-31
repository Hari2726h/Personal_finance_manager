// src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';
import PieChart from '../components/PieChart';

const Reports = ({ userId }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [userId]);

  const fetchReports = async () => {
    const res = await getTransactions(userId);
    const data = res.data || [];

    const categoryMap = {};

    data.forEach((t) => {
      const key = t.category || 'Uncategorized';
      categoryMap[key] = (categoryMap[key] || 0) + Number(t.amount);
    });

    const chartFormatted = Object.entries(categoryMap).map(([label, value]) => ({
      label,
      value,
    }));

    setChartData(chartFormatted);
  };

  return (
    <div className="container mt-4">
      <h2>Reports</h2>
      {chartData.length > 0 ? (
        <PieChart data={chartData} />
      ) : (
        <p>No transactions found for report.</p>
      )}
    </div>
  );
};

export default Reports;
