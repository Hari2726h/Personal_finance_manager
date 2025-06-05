// src/pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Reports = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [categorySummary, setCategorySummary] = useState({});

  useEffect(() => {
    if (userId) {
      getTransactions(userId).then((res) => {
        setTransactions(res.data);
      });
    }
  }, [userId]);

  useEffect(() => {
    const monthMap = {};
    const categoryMap = {};

    transactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
      monthMap[month] = monthMap[month] || { income: 0, expense: 0 };
      categoryMap[tx.category] = categoryMap[tx.category] || 0;

      const amt = parseFloat(tx.amount);
      if (tx.type === 'income') {
        monthMap[month].income += amt;
      } else {
        monthMap[month].expense += amt;
      }
      categoryMap[tx.category] += amt;
    });

    setMonthlyData(monthMap);
    setCategorySummary(categoryMap);
  }, [transactions]);

  const months = Object.keys(monthlyData);
  const incomeData = months.map((m) => monthlyData[m].income);
  const expenseData = months.map((m) => monthlyData[m].expense);

  const categories = Object.keys(categorySummary);
  const categoryValues = categories.map((c) => categorySummary[c]);

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">Financial Report</h3>

      <div className="row mb-4">
        <div className="col-md-6">
          <h5 className="text-center">Income vs Expense (Bar)</h5>
          <Bar
            data={{
              labels: months,
              datasets: [
                {
                  label: 'Income',
                  data: incomeData,
                  backgroundColor: '#28a745',
                },
                {
                  label: 'Expense',
                  data: expenseData,
                  backgroundColor: '#dc3545',
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="col-md-6">
          <h5 className="text-center">Spending by Category (Pie)</h5>
          <div style={{ position: 'relative', height: '300px' }}>
            <Pie
              data={{
                labels: categories,
                datasets: [
                  {
                    data: categoryValues,
                    backgroundColor: [
                      '#007bff',
                      '#ffc107',
                      '#dc3545',
                      '#28a745',
                      '#6f42c1',
                      '#17a2b8',
                      '#fd7e14',
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h5>
          Total Savings: ₹
          {(incomeData.reduce((a, b) => a + b, 0) - expenseData.reduce((a, b) => a + b, 0)).toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default Reports;
