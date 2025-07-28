import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="bi bi-heart-pulse me-2"></i>HealthCare.Ice
                </Link>
                
                {/* Mobile toggle button */}
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
                
                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/search-doctor">
                                <i className="bi bi-calendar-check me-1"></i>Appointments
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">
                                <i className="bi bi-star me-1"></i>Reviews
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Auth buttons */}
                    <div className="d-flex">
                        <Link to="/signup" className="btn btn-outline-light me-2">
                            <i className="bi bi-person-plus me-1"></i>Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            <i className="bi bi-box-arrow-in-right me-1"></i>Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;