import React, { useState } from 'react';

const Reviews = () => {
    const [selectedDoctor, setSelectedDoctor] = useState({ name: '', specialty: '' });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '',
        rating: 0,
        reviewText: '',
        reviewPhoto: null
    });

    const appointments = [
        {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            date: 'July 15, 2025',
            status: 'reviewed',
            reviewed: true
        },
        {
            id: 2,
            doctorName: 'Dr. Michael Chen',
            specialty: 'Dentist',
            date: 'July 20, 2025',
            status: 'pending',
            reviewed: false
        },
        {
            id: 3,
            doctorName: 'Dr. Emily Rodriguez',
            specialty: 'Dermatologist',
            date: 'July 25, 2025',
            status: 'pending',
            reviewed: false
        }
    ];

    const reviews = [
        {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            specialty: 'Cardiologist',
            rating: 5,
            patientName: 'John Smith',
            date: 'July 16, 2025',
            review: 'Dr. Johnson is absolutely amazing! She took the time to listen to all my concerns and explained everything clearly. The treatment plan she recommended worked perfectly. Highly recommend!'
        },
        {
            id: 2,
            doctorName: 'Dr. James Wilson',
            specialty: 'Neurologist',
            rating: 4.5,
            patientName: 'Maria Garcia',
            date: 'July 14, 2025',
            review: 'Very professional and knowledgeable doctor. The consultation was thorough and he answered all my questions patiently. The clinic staff was also very helpful.'
        },
        {
            id: 3,
            doctorName: 'Dr. Lisa Thompson',
            specialty: 'Pediatrician',
            rating: 5,
            patientName: 'Jennifer Lee',
            date: 'July 12, 2025',
            review: 'Dr. Thompson is wonderful with children! My daughter felt comfortable immediately. She explained everything in a way both my daughter and I could understand. Excellent care!'
        },
        {
            id: 4,
            doctorName: 'Dr. Robert Garcia',
            specialty: 'Orthopedic',
            rating: 4,
            patientName: 'David Miller',
            date: 'July 10, 2025',
            review: 'Great experience overall. Dr. Garcia was thorough in his examination and provided clear treatment options. The recovery process went smoothly thanks to his guidance.'
        }
    ];

    const handleWriteReview = (doctorName, specialty) => {
        setSelectedDoctor({ name: doctorName, specialty });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            patientName: '',
            rating: 0,
            reviewText: '',
            reviewPhoto: null
        });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        
        if (!formData.rating || !formData.patientName || !formData.reviewText) {
            alert('Please fill in all required fields');
            return;
        }

        alert('Thank you for your review! It has been submitted successfully.');
        handleCloseModal();
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half"></i>);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
        }

        return stars;
    };

    return (
        <>
            {/* Reviews Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    {/* Header */}
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h1 className="display-4 fw-bold text-primary">Patient Reviews</h1>
                            <p className="lead text-muted">Share your experience and help others choose the right doctor</p>
                        </div>
                    </div>

                    {/* My Appointments & Reviews Table */}
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white">
                                    <h4 className="mb-0"><i className="bi bi-clipboard-data me-2"></i>My Appointments & Reviews</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Doctor Name</th>
                                                    <th>Specialty</th>
                                                    <th>Appointment Date</th>
                                                    <th>Review Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.map((appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <img src="./doctor.svg" alt={appointment.doctorName} className="rounded-circle me-2" width="40" height="40" />
                                                                <strong>{appointment.doctorName}</strong>
                                                            </div>
                                                        </td>
                                                        <td>{appointment.specialty}</td>
                                                        <td>{appointment.date}</td>
                                                        <td>
                                                            {appointment.reviewed ? (
                                                                <span className="badge bg-success">
                                                                    <i className="bi bi-check-circle me-1"></i>Reviewed
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-warning text-dark">
                                                                    <i className="bi bi-clock me-1"></i>Pending Review
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {appointment.reviewed ? (
                                                                <button className="btn btn-outline-primary btn-sm" disabled>
                                                                    <i className="bi bi-star me-1"></i>Already Reviewed
                                                                </button>
                                                            ) : (
                                                                <button 
                                                                    className="btn btn-primary btn-sm"
                                                                    onClick={() => handleWriteReview(appointment.doctorName, appointment.specialty)}
                                                                >
                                                                    <i className="bi bi-star me-1"></i>Write Review
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Reviews Section */}
                    <div className="row">
                        <div className="col-12">
                            <h3 className="fw-bold text-primary mb-4">Recent Patient Reviews</h3>
                        </div>
                    </div>

                    {/* Review Cards */}
                    <div className="row g-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="col-lg-6">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center mb-3">
                                            <img src="./doctor.svg" alt={review.doctorName} className="rounded-circle me-3" width="60" height="60" />
                                            <div>
                                                <h5 className="card-title fw-bold text-primary mb-1">{review.doctorName}</h5>
                                                <p className="text-muted mb-0">{review.specialty}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <span className="text-warning fs-5">
                                                {renderStars(review.rating)}
                                            </span>
                                            <span className="text-muted ms-2">{review.rating}</span>
                                        </div>
                                        
                                        <blockquote className="blockquote">
                                            <p className="mb-3">"{review.review}"</p>
                                            <footer className="blockquote-footer">
                                                <cite>{review.patientName}</cite> • <small className="text-muted">{review.date}</small>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Review Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-star me-2"></i>Write a Review
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmitReview}>
                                    {/* Doctor Info */}
                                    <div className="alert alert-info">
                                        <strong>Reviewing:</strong> {selectedDoctor.name} - {selectedDoctor.specialty}
                                    </div>

                                    {/* Patient Name */}
                                    <div className="mb-3">
                                        <label htmlFor="patientName" className="form-label">Your Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="patientName" 
                                            placeholder="Enter your full name"
                                            value={formData.patientName}
                                            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                                            required 
                                        />
                                    </div>

                                    {/* Star Rating */}
                                    <div className="mb-3">
                                        <label className="form-label">Rating</label>
                                        <div className="d-flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`btn btn-link p-0 ${formData.rating >= star ? 'text-warning' : 'text-muted'}`}
                                                    onClick={() => setFormData({...formData, rating: star})}
                                                >
                                                    <i className="bi bi-star-fill fs-4"></i>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <div className="mb-3">
                                        <label htmlFor="reviewText" className="form-label">Your Review</label>
                                        <textarea 
                                            className="form-control" 
                                            id="reviewText" 
                                            rows="5" 
                                            placeholder="Share your experience with this doctor..."
                                            value={formData.reviewText}
                                            onChange={(e) => setFormData({...formData, reviewText: e.target.value})}
                                            required
                                        ></textarea>
                                        <div className="form-text">Please be honest and constructive in your feedback.</div>
                                    </div>

                                    {/* Photo Upload (Optional) */}
                                    <div className="mb-3">
                                        <label htmlFor="reviewPhoto" className="form-label">Add Photo (Optional)</label>
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="reviewPhoto" 
                                            accept="image/*"
                                            onChange={(e) => setFormData({...formData, reviewPhoto: e.target.files[0]})}
                                        />
                                        <div className="form-text">You can attach a photo if relevant to your experience.</div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>
                                    <i className="bi bi-send me-1"></i>Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default Reviews;
