import React, { useState, useEffect } from 'react';
import { addTransaction, getCategories } from '../api';

const TransactionForm = ({ userId, onTransactionAdded }) => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'income',
    category: '',
    paymentMethod: '',
    emotional: false,
    date: today,
    user: { id: userId },
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user: { id: userId }
    }));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
        paymentMethod: '',
        emotional: false,
        date: today,
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

      <input
        type="date"
        className="form-control my-2"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <select
  className="form-control my-2"
  name="paymentMethod"
  value={formData.paymentMethod}
  onChange={handleChange}
  required
>
  <option value="">Select Payment Method</option>
  <option value="Cash">Cash</option>
  <option value="Credit Card">Credit Card</option>
  <option value="Debit Card">Debit Card</option>
  <option value="UPI">UPI</option>
  <option value="Net Banking">Net Banking</option>
  <option value="Other">Other</option>
</select>


      <div className="form-check my-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="emotional"
          checked={formData.emotional}
          onChange={handleChange}
        />
        <label className="form-check-label">Emotional Spending</label>
      </div>

      <button className="btn btn-success mt-2">Add</button>
    </form>
  );
};

export default TransactionForm;
