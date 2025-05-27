import React from 'react';

export default function WalletCashList({ entries }) {
  return (
    <div className="mt-4">
      <h5>Wallet Cash Entries</h5>
      <ul className="list-group">
        {entries.map((entry, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            {entry.date} - {entry.type}: ₹{entry.cash}
          </li>
        ))}
      </ul>
    </div>
  );
}
