import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setLoggedInUserId }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser(formData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId); // ✅ Store userId
    setLoggedInUserId(res.data.userId);              // ✅ Set userId in state
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data || 'Login failed');
  }
};


  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '10vh' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
