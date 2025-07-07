import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './assets/tspmo.jpeg';

import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
  const checkToken = () => {
    setToken(localStorage.getItem('token'));
  };

  // Trigger check on storage changes across tabs
  window.addEventListener('storage', checkToken);

  // Also trigger check when user returns to the tab
  window.addEventListener('focus', checkToken);

  return () => {
    window.removeEventListener('storage', checkToken);
    window.removeEventListener('focus', checkToken);
  };
}, []);



  return (
    <Router>
      <div className="min-h-screen bg-blue-50">
        {/* Navbar */}
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-center">
            {/* Brand + micro-tagline */}
            <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-bold text-blue-700 tracking-wide">
  fitness tracker:Mern Project
</span>

          
        </div>

            {/* Navigation buttons */}
            <div className="space-x-2">
              {!token && (
                <>
                  <Link to="/register">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm">
                      Login
                    </button>
                  </Link>
                </>
              )}
              {token && (
                <Link to="/dashboard">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm">
                    Dashboard
                  </button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Routes */}
        <div className="flex justify-center p-4">
          <div className="w-full max-w-2xl">
            <Routes>
              <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
        <footer className="bg-white shadow mt-8 p-4 text-center text-gray-500 text-sm">
  © 2025 ur.healthGPT. All rights reserved.
</footer>

      </div>
    </Router>
  );
}

export default App;
