import React from 'react';

export default function TransactionList({ transactions, onDelete }) {
  return (
    <ul className="list-group">
      {transactions.map(tx => (
        <li key={tx.id} className="list-group-item d-flex justify-content-between align-items-start flex-column mb-2">
          <div className="w-100">
            <strong>{tx.title}</strong> - ₹{tx.amount} ({tx.type})  
            <div className="small text-muted">
              Category: {tx.category}, Method: {tx.paymentMethod}, Emotional: {tx.emotional ? 'Yes' : 'No'}
            </div>
          </div>
          <button className="btn btn-danger btn-sm mt-1 align-self-end" onClick={() => onDelete(tx.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
