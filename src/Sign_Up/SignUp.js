import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields are filled
        if (!formData.role || !formData.name || !formData.phone || !formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        // Basic phone validation
        if (formData.phone.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

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
                                            className="form-select" 
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
                                            value={formData.name}
                                            onChange={handleInputChange}
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
                                            value={formData.phone}
                                            onChange={handleInputChange}
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
                                            value={formData.email}
                                            onChange={handleInputChange}
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
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <i className="bi bi-person-plus me-2"></i>Create Account
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

export default SignUp;
