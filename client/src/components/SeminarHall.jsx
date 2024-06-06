import  { useState } from 'react';
import SeatMap from './SeatMap';
import BookingForm from './BookingForm';
import '../App.css'; 

const SeminarHall = () => {
  const [seats, setSeats] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      seatNumber: i + 1,
      isBooked: false,
    }))
  );
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleBookingSubmit = (booking) => {
    if (booking.seats && booking.seats.length > 0) {
      setBookings([...bookings, booking]);
      setSeats(seats.map(seat => 
        seat.seatNumber === booking.seats[0] ? { ...seat, isBooked: true } : seat
      ));
      setSelectedSeat(null);
    } else {
      console.error('Booking does not have seats assigned:', booking);
    }
  };

  return (
    <div className="seminar-hall">
      <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
      <BookingForm selectedSeat={selectedSeat} onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default SeminarHall;
