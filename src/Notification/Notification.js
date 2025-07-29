// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // Show notification when appointment data exists
    }

    // Listen for appointment cancellation events
    const handleAppointmentCancellation = (event) => {
      const { doctorName } = event.detail;
      
      // If the canceled appointment matches the current notification, hide it
      if (doctorData?.name === doctorName) {
        setShowNotification(false);
        setAppointmentData(null);
        
        // Remove appointment data from localStorage
        localStorage.removeItem(doctorName);
        localStorage.removeItem('doctorData');
      }
    };

    // Listen for new appointment bookings
    const handleAppointmentBooking = (event) => {
      const { doctor, appointmentDetails } = event.detail;
      
      // Update states with new appointment data
      setDoctorData(doctor);
      setAppointmentData(appointmentDetails);
      setShowNotification(true);
      
      // Store appointment data in localStorage
      localStorage.setItem('doctorData', JSON.stringify(doctor));
      localStorage.setItem(doctor.name, JSON.stringify(appointmentDetails));
    };

    // Add event listeners for appointment events
    window.addEventListener('appointmentCancelled', handleAppointmentCancellation);
    window.addEventListener('appointmentBooked', handleAppointmentBooking);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('appointmentCancelled', handleAppointmentCancellation);
      window.removeEventListener('appointmentBooked', handleAppointmentBooking);
    };
  }, [doctorData?.name]); // Include doctorData?.name in dependency array

  // Function to manually close the notification
  const handleCloseNotification = () => {
    setShowNotification(false);
    
    // Optionally remove from localStorage when manually closed
    if (doctorData?.name) {
      localStorage.removeItem(doctorData.name);
      localStorage.removeItem('doctorData');
    }
    
    setAppointmentData(null);
    setDoctorData(null);
  };

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar></Navbar>
      
      {/* Render children components */}
      {children}
      
      {/* Display appointment notification if user is logged in, appointmentData is available, and notification should be shown */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-overlay">
          <div className="appointment-card">
            <div className="appointment-card__header">
              <h3 className="appointment-card__title">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                Appointment Confirmed
              </h3>
              <button 
                className="btn-close" 
                aria-label="Close notification"
                onClick={handleCloseNotification}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="appointment-card__content">
              <div className="appointment-details">
                <div className="detail-item">
                  <i className="bi bi-person-fill text-primary"></i>
                  <span className="detail-label">Doctor:</span>
                  <span className="detail-value">{doctorData?.name}</span>
                </div>
                
                {appointmentData.specialty && (
                  <div className="detail-item">
                    <i className="bi bi-heart-pulse text-danger"></i>
                    <span className="detail-label">Specialty:</span>
                    <span className="detail-value">{appointmentData.specialty}</span>
                  </div>
                )}
                
                {appointmentData.date && (
                  <div className="detail-item">
                    <i className="bi bi-calendar-check text-info"></i>
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{appointmentData.date}</span>
                  </div>
                )}
                
                {appointmentData.time && (
                  <div className="detail-item">
                    <i className="bi bi-clock text-warning"></i>
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{appointmentData.time}</span>
                  </div>
                )}
                
                {appointmentData.patientName && (
                  <div className="detail-item">
                    <i className="bi bi-person-badge text-secondary"></i>
                    <span className="detail-label">Patient:</span>
                    <span className="detail-value">{appointmentData.patientName}</span>
                  </div>
                )}
                
                {appointmentData.phone && (
                  <div className="detail-item">
                    <i className="bi bi-telephone text-success"></i>
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{appointmentData.phone}</span>
                  </div>
                )}
                
                {appointmentData.reason && (
                  <div className="detail-item">
                    <i className="bi bi-file-text text-primary"></i>
                    <span className="detail-label">Reason:</span>
                    <span className="detail-value">{appointmentData.reason}</span>
                  </div>
                )}
              </div>
              
              <div className="appointment-card__footer">
                <p className="appointment-card__message">
                  <i className="bi bi-info-circle me-1"></i>
                  Your appointment has been successfully booked. You will receive a confirmation email shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
