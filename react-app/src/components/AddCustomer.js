import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dish_selected: '',
    rating: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/customers', customer, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setError('Failed to add customer');
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Add Customer</h2>
      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
      }}>
        <label style={{ marginBottom: '5px' }}>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <label style={{ marginBottom: '5px' }}>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <label style={{ marginBottom: '5px' }}>
          Phone:
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <label style={{ marginBottom: '5px' }}>
          Address:
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <label style={{ marginBottom: '5px' }}>
          Dish Selected:
          <input
            type="text"
            name="dish_selected"
            placeholder="Dish Selected"
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <label style={{ marginBottom: '5px' }}>
          Rating:
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            step='0.1'
            required
            style={{
              padding: '10px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
