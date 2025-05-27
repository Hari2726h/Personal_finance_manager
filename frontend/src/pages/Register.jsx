import { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', email: '', fullName: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await register(form);
      localStorage.setItem('userId', res.data.id);
      navigate('/dashboard');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {['username', 'email', 'fullName', 'phone', 'password'].map(field => (
          <input key={field} className="form-control mb-2" name={field} placeholder={field} onChange={handleChange} required />
        ))}
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
