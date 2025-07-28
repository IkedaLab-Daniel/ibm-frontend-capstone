import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                {/* Logo */}
                <a className="navbar-brand fw-bold" href="#">
                    <i className="bi bi-heart-pulse me-2"></i>HealthCare.Ice
                </a>
                
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
                            <a className="nav-link" href="search-doctor.html">
                                <i className="bi bi-calendar-check me-1"></i>Appointments
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="reviews.html">
                                <i className="bi bi-star me-1"></i>Reviews
                            </a>
                        </li>
                    </ul>
                    
                    {/* Auth buttons */}
                    <div className="d-flex">
                        <a href="signup.html" className="btn btn-outline-light me-2">
                            <i className="bi bi-person-plus me-1"></i>Sign Up
                        </a>
                        <a href="login.html" className="btn btn-light">
                            <i className="bi bi-box-arrow-in-right me-1"></i>Login
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;