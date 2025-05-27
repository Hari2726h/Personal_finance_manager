import React, { useState } from 'react';

export default function WalletCashForm({ onSave }) {
  const [cash, setCash] = useState('');
  const [type, setType] = useState('Morning');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      cash: parseFloat(cash),
      type,
      date: new Date().toISOString().slice(0, 10)
    });
    setCash('');
    setType('Morning');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>Log Wallet Cash</h5>
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Cash Amount"
        value={cash}
        onChange={e => setCash(e.target.value)}
        required
      />
      <select className="form-control mb-2" value={type} onChange={e => setType(e.target.value)}>
        <option>Morning</option>
        <option>Night</option>
      </select>
      <button className="btn btn-primary">Save Wallet Cash</button>
    </form>
  );
}
