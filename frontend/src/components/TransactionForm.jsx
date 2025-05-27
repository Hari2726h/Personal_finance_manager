import React, { useState } from 'react';

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    paymentMethod: 'Cash',
    emotional: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd({
      ...form,
      amount: parseFloat(form.amount),
      date: new Date().toISOString().slice(0, 10)
    });
    setForm({
      title: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      paymentMethod: 'Cash',
      emotional: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="title" className="form-control mb-2" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="amount" className="form-control mb-2" type="number" value={form.amount} onChange={handleChange} required />

      <select name="type" className="form-control mb-2" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select name="category" className="form-control mb-2" value={form.category} onChange={handleChange}>
        <option value="Food">Food</option>
        <option value="Bills">Bills</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Others">Others</option>
      </select>

      <select name="paymentMethod" className="form-control mb-2" value={form.paymentMethod} onChange={handleChange}>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
      </select>

      <div className="form-check mb-2">
        <input type="checkbox" name="emotional" className="form-check-input" checked={form.emotional} onChange={handleChange} />
        <label className="form-check-label">Was this emotional spending?</label>
      </div>

      <button className="btn btn-success">Add Transaction</button>
    </form>
  );
}
