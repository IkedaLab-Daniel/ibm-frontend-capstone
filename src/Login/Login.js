import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Here you would typically handle the login logic
            console.log('Login attempt:', formData);
            alert('Login successful! Welcome back.');
            
            // Reset form on successful login
            setFormData({
                email: '',
                password: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Invalid email or password. Please try again.' });
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
                                    {errors.general && (
                                        <div className="alert alert-danger" role="alert">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {errors.general}
                                        </div>
                                    )}

                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email" 
                                            name="email"
                                            placeholder="Enter your email" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="password" 
                                            name="password"
                                            placeholder="Enter your password" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                                        <a href="/signup" className="text-primary text-decoration-none"> Sign up here</a>
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
