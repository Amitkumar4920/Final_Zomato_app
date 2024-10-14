import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  // Fetch the list of customers when the component loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.get('http://localhost:5000/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setCustomers(response.data))
      .catch(error => setError('Failed to fetch customers'));
  }, []);

  // Handle customer deletion
  const deleteCustomer = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized access');
      return;
    }

    axios.delete(`http://localhost:5000/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        // Update the customer list after successful deletion
        setCustomers(customers.filter(customer => customer.id !== id));
      })
      .catch(error => setError('Failed to delete customer'));
  };

  return (
    <div className="customer-list" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Customer List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
      }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Phone</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Address</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dish Selected</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Rating</th>
            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.email}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.phone}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.address}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.dish_selected}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.rating}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                <Link to={`/edit/${customer.id}`}>
                  <button style={{
                    backgroundColor: 'yellow',
                    color: 'black',
                    border: 'none',
                    padding: '5px 10px',
                    marginRight: '5px',
                    cursor: 'pointer'
                  }}>Edit</button>
                </Link>
                <button onClick={() => deleteCustomer(customer.id)} style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
