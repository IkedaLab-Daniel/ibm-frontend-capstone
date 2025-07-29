import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Landing from './Landing_Page/Landing';
import SearchDoctor from './Landing_Page/SearchDoctor';
import Reviews from './Landing_Page/Reviews';
import Login from './Login/Login';
import Sign_Up from './Sign_Up/Sign_Up';
import InstantConsultation from './InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorResults from './DoctorResults/DoctorResults';
import Notification from './Notification/Notification';
import ReviewForm from './ReviewForm/ReviewForm';

function App(){
  return(
    <div className="App">
        <BrowserRouter>
          <Notification>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search-doctor" element={<SearchDoctor />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Sign_Up />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path='/find-doctor-search' element={<FindDoctorSearch/>} />
              <Route path='/doctor-results' element={<DoctorResults/>} />
              <Route path='/review-form' element={<ReviewForm/>} />
            </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;
