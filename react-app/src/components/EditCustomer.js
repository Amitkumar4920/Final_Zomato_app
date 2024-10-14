import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
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

  // Fetch customer details when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get(`http://localhost:5000/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCustomer(response.data); // Set the customer data
      })
      .catch(error => {
        setError('Failed to fetch customer details');
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the customer
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.put(`http://localhost:5000/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/'); // Redirect to the customer list after successful update
      })
      .catch(error => {
        setError('Failed to update customer');
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
      <h2 style={{ marginBottom: '20px' }}>Edit Customer</h2>
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
            value={customer.name}
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
            value={customer.email}
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
            value={customer.phone}
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
            value={customer.address}
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
            value={customer.dish_selected}
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
            value={customer.rating}
            onChange={handleChange}
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
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
