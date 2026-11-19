import React, { useState } from "react";
import BookingForm from "./BookingForm";
import "./App.css";

function App() {
  const [availableTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">🍋 Little Lemon</div>
        <nav aria-label="Main Navigation">
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#booking">Reservations</a></li>
          </ul>
        </nav>
      </header>

      <main id="booking" className="main-content">
        <section className="hero-section">
          <h1>Little Lemon Chicago</h1>
          <p>Reserve your table online for an authentic Mediterranean dining experience.</p>
        </section>

        <section className="booking-section" aria-labelledby="booking-heading">
          <h2 id="booking-heading">Book a Table</h2>
          {submittedData ? (
            <div className="confirmation-box" role="alert">
              <h3>Booking Confirmed!</h3>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Date:</strong> {submittedData.date}</p>
              <p><strong>Time:</strong> {submittedData.time}</p>
              <p><strong>Guests:</strong> {submittedData.guests}</p>
              <p><strong>Occasion:</strong> {submittedData.occasion}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setSubmittedData(null)}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <BookingForm
              availableTimes={availableTimes}
              onSubmit={handleFormSubmit}
            />
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Little Lemon Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

