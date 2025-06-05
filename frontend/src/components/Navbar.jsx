import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ loggedInUserId, setLoggedInUserId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setLoggedInUserId(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand" to="/">Finance Manager</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
       <ul className="navbar-nav ms-auto">
  {loggedInUserId ? (
    <>
      <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/transactions">Transactions</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/categories">Categories</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/suggestions">Suggestions</Link></li>
      <li className="nav-item">
        <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
    </>
  )}
</ul>

      </div>
    </nav>
  );
};

export default Navbar;
