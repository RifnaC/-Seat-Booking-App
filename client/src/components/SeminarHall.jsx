import { useState } from "react";
import BookingForm from "./BookingForm"
import SeatMap from "./SeatMap"

const SeminarHall = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatSelect = (seatNumber) => {
        setSelectedSeat(seatNumber);
      };

    const handleBookingSubmit = (booking) => {
        console.log("booking", bookings);
        setBookings([...bookings, booking]);
    };


    return (
        <div className="seminar-hall">
            <SeatMap bookings = {bookings}  onSeatSelect={handleSeatSelect}/>
            <BookingForm selectedSeat={selectedSeat}  onSubmit={handleBookingSubmit}/>
        </div>
    )
}

export default SeminarHall