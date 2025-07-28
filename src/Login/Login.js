import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
    // State variables for email and password
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');

    // Get navigation function from react-router-dom
    const navigate = useNavigate();

    // Check if user is already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();
        
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
            // If authentication token is received, store it in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email);

            // Dispatch custom event to notify Navbar of auth state change
            window.dispatchEvent(new Event('authStateChange'));

            // Redirect to home page and reload the window
            navigate('/');
            window.location.reload();
        } else {
            // Handle errors if authentication fails
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-primary">Login</h2>
                                    <p className="text-muted">Welcome back</p>
                                </div>
                                
                                <div className="text-center mb-3">
                                    <p className="mb-0">Are you a new member? 
                                        <Link to="/signup" className="text-primary text-decoration-none"> Sign Up Here</Link>
                                    </p>
                                </div>
                                
                                <form onSubmit={login}>
                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            className="form-control" 
                                            placeholder="Enter your email" 
                                            aria-describedby="helpId"
                                            required
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            className="form-control" 
                                            placeholder="Enter your password" 
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg"
                                        >
                                            <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
