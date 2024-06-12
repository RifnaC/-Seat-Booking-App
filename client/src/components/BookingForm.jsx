/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState } from 'react';

// const BookingForm = ({ selectedSeat, onSubmit }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [date, setDate] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedSeat !== null) {
//       const booking = {
//         name,
//         email,
//         date,
//         seats: [selectedSeat]
//       };
//       onSubmit(booking);
//       setName('');
//       setEmail('');
//       setDate('');
//     } else {
//       alert('Please select a seat first.');
//     }
//   };

//   return (
//     <form className="booking-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <div>
//         <label>Date:</label>
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//       </div>
//       {selectedSeat && <p>Selected Seat: {selectedSeat}</p>}
//       <button type="submit">Book Seat</button>
//     </form>
//   );
// };

// export default BookingForm;


// src/components/BookingForm.js
import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { fetchSeminars } from '../features/seminar/seminarSlice';

const BookingForm = ({ seminarId }) => {
  const [seat, setSeat] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await axios.post('/api/v1/seminar/book-seat', { seminarId, seat });
      setStatus('succeeded');
      dispatch(fetchSeminars());
      
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };

  return (
    <div>
      <h3>Book a Seat</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleBooking}>
        <input

          type="text"
          value={seat.toUpperCase()}
          onChange={(e) => setSeat(e.target.value)}
          placeholder="Enter seat number"
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
