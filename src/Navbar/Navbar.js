import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // Check authentication status on component mount and when storage changes
    useEffect(() => {
        const checkAuthStatus = () => {
            const authToken = sessionStorage.getItem('auth-token');
            const name = sessionStorage.getItem('name');
            
            if (authToken) {
                setIsLoggedIn(true);
                setUserName(name || 'User');
            } else {
                setIsLoggedIn(false);
                setUserName('');
            }
        };

        // Check on mount
        checkAuthStatus();

        // Listen for storage changes (useful for multiple tabs)
        window.addEventListener('storage', checkAuthStatus);

        // Custom event listener for login/logout actions within the same tab
        window.addEventListener('authStateChange', checkAuthStatus);

        // Cleanup
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            window.removeEventListener('authStateChange', checkAuthStatus);
        };
    }, []);

    // Logout functionality
    const handleLogout = () => {
        // Clear all session storage
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');

        // Update state
        setIsLoggedIn(false);
        setUserName('');

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('authStateChange'));

        // Navigate to home page
        navigate('/');
        
        // Optional: Show logout message
        alert('Logged out successfully!');
    };
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/instant-consultation">
                                <i className="bi bi-calendar-check me-1"></i>Instant Consultation
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Auth buttons */}
                    <div className="d-flex align-items-center">
                        {isLoggedIn ? (
                            // Logged in state - show user info and logout
                            <>
                                <span className="text-light me-3">
                                    <i className="bi bi-person-circle me-1"></i>
                                    Welcome, {userName}!
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="btn btn-outline-light"
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i>Logout
                                </button>
                            </>
                        ) : (
                            // Logged out state - show login and signup buttons
                            <>
                                <Link to="/signup" className="btn btn-outline-light me-2">
                                    <i className="bi bi-person-plus me-1"></i>Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-light">
                                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;