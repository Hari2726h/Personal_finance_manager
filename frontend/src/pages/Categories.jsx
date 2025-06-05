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
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addCategory({ name });
      setName('');
      loadCategories();
    } catch (error) {
      console.error('Add category failed:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error('Delete category failed:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📂 Manage Categories</h2>

      <form onSubmit={handleAdd} className="d-flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="New Category (e.g., Food, Travel)"
        />
        <button className="btn btn-success">➕ Add</button>
      </form>

      <h5 className="mb-3 text-muted">You have {categories.length} categories</h5>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {categories.map((cat) => (
          <div key={cat.id} className="col">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <span className="badge bg-primary fs-6">
                  🏷️ {cat.name}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(cat.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
