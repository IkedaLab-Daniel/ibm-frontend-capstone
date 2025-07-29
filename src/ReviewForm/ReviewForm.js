import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    // Sample appointment data - this would typically come from your backend/API
    const [appointments, setAppointments] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [feedbackData, setFeedbackData] = useState({
        rating: 0,
        feedback: '',
        wouldRecommend: false
    });

    // Load appointment data (mock data for demonstration)
    useEffect(() => {
        // In a real app, this would fetch from an API
        const mockAppointments = [
            {
                id: 1,
                doctorName: "Dr. Sarah Johnson",
                doctorSpecialty: "Cardiologist",
                appointmentDate: "2025-07-15",
                status: "completed",
                reviewGiven: false,
                rating: 0,
                feedback: ""
            },
            {
                id: 2,
                doctorName: "Dr. Michael Chen",
                doctorSpecialty: "Dermatologist",
                appointmentDate: "2025-07-10",
                status: "completed",
                reviewGiven: true,
                rating: 5,
                feedback: "Excellent service and very professional!"
            },
            {
                id: 3,
                doctorName: "Dr. Emily Rodriguez",
                doctorSpecialty: "Pediatrician",
                appointmentDate: "2025-07-20",
                status: "completed",
                reviewGiven: false,
                rating: 0,
                feedback: ""
            },
            {
                id: 4,
                doctorName: "Dr. James Wilson",
                doctorSpecialty: "Orthopedic Surgeon",
                appointmentDate: "2025-07-12",
                status: "completed",
                reviewGiven: true,
                rating: 4,
                feedback: "Good treatment, very knowledgeable doctor."
            },
            {
                id: 5,
                doctorName: "Dr. Lisa Thompson",
                doctorSpecialty: "Neurologist",
                appointmentDate: "2025-07-08",
                status: "completed",
                reviewGiven: false,
                rating: 0,
                feedback: ""
            }
        ];

        // Load existing reviews from localStorage
        const storedAppointments = mockAppointments.map(appointment => {
            const storedReview = localStorage.getItem(`review_${appointment.id}`);
            if (storedReview) {
                const reviewData = JSON.parse(storedReview);
                return {
                    ...appointment,
                    reviewGiven: true,
                    rating: reviewData.rating,
                    feedback: reviewData.feedback
                };
            }
            return appointment;
        });

        setAppointments(storedAppointments);
    }, []);

    const handleProvideFeedback = (appointment) => {
        setSelectedAppointment(appointment);
        setFeedbackData({
            rating: appointment.rating || 0,
            feedback: appointment.feedback || '',
            wouldRecommend: false
        });
        setShowFeedbackModal(true);
    };

    const handleStarClick = (rating) => {
        setFeedbackData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        
        if (feedbackData.rating === 0) {
            alert('Please provide a rating!');
            return;
        }

        if (!feedbackData.feedback.trim()) {
            alert('Please provide your feedback!');
            return;
        }

        // Update the appointment with the review
        const updatedAppointments = appointments.map(appointment => {
            if (appointment.id === selectedAppointment.id) {
                return {
                    ...appointment,
                    reviewGiven: true,
                    rating: feedbackData.rating,
                    feedback: feedbackData.feedback
                };
            }
            return appointment;
        });

        // Save review to localStorage
        localStorage.setItem(`review_${selectedAppointment.id}`, JSON.stringify({
            rating: feedbackData.rating,
            feedback: feedbackData.feedback,
            date: new Date().toISOString()
        }));

        setAppointments(updatedAppointments);
        setShowFeedbackModal(false);
        setSelectedAppointment(null);
        setFeedbackData({ rating: 0, feedback: '', wouldRecommend: false });
        
        alert('Review submitted successfully!');
    };

    const renderStars = (rating, interactive = false, onStarClick = null) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} ${interactive ? 'interactive-star' : ''}`}
                    style={{ 
                        color: i <= rating ? '#ffc107' : '#dee2e6',
                        cursor: interactive ? 'pointer' : 'default',
                        fontSize: '1.2rem',
                        marginRight: '2px'
                    }}
                    onClick={() => interactive && onStarClick && onStarClick(i)}
                ></i>
            );
        }
        return stars;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFeedbackData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="review-form-container">
            <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center mb-5">
                                <h2 className="display-5 fw-bold text-primary mb-3">
                                    <i className="bi bi-star-fill me-3"></i>
                                    Review Your Appointments
                                </h2>
                                <p className="lead text-muted">
                                    Share your experience and help other patients make informed decisions
                                </p>
                            </div>

                            {/* Reviews Table */}
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">
                                        <i className="bi bi-clipboard-data me-2"></i>
                                        Your Completed Appointments
                                    </h5>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col" className="ps-4">
                                                        <i className="bi bi-person-fill me-2 text-primary"></i>
                                                        Doctor Name
                                                    </th>
                                                    <th scope="col">
                                                        <i className="bi bi-briefcase me-2 text-primary"></i>
                                                        Doctor Speciality
                                                    </th>
                                                    <th scope="col" className="text-center">
                                                        <i className="bi bi-chat-square-heart me-2 text-primary"></i>
                                                        Provide Feedback
                                                    </th>
                                                    <th scope="col" className="text-center">
                                                        <i className="bi bi-check-circle me-2 text-primary"></i>
                                                        Review Given
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.length > 0 ? (
                                                    appointments.map((appointment) => (
                                                        <tr key={appointment.id} className="align-middle">
                                                            <td className="ps-4">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                                                         style={{ width: '40px', height: '40px' }}>
                                                                        <i className="bi bi-person-fill text-white"></i>
                                                                    </div>
                                                                    <div>
                                                                        <div className="fw-bold text-dark">{appointment.doctorName}</div>
                                                                        <small className="text-muted">
                                                                            Appointment: {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-info text-dark fs-6 px-3 py-2">
                                                                    {appointment.doctorSpecialty}
                                                                </span>
                                                            </td>
                                                            <td className="text-center">
                                                                {!appointment.reviewGiven ? (
                                                                    <button 
                                                                        className="btn btn-primary btn-sm px-4"
                                                                        onClick={() => handleProvideFeedback(appointment)}
                                                                    >
                                                                        <i className="bi bi-star me-2"></i>
                                                                        Give Review
                                                                    </button>
                                                                ) : (
                                                                    <button 
                                                                        className="btn btn-outline-secondary btn-sm px-4"
                                                                        onClick={() => handleProvideFeedback(appointment)}
                                                                    >
                                                                        <i className="bi bi-pencil me-2"></i>
                                                                        Edit Review
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td className="text-center">
                                                                {appointment.reviewGiven ? (
                                                                    <div>
                                                                        <div className="mb-1">
                                                                            {renderStars(appointment.rating)}
                                                                        </div>
                                                                        <span className="badge bg-success">
                                                                            <i className="bi bi-check-lg me-1"></i>
                                                                            Reviewed
                                                                        </span>
                                                                        {appointment.feedback && (
                                                                            <div className="mt-2">
                                                                                <small className="text-muted fst-italic">
                                                                                    "{appointment.feedback.substring(0, 50)}
                                                                                    {appointment.feedback.length > 50 ? '...' : ''}"
                                                                                </small>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="badge bg-warning text-dark">
                                                                        <i className="bi bi-clock me-1"></i>
                                                                        Pending
                                                                    </span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-5">
                                                            <div className="text-muted">
                                                                <i className="bi bi-calendar-x fs-1 mb-3"></i>
                                                                <p>No completed appointments found.</p>
                                                                <p>Book an appointment to start reviewing doctors!</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title text-primary fw-bold">
                                    <i className="bi bi-star-fill me-2"></i>
                                    Review {selectedAppointment?.doctorName}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowFeedbackModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body pt-2">
                                <form onSubmit={handleFeedbackSubmit}>
                                    <div className="text-center mb-4">
                                        <div className="bg-light rounded p-3 mb-3">
                                            <h6 className="text-muted mb-2">Doctor Information</h6>
                                            <p className="mb-1 fw-bold">{selectedAppointment?.doctorName}</p>
                                            <p className="mb-0 text-primary">{selectedAppointment?.doctorSpecialty}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">
                                            <i className="bi bi-star me-2"></i>
                                            Rate your experience *
                                        </label>
                                        <div className="text-center py-3">
                                            <div className="mb-2">
                                                {renderStars(feedbackData.rating, true, handleStarClick)}
                                            </div>
                                            <small className="text-muted">
                                                {feedbackData.rating === 0 && 'Click to rate'}
                                                {feedbackData.rating === 1 && 'Poor'}
                                                {feedbackData.rating === 2 && 'Fair'}
                                                {feedbackData.rating === 3 && 'Good'}
                                                {feedbackData.rating === 4 && 'Very Good'}
                                                {feedbackData.rating === 5 && 'Excellent'}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="feedback" className="form-label fw-bold">
                                            <i className="bi bi-chat-square-text me-2"></i>
                                            Share your feedback *
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="feedback"
                                            name="feedback"
                                            rows="4"
                                            placeholder="Please share your experience with this doctor. Your feedback helps other patients make informed decisions."
                                            value={feedbackData.feedback}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                        <div className="form-text">
                                            <small>{feedbackData.feedback.length}/500 characters</small>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="wouldRecommend"
                                                name="wouldRecommend"
                                                checked={feedbackData.wouldRecommend}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="wouldRecommend">
                                                <i className="bi bi-hand-thumbs-up me-2"></i>
                                                I would recommend this doctor to others
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 justify-content-end">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary px-4"
                                            onClick={() => setShowFeedbackModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary px-4"
                                        >
                                            <i className="bi bi-check-lg me-2"></i>
                                            Submit Review
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
