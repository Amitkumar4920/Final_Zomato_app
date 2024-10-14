import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';
import RestaurantManager from './components/RestaurantManager';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };
  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        <br></br><br></br>
        <Routes>
          <Route path="/" element={isAuthenticated ? <CustomerList /> : <Navigate to="/login" />} />
          <Route path="/add" element={isAuthenticated ? <AddCustomer /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={isAuthenticated ? <EditCustomer /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurant" element={isAuthenticated ? <RestaurantManager /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
