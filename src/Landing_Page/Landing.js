import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <section className="hero bg-light py-5">
            <div className="container">
                <div className="row align-items-center min-vh-75">
                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold text-primary mb-4">
                            Your Health, Our Priority
                        </h1>
                        <p className="lead mb-4 text-muted">
                            Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. 
                            Book your appointment today and take the first step towards better health.
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3">
                            <Link to="/search-doctor" className="btn btn-primary btn-lg">
                                <i className="bi bi-calendar-plus me-2"></i>Book Appointment
                            </Link>
                            <button className="btn btn-outline-primary btn-lg">
                                <i className="bi bi-play-circle me-2"></i>Learn More
                            </button>
                        </div>
                        
                        {/* Stats */}
                        <div className="row mt-5">
                            <div className="col-4">
                                <div className="text-center">
                                    <h3 className="fw-bold text-primary">500+</h3>
                                    <p className="small text-muted">Happy Patients</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <h3 className="fw-bold text-primary">50+</h3>
                                    <p className="small text-muted">Expert Doctors</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="text-center">
                                    <h3 className="fw-bold text-primary">24/7</h3>
                                    <p className="small text-muted">Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="text-center">
                            <img 
                                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Healthcare Team" 
                                className="img-fluid rounded-3 shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
