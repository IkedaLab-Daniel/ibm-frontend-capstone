import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsSubmitting(true);
        setShowerr(''); // Clear previous errors

        // Basic validation
        if (!name || !email || !phone || !password || !role) {
            setShowerr('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }

        try {
            // API Call to register user
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    role: role, // Include role in the request
                }),
            });

            const json = await response.json(); // Parse the response JSON

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("role", role);

                // Dispatch custom event to notify Navbar of auth state change
                window.dispatchEvent(new Event('authStateChange'));

                // Redirect user to home page
                navigate("/");
                // Note: Removed window.location.reload() as it's not needed with proper state management
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg); // Show error messages
                    }
                } else {
                    setShowerr(json.error || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setShowerr('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // JSX to render the Sign Up form
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-primary">Sign Up</h2>
                                    <p className="text-muted">Create your account</p>
                                </div>
                                
                                <form method="POST" onSubmit={register}>
                                    {/* Error Message */}
                                    {showerr && (
                                        <div className="alert alert-danger" role="alert">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {showerr}
                                        </div>
                                    )}

                                    {/* Role Field */}
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select 
                                            className="form-select"
                                            id="role" 
                                            name="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="">Select your role</option>
                                            <option value="patient">Patient</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    {/* Name Field */}
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            id="name" 
                                            name="name"
                                            placeholder="Enter your full name" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                        />
                                    </div>

                                    {/* Phone Field */}
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input 
                                            type="tel" 
                                            className="form-control"
                                            id="phone" 
                                            name="phone"
                                            placeholder="Enter your phone number" 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required 
                                        />
                                    </div>

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
                                            placeholder="Create a password" 
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
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-plus me-2"></i>Create Account
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Login Link */}
                                <div className="text-center mt-4">
                                    <p className="mb-0">Already have an account? 
                                        <Link to="/login" className="text-primary text-decoration-none"> Login here</Link>
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

export default Sign_Up;
