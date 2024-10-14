import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantManager = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        cuisine: '',
        rating: '',
    });
    
    const [editing, setEditing] = useState(null);

    const fetchRestaurants = async () => {
        const response = await axios.get('http://127.0.0.1:5000/restaurants');
        setRestaurants(response.data);
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://127.0.0.1:5000/restaurants/${editing}`, formData);
        } else {
            await axios.post('http://127.0.0.1:5000/restaurants', formData);
        }
        setFormData({ name: '', location: '', cuisine: '', rating: '' });
        setEditing(null);
        fetchRestaurants();
    };

    const handleEdit = (restaurant) => {
        setFormData({
            name: restaurant.name,
            location: restaurant.location,
            cuisine: restaurant.cuisine,
            rating: restaurant.rating,
        });
        setEditing(restaurant.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/restaurants/${id}`);
        fetchRestaurants();
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center">Restaurant Manager</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-row">
                    <div className="col mb-3">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Restaurant Name"
                            required
                        />
                    </div>
                    <div className="col mb-3">
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Location"
                            required
                        />
                    </div>
                    <div className="col mb-3">
                        <input
                            type="text"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Cuisine"
                            required
                        />
                    </div>
                    <div className="col mb-3">
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Rating"
                            required
                        />
                    </div>
                    <div className="col-auto mb-3">
                        <button type="submit" className="btn btn-primary">
                            {editing ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </form>
            <div className="row">
                {restaurants.map((restaurant) => (
                    <div className="col-md-3 mb-4" key={restaurant.id}>
                        {/* Added border class to the card */}
                        <div className="card shadow-sm border border-primary rounded" style={{ height: '100%' }}>
                            {/* Displaying a sample image */}
                            <img 
                                src={`https://assets.architecturaldigest.in/photos/63733ec2a2dd6ea6560eb6da/16:9/w_1615,h_908,c_limit/Ditas%20Interior%20Image%20-%201%20(8).png`} 
                                alt={restaurant.name} 
                                className="card-img-top" 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text">Location: {restaurant.location}</p>
                                <p className="card-text">Cuisine: {restaurant.cuisine}</p>
                                <p className="card-text">Rating: {restaurant.rating}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(restaurant)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(restaurant.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantManager;