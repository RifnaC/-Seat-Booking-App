/* eslint-disable react/prop-types */
import { useState } from 'react';

const BookingForm = ({selectedSeat, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSeat !== null) {
        const booking = {
          name,
          email,
          date,
          selectedSeat,
        };
        console.log({ name, email, date });
        onSubmit(booking);
        setName('');
        setEmail('');
        setDate('');
      } else {
        alert('Please select a seat first.');
      }
    
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <input name="selectedSeat" type="hidden" value={selectedSeat}  />

      <button type="submit">Book Seat</button>
  
    </form>
  );
};
 

export default BookingForm;
