import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Suggestions from './pages/Suggestions';
import Reports from './pages/Reports';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const visited = localStorage.getItem('visited');

    if (storedUserId && token) {
      setLoggedInUserId(parseInt(storedUserId, 10));
    }

    if (!visited) {
      localStorage.setItem('visited', 'true');
      setIsFirstVisit(true);
    }
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar loggedInUserId={loggedInUserId} setLoggedInUserId={setLoggedInUserId} />

        <main className="container my-4" style={{ flex: 1 }}>
          <Routes>
            {/* Redirect to Register only if first visit, else login */}
            <Route
              path="/"
              element={isFirstVisit ? <Register /> : <Navigate to="/login" />}
            />

            {/* Public Routes */}
            <Route
              path="/login"
              element={loggedInUserId ? <Navigate to="/dashboard" /> : <Login setLoggedInUserId={setLoggedInUserId} />}
            />
            <Route
              path="/register"
              element={loggedInUserId ? <Navigate to="/dashboard" /> : <Register />}
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={loggedInUserId ? <Dashboard userId={loggedInUserId} /> : <Navigate to="/login" />}
            />
            <Route
              path="/suggestions"
              element={loggedInUserId ? <Suggestions userId={loggedInUserId} /> : <Navigate to="/login" />}
            />
            <Route
              path="/transactions"
              element={loggedInUserId ? <Transactions userId={loggedInUserId} /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories"
              element={loggedInUserId ? <Categories userId={loggedInUserId} /> : <Navigate to="/login" />}
            />
            <Route
              path="/reports"
              element={loggedInUserId ? <Reports userId={loggedInUserId} /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
