// src/pages/Dashboard.js
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

      let income = 0,
        expense = 0;
      data.forEach((t) => {
        if (t.type === 'income') income += Number(t.amount);
        else expense += Number(t.amount);
      });

      setSummary({ income, expense });
      setTransactions(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const pieData = [
    { label: 'Income', value: summary.income },
    { label: 'Expense', value: summary.expense },
  ];

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
            <h5>Total Expense</h5>
            <h4>₹{summary.expense}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary p-3 shadow-sm">
            <h5>Net Balance</h5>
            <h4>₹{summary.income - summary.expense}</h4>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Income vs Expense</h5>
        <PieChart data={pieData} />
      </div>

      <div className="card shadow-sm p-4">
        <h5 className="mb-3">Recent Transactions</h5>
        {transactions.length === 0 ? (
          <p>No transactions available.</p>
        ) : (
          <ul className="list-group">
            {transactions.slice(0, 5).map((t) => (
              <li key={t.id} className="list-group-item d-flex justify-content-between">
                <span>{t.title}</span>
                <span className={t.type === 'income' ? 'text-success' : 'text-danger'}>
                  ₹{t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
