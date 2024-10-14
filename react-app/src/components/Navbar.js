import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, onLogout }) => {
  return (
    <nav className="navbar" >
      <h1>Restaurant Customer Management</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li style={{ color: 'white', fontWeight: 'bold' }}><h2 style={{ textAlign: 'center', textDecoration: 'none' }}>Welcome, {username}</h2></li>
            <li><br></br></li>
            <li style={{ color: 'white', fontWeight: 'bold', margin: '0 30px' }}><Link to="/add" style={{ color: 'yellow', textDecoration: 'none' }}>Add Customer</Link></li>
            <li style={{ color: 'white', fontWeight: 'bold', margin: '0 30px' }}><Link to="/" style={{ color: 'yellow', textDecoration: 'none' }}>View Customers</Link></li>
            <li style={{ color: 'white', fontWeight: 'bold', margin: '0 30px' }}><Link to="/restaurant" style={{ color: 'yellow', textDecoration: 'none' }}>Restaurants Management</Link></li>
            <li style={{ color: 'white', fontWeight: 'bold', margin: '0 30px' }}><a href="http://127.0.0.1:8080" target = "blank" rel="noopener noreferrer" style={{ color: 'cyan', textDecoration: 'none' }}>Predict Rating</a></li>
            <li style={{ color: 'white', fontWeight: 'bold', margin: '0 30px' }}><button onClick={onLogout} style={{  backgroundColor: '#333',color: 'white', textDecoration: 'none' }}>Logout</button></li>
          </>
        ) : (
          <>
            <li style={{ color: 'white', fontWeight: 'bold' }}><Link to="/login" style={{ color: 'yellow', textDecoration: 'none' }}>Login</Link></li>
            <li style={{ color: 'white', fontWeight: 'bold' }}><Link to="/register" style={{ color: 'yellow', textDecoration: 'none' }}>Register</Link></li>
            <li style={{ color: 'white', fontWeight: 'bold' }}><a href="http://127.0.0.1:8080" target = "blank" rel="noopener noreferrer" style={{ color: 'cyan', textDecoration: 'none' }}>Predict Rating</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
