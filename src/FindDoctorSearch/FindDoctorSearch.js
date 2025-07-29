import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initSpecialities = [
    'Cardiologist', 
    'Dentist', 
    'Dermatologist', 
    'Gynecologist/Obstetrician', 
    'General Physician', 
    'Neurologist', 
    'Orthopedic', 
    'Pediatrician', 
    'Psychiatrist',
    'Ear-Nose-Throat (ENT) Specialist', 
    'Homeopath', 
    'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpecialities);
    const [filteredSpecialities, setFilteredSpecialities] = useState(initSpecialities);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        // Navigate to search results page with the selected speciality
        navigate(`/search-doctor?speciality=${encodeURIComponent(speciality)}`);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchDoctor(value);
        
        // Filter specialities based on input
        if (value.trim() === '') {
            setFilteredSpecialities(specialities);
        } else {
            const filtered = specialities.filter(speciality =>
                speciality.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSpecialities(filtered);
        }
    };

    const handleFocus = () => {
        setDoctorResultHidden(false);
        // Reset to show all specialities when focused
        if (searchDoctor.trim() === '') {
            setFilteredSpecialities(specialities);
        }
    };

    const handleBlur = () => {
        // Add a small delay to allow clicking on results
        setTimeout(() => {
            setDoctorResultHidden(true);
        }, 200);
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary mb-4">Find a Doctor</h1>
                    <p className="lead text-muted">Search for healthcare professionals by specialty</p>
                    
                    {/* Doctor Icon */}
                    <div className="mb-4">
                        <i className="bi bi-person-hearts text-primary" style={{ fontSize: '4rem' }}></i>
                    </div>
                </div>

                {/* Search Container */}
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <div className="search-container position-relative">
                                    {/* Search Input */}
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-primary text-white">
                                            <i className="bi bi-search"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Search doctors, specialties, clinics, hospitals, etc."
                                            value={searchDoctor}
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    {/* Search Results Dropdown */}
                                    {!doctorResultHidden && (
                                        <div className="search-results position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
                                            <div className="card shadow-lg">
                                                <div className="card-body p-0">
                                                    {filteredSpecialities.length > 0 ? (
                                                        <div className="list-group list-group-flush">
                                                            {filteredSpecialities.map((speciality, index) => (
                                                                <button
                                                                    key={index}
                                                                    type="button"
                                                                    className="list-group-item list-group-item-action d-flex align-items-center py-3"
                                                                    onMouseDown={() => handleDoctorSelect(speciality)}
                                                                >
                                                                    <i className="bi bi-search text-muted me-3"></i>
                                                                    <div className="flex-grow-1">
                                                                        <div className="fw-medium">{speciality}</div>
                                                                        <small className="text-muted">SPECIALTY</small>
                                                                    </div>
                                                                    <i className="bi bi-arrow-right text-primary"></i>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-3 text-center text-muted">
                                                            <i className="bi bi-search mb-2"></i>
                                                            <div>No specialties found for "{searchDoctor}"</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Specialty Buttons */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="text-center">
                            <h5 className="mb-4 text-muted">Popular Specialties</h5>
                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                {['Cardiologist', 'Dentist', 'Dermatologist', 'General Physician', 'Pediatrician'].map((specialty) => (
                                    <button
                                        key={specialty}
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleDoctorSelect(specialty)}
                                    >
                                        <i className="bi bi-heart me-1"></i>{specialty}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FindDoctorSearch;