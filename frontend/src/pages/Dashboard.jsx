import React, { useEffect, useState } from 'react';
import { getTransactions, addTransaction, deleteTransaction } from '../api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import WalletCashForm from '../components/WalletCashForm';
import WalletCashList from '../components/WalletCashList';

export default function Dashboard() {
  const userId = localStorage.getItem('userId');
  const [transactions, setTransactions] = useState([]);
  const [walletCash, setWalletCash] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    getTransactions(userId).then(res => setTransactions(res.data));
  };

  const onAdd = (tx) => {
    addTransaction({ ...tx, user: { id: userId } }).then(refresh);
  };

  const onDelete = (id) => {
    deleteTransaction(id).then(refresh);
  };

  const onWalletCashSave = (entry) => {
    setWalletCash(prev => [...prev, entry]);
  };

  const summary = transactions.reduce((acc, t) => {
    acc[t.type] += t.amount;
    return acc;
  }, { income: 0, expense: 0 });

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p><strong>Income:</strong> ₹{summary.income} | <strong>Expense:</strong> ₹{summary.expense} | <strong>Balance:</strong> ₹{summary.income - summary.expense}</p>
      
      <TransactionForm onAdd={onAdd} />
      <TransactionList transactions={transactions} onDelete={onDelete} />
      
      <WalletCashForm onSave={onWalletCashSave} />
      <WalletCashList entries={walletCash} />
    </div>
  );
}
