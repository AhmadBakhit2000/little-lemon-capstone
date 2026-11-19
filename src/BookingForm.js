import React, { useState } from "react";

function BookingForm({ availableTimes, onSubmit }) {
  const today = new Date().toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(availableTimes[0] || "17:00");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("Birthday");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter a valid full name (at least 2 characters).";
    }
    if (!date) {
      newErrors.date = "Please select a reservation date.";
    } else if (date < today) {
      newErrors.date = "Reservation date cannot be in the past.";
    }
    if (!time) {
      newErrors.time = "Please choose an available time.";
    }
    if (guests < 1 || guests > 10) {
      newErrors.guests = "Number of guests must be between 1 and 10.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, date, time, guests, occasion });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Table Reservation Form">
      <div className="form-group">
        <label htmlFor="full-name">Full Name *</label>
        <input
          id="full-name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="error-msg" role="alert">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="res-date">Choose Date *</label>
        <input
          id="res-date"
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.date}
        />
        {errors.date && <span className="error-msg" role="alert">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose Time *</label>
        <select
          id="res-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-required="true"
        >
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.time && <span className="error-msg" role="alert">{errors.time}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of Guests (1-10) *</label>
        <input
          id="guests"
          type="number"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          aria-required="true"
          aria-invalid={!!errors.guests}
        />
        {errors.guests && <span className="error-msg" role="alert">{errors.guests}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business">Business Dinner</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn-primary" aria-label="On Click">
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;

