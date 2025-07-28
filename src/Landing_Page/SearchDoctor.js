import React, { useState } from 'react';

const SearchDoctor = () => {
    const [searchParams, setSearchParams] = useState({
        specialty: '',
        location: '',
        doctorName: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically navigate to results page or perform search
        console.log('Search params:', searchParams);
        // For now, we'll just show an alert
        alert(`Searching for doctors with parameters: ${JSON.stringify(searchParams)}`);
    };

    const handleSpecialtyClick = (specialty) => {
        setSearchParams(prev => ({
            ...prev,
            specialty: specialty
        }));
        // Auto-submit when clicking specialty buttons
        console.log(`Searching for ${specialty} doctors`);
        alert(`Searching for ${specialty} doctors`);
    };

    return (
        <section className="py-5 bg-light min-vh-100">
            <div className="container">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-primary">Find a Doctor</h1>
                    <p className="lead text-muted">Search for the best healthcare professionals</p>
                </div>

                {/* Doctor Graphic */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-6 col-md-8">
                        <div className="text-center">
                            <img 
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Doctor Consultation" 
                                className="img-fluid rounded-3 shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        {/* Specialty Search */}
                                        <div className="col-md-6">
                                            <label htmlFor="specialty" className="form-label">Specialty</label>
                                            <select 
                                                className="form-select" 
                                                id="specialty" 
                                                name="specialty"
                                                value={searchParams.specialty}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">All Specialties</option>
                                                <option value="cardiologist">Cardiologist</option>
                                                <option value="dentist">Dentist</option>
                                                <option value="dermatologist">Dermatologist</option>
                                                <option value="neurologist">Neurologist</option>
                                                <option value="orthopedic">Orthopedic</option>
                                                <option value="pediatrician">Pediatrician</option>
                                                <option value="psychiatrist">Psychiatrist</option>
                                            </select>
                                        </div>

                                        {/* Location Search */}
                                        <div className="col-md-6">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="location" 
                                                name="location"
                                                placeholder="Enter city or zip code"
                                                value={searchParams.location}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* Doctor Name Search */}
                                        <div className="col-12">
                                            <label htmlFor="doctorName" className="form-label">Doctor Name (Optional)</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="doctorName" 
                                                name="doctorName"
                                                placeholder="Search by doctor name"
                                                value={searchParams.doctorName}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        {/* Search Button */}
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    <i className="bi bi-search me-2"></i>Search Doctors
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Specialty Links */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="text-center">
                            <h5 className="mb-4 text-muted">Popular Specialties</h5>
                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => handleSpecialtyClick('cardiologist')}
                                >
                                    <i className="bi bi-heart me-1"></i>Cardiologist
                                </button>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => handleSpecialtyClick('dentist')}
                                >
                                    <i className="bi bi-emoji-smile me-1"></i>Dentist
                                </button>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => handleSpecialtyClick('dermatologist')}
                                >
                                    <i className="bi bi-person me-1"></i>Dermatologist
                                </button>
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => handleSpecialtyClick('pediatrician')}
                                >
                                    <i className="bi bi-people me-1"></i>Pediatrician
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchDoctor;
