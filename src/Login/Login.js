import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
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
        
        if (!formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically handle the login logic
        console.log('Login attempt:', formData);
        alert('Login functionality will be implemented here');
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
                                            placeholder="Enter your password" 
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <i className="bi bi-box-arrow-in-right me-2"></i>Login
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
