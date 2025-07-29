import React, { useState } from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
    // Destructure doctor prop with fallback values
    const {
        name = 'Dr. Unknown',
        specialty = 'General Practice',
        experience = '0 years',
        rating = 0,
        totalReviews = 0,
        image = '/default-doctor.png',
        location = 'Unknown Location',
        bio = 'No bio available',
        education = 'Not specified',
        languages = ['English']
    } = doctor || {};

    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        patientName: '',
        phoneNumber: '',
        dateTime: '',
        reason: ''
    });

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const appointmentToCancel = appointments.find(appointment => appointment.id === appointmentId);
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
        
        // Dispatch appointment cancellation event
        if (appointmentToCancel) {
            const cancelEvent = new CustomEvent('appointmentCancelled', {
                detail: {
                    doctorName: name,
                    appointmentId: appointmentId,
                    appointmentData: appointmentToCancel
                }
            });
            window.dispatchEvent(cancelEvent);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!appointmentData.patientName || !appointmentData.phoneNumber || !appointmentData.dateTime) {
            alert('Please fill in all required fields');
            return;
        }

        const newAppointment = {
            id: Date.now(), // Simple ID generation
            doctorName: name,
            specialty: specialty,
            patientName: appointmentData.patientName,
            phone: appointmentData.phoneNumber,
            date: appointmentData.dateTime.split('T')[0],
            time: appointmentData.dateTime.split('T')[1],
            reason: appointmentData.reason,
            dateTime: appointmentData.dateTime
        };
        
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        
        // Dispatch appointment booking event for notification
        const bookingEvent = new CustomEvent('appointmentBooked', {
            detail: {
                doctor: doctor,
                appointmentDetails: newAppointment
            }
        });
        window.dispatchEvent(bookingEvent);
        
        setShowModal(false);
        setAppointmentData({
            patientName: '',
            phoneNumber: '',
            dateTime: '',
            reason: ''
        });
        
        alert('Appointment booked successfully!');
    };    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
        }

        return stars;
    };

    return (
        <>
            {/* Doctor Card */}
            <div className="card h-100 shadow-sm doctor-card">
                <div className="card-body p-4">
                    <div className="row">
                        {/* Doctor Image */}
                        <div className="col-md-3 text-center mb-3 mb-md-0">
                            <div className="doctor-image-container">
                                {image ? (
                                    <img 
                                        src={image} 
                                        alt={name} 
                                        className="rounded-circle img-fluid"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" 
                                         style={{ width: '80px', height: '80px' }}>
                                        <i className="bi bi-person-fill text-white" style={{ fontSize: '2rem' }}></i>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Doctor Details */}
                        <div className="col-md-6">
                            <h5 className="card-title text-primary fw-bold mb-2">{name}</h5>
                            <p className="text-muted mb-1">
                                <i className="bi bi-briefcase me-2"></i>{specialty}
                            </p>
                            <p className="text-muted mb-1">
                                <i className="bi bi-calendar me-2"></i>{experience} years experience
                            </p>
                            {location && (
                                <p className="text-muted mb-1">
                                    <i className="bi bi-geo-alt me-2"></i>{location}
                                </p>
                            )}
                            {education && (
                                <p className="text-muted mb-1">
                                    <i className="bi bi-mortarboard me-2"></i>{education}
                                </p>
                            )}
                            
                            {/* Rating */}
                            <div className="mb-2">
                                <span className="me-2">
                                    {renderStars(rating)}
                                </span>
                                <span className="text-muted">({rating}/5) • {totalReviews} reviews</span>
                            </div>

                            {/* Bio */}
                            {bio && (
                                <p className="small text-muted">{bio}</p>
                            )}
                        </div>

                        {/* Booking Section */}
                        <div className="col-md-3 text-center">
                            <div className="d-flex flex-column h-100 justify-content-between">
                                <div className="mb-2">
                                    <small className="text-muted">Languages</small>
                                    <div className="small text-info">{languages.join(', ')}</div>
                                </div>
                                
                                <div className="mb-3">
                                    <small className="text-muted">Available</small>
                                    <div className="small text-success">Today</div>
                                </div>

                                <button 
                                    className={`btn ${appointments.length > 0 ? 'btn-outline-danger' : 'btn-primary'} btn-lg w-100`}
                                    onClick={handleBooking}
                                >
                                    {appointments.length > 0 ? (
                                        <>
                                            <i className="bi bi-x-circle me-2"></i>
                                            Cancel Appointment
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-calendar-plus me-2"></i>
                                            Book Appointment
                                        </>
                                    )}
                                </button>
                                <small className="text-muted mt-1">No Booking Fee</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-calendar-plus me-2"></i>
                                    {appointments.length > 0 ? 'Appointment Details' : 'Book Appointment'}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            
                            <div className="modal-body">
                                {appointments.length > 0 ? (
                                    // Show appointment details
                                    <div>
                                        <div className="alert alert-success text-center">
                                            <h4><i className="bi bi-check-circle me-2"></i>Appointment Booked!</h4>
                                        </div>
                                        
                                        {appointments.map((appointment) => (
                                            <div key={appointment.id} className="card mb-3">
                                                <div className="card-body">
                                                    <h6 className="card-title">Appointment with Dr. {name}</h6>
                                                    <p className="mb-1"><strong>Patient Name:</strong> {appointment.patientName}</p>
                                                    <p className="mb-1"><strong>Phone:</strong> {appointment.phoneNumber}</p>
                                                    <p className="mb-1"><strong>Date & Time:</strong> {new Date(appointment.dateTime).toLocaleString()}</p>
                                                    {appointment.reason && (
                                                        <p className="mb-1"><strong>Reason:</strong> {appointment.reason}</p>
                                                    )}
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm mt-2"
                                                        onClick={() => handleCancel(appointment.id)}
                                                    >
                                                        <i className="bi bi-x-circle me-1"></i>Cancel Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Show booking form
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row mb-3">
                                            <div className="col-md-3 text-center">
                                                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2" 
                                                     style={{ width: '60px', height: '60px' }}>
                                                    <i className="bi bi-person-fill text-white" style={{ fontSize: '1.5rem' }}></i>
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <h6 className="text-primary">Dr. {name}</h6>
                                                <p className="text-muted mb-0">{experience} years experience</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="patientName" className="form-label">Patient Name *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="patientName"
                                                    name="patientName"
                                                    value={appointmentData.patientName}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                                                <input 
                                                    type="tel" 
                                                    className="form-control" 
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={appointmentData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="dateTime" className="form-label">Preferred Date & Time *</label>
                                            <input 
                                                type="datetime-local" 
                                                className="form-control" 
                                                id="dateTime"
                                                name="dateTime"
                                                value={appointmentData.dateTime}
                                                onChange={handleInputChange}
                                                min={new Date().toISOString().slice(0, 16)}
                                                required 
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="reason" className="form-label">Reason for Visit (Optional)</label>
                                            <textarea 
                                                className="form-control" 
                                                id="reason"
                                                name="reason"
                                                rows="3"
                                                value={appointmentData.reason}
                                                onChange={handleInputChange}
                                                placeholder="Please describe your symptoms or reason for consultation"
                                            ></textarea>
                                        </div>

                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                <i className="bi bi-check-circle me-2"></i>Confirm Appointment
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default DoctorCard;