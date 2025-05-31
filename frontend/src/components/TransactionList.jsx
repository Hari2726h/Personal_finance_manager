import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../api';

const TransactionList = ({ userId, refreshFlag, onTransactionDeleted }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [userId, refreshFlag]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions(userId);
      setTransactions(res.data || []);
    } catch (error) {
      console.error("Fetch transactions failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      onTransactionDeleted(); // Notify parent to refresh
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5>Transaction List</h5>
      <table className="table table-hover mt-3">
        <thead className="table-primary">
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.title}</td>
                <td>{tx.amount}</td>
                <td>{tx.type}</td>
                <td>{tx.category}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(tx.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
