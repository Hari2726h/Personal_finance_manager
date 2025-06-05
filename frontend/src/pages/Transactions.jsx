import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions } from '../api';

const Transactions = ({ userId }) => {
  const [refresh, setRefresh] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [userId, refresh]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions(userId);
      setTransactions(res.data || []);
    } catch (error) {
      console.error("Fetch transactions failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Transactions</h2>
      <TransactionForm userId={userId} onTransactionAdded={() => setRefresh(!refresh)} />
      <TransactionList
        transactions={transactions}
        onTransactionDeleted={() => setRefresh(!refresh)}
      />
    </div>
  );
};

export default Transactions;
