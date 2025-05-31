import React, { useState, useEffect } from 'react';
import { addTransaction, getCategories } from '../api';

const TransactionForm = ({ userId, onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'income',
    category: '',
    user: { id: userId },
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, user: { id: userId } }));
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(formData);
      setFormData({
        title: '',
        amount: '',
        type: 'income',
        category: '',
        user: { id: userId },
      });
      onTransactionAdded();
    } catch (error) {
      console.error("Add transaction failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
      <h5>Add Transaction</h5>
      <input
        type="text"
        className="form-control my-2"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        className="form-control my-2"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <select
        className="form-select my-2"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        className="form-select my-2"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <button className="btn btn-success mt-2">Add</button>
    </form>
  );
};

export default TransactionForm;
