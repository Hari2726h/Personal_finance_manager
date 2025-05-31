// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';
import PieChart from '../components/PieChart';

const Dashboard = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions(userId);
      const data = res.data || [];

      let income = 0, expense = 0;
      data.forEach(t => {
        if (t.type === 'income') income += Number(t.amount);
        else expense += Number(t.amount);
      });

      setSummary({ income, expense });
      setTransactions(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-success p-3 shadow-sm">
            <h5>Total Income</h5>
            <h4>₹{summary.income}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger p-3 shadow-sm">
            <h5>Total Expenses</h5>
            <h4>₹{summary.expense}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary p-3 shadow-sm">
            <h5>Balance</h5>
            <h4>₹{summary.income - summary.expense}</h4>
          </div>
        </div>
      </div>
      <PieChart
        data={[
          { label: 'Income', value: summary.income },
          { label: 'Expenses', value: summary.expense },
        ]}
      />
    </div>
  );
};

export default Dashboard;
