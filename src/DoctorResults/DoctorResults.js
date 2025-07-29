import React from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';

const DoctorResults = () => {
    // Sample doctor data - this would typically come from your API
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            experience: "10 years",
            rating: 4.8,
            totalReviews: 124,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "City Medical Center",
            bio: "Experienced cardiologist specializing in preventive cardiology and heart disease treatment.",
            education: "MD from Harvard Medical School",
            languages: ["English", "Spanish"]
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "Dermatologist",
            experience: "8 years",
            rating: 4.9,
            totalReviews: 98,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "Skin Care Clinic",
            bio: "Board-certified dermatologist with expertise in medical and cosmetic dermatology.",
            education: "MD from Johns Hopkins University",
            languages: ["English", "Mandarin"]
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            specialty: "Pediatrician",
            experience: "12 years",
            rating: 4.7,
            totalReviews: 156,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "Children's Health Center",
            bio: "Dedicated pediatrician committed to providing comprehensive care for children of all ages.",
            education: "MD from Stanford University",
            languages: ["English", "Spanish", "Portuguese"]
        },
        {
            id: 4,
            name: "Dr. James Wilson",
            specialty: "Orthopedic Surgeon",
            experience: "15 years",
            rating: 4.6,
            totalReviews: 87,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "Orthopedic Sports Medicine",
            bio: "Expert orthopedic surgeon specializing in sports medicine and joint replacement.",
            education: "MD from Mayo Clinic",
            languages: ["English"]
        },
        {
            id: 5,
            name: "Dr. Lisa Thompson",
            specialty: "Neurologist",
            experience: "9 years",
            rating: 4.8,
            totalReviews: 72,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "Neuroscience Institute",
            bio: "Neurologist with focus on headache disorders and movement disorders.",
            education: "MD from University of California",
            languages: ["English", "French"]
        },
        {
            id: 6,
            name: "Dr. Robert Kim",
            specialty: "Psychiatrist",
            experience: "11 years",
            rating: 4.9,
            totalReviews: 134,
            image: "/doctor_images/1690923295547doctor1.PNG",
            location: "Mental Health Center",
            bio: "Compassionate psychiatrist specializing in anxiety, depression, and trauma therapy.",
            education: "MD from Yale University",
            languages: ["English", "Korean"]
        }
    ];

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12">
                        <h2 className="text-center mb-3 fw-bold text-primary">
                            Find the Right Doctor for You
                        </h2>
                        <p className="text-center text-muted mb-4">
                            Browse our network of qualified healthcare professionals and book your appointment today.
                        </p>
                        <div className="text-center mb-4">
                            <span className="badge bg-primary fs-6 px-3 py-2">
                                {doctors.length} Doctors Available
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {doctors.map(doctor => (
                        <div key={doctor.id} className="col-lg-4 col-md-6 col-sm-12">
                            <DoctorCard doctor={doctor} />
                        </div>
                    ))}
                </div>

                {/* Additional Features Section */}
                <div className="row mt-5 pt-4 border-top">
                    <div className="col-12">
                        <div className="text-center">
                            <h4 className="mb-3 text-primary">Why Choose Our Platform?</h4>
                            <div className="row g-4">
                                <div className="col-md-3 col-sm-6">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="bi bi-shield-check fs-1 text-success mb-2"></i>
                                        <h6 className="fw-bold">Verified Doctors</h6>
                                        <p className="text-muted small">All doctors are licensed and verified</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="bi bi-calendar-check fs-1 text-primary mb-2"></i>
                                        <h6 className="fw-bold">Easy Booking</h6>
                                        <p className="text-muted small">Book appointments in just a few clicks</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="bi bi-clock fs-1 text-warning mb-2"></i>
                                        <h6 className="fw-bold">Flexible Hours</h6>
                                        <p className="text-muted small">Morning, afternoon, and evening slots</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="bi bi-star-fill fs-1 text-info mb-2"></i>
                                        <h6 className="fw-bold">Top Rated</h6>
                                        <p className="text-muted small">Highly rated by patients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Filters Section */}
                <div className="row mt-5 pt-4 border-top">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-center mb-4">Refine Your Search</h5>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Specialty</label>
                                        <select className="form-select">
                                            <option value="">All Specialties</option>
                                            <option value="cardiologist">Cardiologist</option>
                                            <option value="dermatologist">Dermatologist</option>
                                            <option value="pediatrician">Pediatrician</option>
                                            <option value="orthopedic">Orthopedic Surgeon</option>
                                            <option value="neurologist">Neurologist</option>
                                            <option value="psychiatrist">Psychiatrist</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Location</label>
                                        <select className="form-select">
                                            <option value="">All Locations</option>
                                            <option value="downtown">Downtown</option>
                                            <option value="uptown">Uptown</option>
                                            <option value="suburbs">Suburbs</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Rating</label>
                                        <select className="form-select">
                                            <option value="">All Ratings</option>
                                            <option value="4.5">4.5+ Stars</option>
                                            <option value="4.0">4.0+ Stars</option>
                                            <option value="3.5">3.5+ Stars</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Experience</label>
                                        <select className="form-select">
                                            <option value="">Any Experience</option>
                                            <option value="15">15+ Years</option>
                                            <option value="10">10+ Years</option>
                                            <option value="5">5+ Years</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <button className="btn btn-primary btn-lg px-4">
                                        <i className="bi bi-search me-2"></i>
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorResults;
