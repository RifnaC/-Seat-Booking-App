// import  { useState } from 'react';
// import SeatMap from './SeatMap';
// import BookingForm from './BookingForm';
// import '../App.css'; 

// const SeminarHall = () => {
//   const [seats, setSeats] = useState(
//     Array.from({ length: 50 }, (_, i) => ({
//       seatNumber: i + 1,
//       isBooked: false,
//     }))
//   );
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   const handleSeatSelect = (seatNumber) => {
//     setSelectedSeat(seatNumber);
//   };

//   const handleBookingSubmit = (booking) => {
//     if (booking.seats && booking.seats.length > 0) {
//       setBookings([...bookings, booking]);
//       setSeats(seats.map(seat => 
//         seat.seatNumber === booking.seats[0] ? { ...seat, isBooked: true } : seat
//       ));
//       setSelectedSeat(null);
//     } else {
//       console.error('Booking does not have seats assigned:', booking);
//     }
//   };

//   return (
//     <div className="seminar-hall">
//       <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
//       <BookingForm selectedSeat={selectedSeat} onSubmit={handleBookingSubmit} />
//     </div>
//   );
// };

// export default SeminarHall;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import SeatMap from './SeatMap';
import BookingForm from './BookingForm';

const SeminarHall = () => {
  const { seminarId } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        setStatus('loading');
        const response = await axios.get(`/api/seminars/${seminarId}`);
        setSeminar(response.data);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchSeminar();
  }, [seminarId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {seminar && (
        <>
          <h2>{seminar.title}</h2>
          <p>{new Date(seminar.date).toLocaleDateString()}</p>
          <SeatMap bookedSeats={seminar.bookedSeats} />
          <BookingForm seminarId={seminar._id} />
        </>
      )}
    </div>
  );
};

export default SeminarHall;

