// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, deleteCategory } from '../api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data || []);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addCategory({ name });
    setName('');
    loadCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="container mt-4">
      <h2>Manage Categories</h2>
      <form onSubmit={handleAdd} className="d-flex gap-2 mb-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="New Category" />
        <button className="btn btn-primary">Add</button>
      </form>
      <ul className="list-group">
        {categories.map((cat) => (
          <li key={cat.id} className="list-group-item d-flex justify-content-between">
            {cat.name}
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
