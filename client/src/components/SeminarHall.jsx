// import  { useState } from 'react';
// import SeatMap from './SeatMap';
// import BookingForm from './BookingForm';


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
import '../App.css';

const SeminarHall = () => {
  const { seminarId } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        setStatus('loading');
        console.log(`Fetching seminar with ID: ${seminarId}`);
        const response = await axios.get(`/api/v1/seminar/${seminarId}`);
        setSeminar(response.data);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        console.log(err);
        setStatus('failed');
      }
    };

    fetchSeminar();
  }, [seminarId]);

  if (status === 'loading') {
    return <div className='text-white'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='text-red-600'>Error: {error}</div>;
  }
  return (
    <div className=' text-white '>
      {seminar && (
        <>
          <div className='flex justify-center my-5'>
            <h2>{seminar.title}</h2>
            <input type='date' className='mx-4 text-black'/>
          </div>
          <div className='flex w-screen justify-evenly'>
            <SeatMap bookedSeats={seminar.bookedSeats} />
            <BookingForm seminarId={seminar._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default SeminarHall;


