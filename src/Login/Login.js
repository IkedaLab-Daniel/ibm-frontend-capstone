import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setShowerr('');

        // Basic validation
        if (!email || !password) {
            setShowerr('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }

        try {
            // API Call to login user
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", json.name || email); // Use name from response or fallback to email
                sessionStorage.setItem("phone", json.phone || '');
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("role", json.role || 'patient');

                // Dispatch custom event to notify Navbar of auth state change
                window.dispatchEvent(new Event('authStateChange'));

                // Redirect user to home page
                navigate("/");
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg);
                    }
                } else {
                    setShowerr(json.error || 'Invalid email or password. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setShowerr('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
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
                                
                                <form onSubmit={handleSubmit}>
                                    {/* General Error Message */}
                                    {showerr && (
                                        <div className="alert alert-danger" role="alert">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {showerr}
                                        </div>
                                    )}

                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control"
                                            id="email" 
                                            name="email"
                                            placeholder="Enter your email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            id="password" 
                                            name="password"
                                            placeholder="Enter your password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Sign Up Link */}
                                <div className="text-center mt-4">
                                    <p className="mb-0">Don't have an account? 
                                        <Link to="/signup" className="text-primary text-decoration-none"> Sign up here</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
