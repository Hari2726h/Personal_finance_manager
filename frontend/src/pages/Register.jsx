// src/pages/Register.jsx
import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(form);
      navigate('/login'); // redirect to login after registration
    } catch (err) {
      setError('Username already exists');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" className="form-control mb-2" placeholder="Username" value={form.username}
          onChange={handleChange} required />
        <input name="password" type="password" className="form-control mb-2" placeholder="Password" value={form.password}
          onChange={handleChange} required />
        <button className="btn btn-success w-100">Register</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
      <p className="mt-2">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
