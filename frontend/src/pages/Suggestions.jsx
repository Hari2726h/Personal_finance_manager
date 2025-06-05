// src/pages/Suggestions.jsx
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const Suggestions = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    const res = await getTransactions(userId);
    const data = res.data || [];
    setTransactions(data);

    let income = 0;
    let expense = 0;
    const categoryMap = {};

    data.forEach((t) => {
      const amt = Number(t.amount);
      if (t.type === 'income') income += amt;
      else {
        expense += amt;
        categoryMap[t.category] = (categoryMap[t.category] || 0) + amt;
      }
    });

    setIncome(income);
    setExpense(expense);

    const sortedCategories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setTopCategories(sortedCategories);
  };

  const savingsTarget = (income * 0.2).toFixed(2);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Smart Budget Suggestions</h2>

      <div className="card p-3 mb-3 shadow-sm">
        <h5>Total Income: ₹{income}</h5>
        <h5>Total Expense: ₹{expense}</h5>
        <h5>Suggested Monthly Savings Target: ₹{savingsTarget}</h5>
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <h5>Top Overspending Categories</h5>
        <ul className="list-group mt-2">
          {topCategories.map(([cat, amt]) => (
            <li key={cat} className="list-group-item d-flex justify-content-between">
              <span>{cat}</span>
              <span>₹{amt.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-3 shadow-sm">
        <h5>Budgeting Tips</h5>
        <ul className="mt-2">
          <li>🏦 Aim to save at least 20% of your income every month.</li>
          <li>📉 Track and limit spending in high-expense categories.</li>
          <li>🛍️ Avoid unnecessary purchases and impulse shopping.</li>
          <li>💳 Set monthly category limits to build discipline.</li>
        </ul>
      </div>
    </div>
  );
};

export default Suggestions;
