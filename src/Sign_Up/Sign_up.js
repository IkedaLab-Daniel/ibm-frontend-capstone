import React, { useState } from 'react';

const Sign_Up = () => {
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        phone: '',
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

        // Role validation
        if (!formData.role) {
            newErrors.role = 'Please select a role';
        }

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Name can only contain letters and spaces';
        }

        // > Phone validation
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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
            
            // Here you would typically handle the signup logic
            console.log('Sign up attempt:', formData);
            alert('Account created successfully! Please login.');
            
            // Reset form
            setFormData({
                role: '',
                name: '',
                phone: '',
                email: '',
                password: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
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
                                    <h2 className="fw-bold text-primary">Sign Up</h2>
                                    <p className="text-muted">Create your account</p>
                                </div>
                                
                                <form onSubmit={handleSubmit}>
                                    {/* Role Field */}
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select 
                                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                            id="role" 
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select your role</option>
                                            <option value="patient">Patient</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                    </div>

                                    {/* Name Field */}
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name" 
                                            name="name"
                                            placeholder="Enter your full name" 
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input 
                                            type="tel" 
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            id="phone" 
                                            name="phone"
                                            placeholder="Enter your phone number" 
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>

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
                                            placeholder="Create a password" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        <div className="form-text">
                                            Password must be at least 8 characters and contain uppercase, lowercase, and number.
                                        </div>
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
                                        <a href="/login" className="text-primary text-decoration-none"> Login here</a>
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
