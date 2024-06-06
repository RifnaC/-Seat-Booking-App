/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Seat from "./Seat"

const SeatMap = ({ bookings = [], onSeatSelect }) => {
    const [seats, setSeats] = useState(
        Array.from({ length: 100 }, (seat, i) => ({
            seatNumber: i + 1,
            isBooked: false,
        }))
    );
    useEffect(() => {
        const bookedSeats = bookings.reduce((acc, booking) => {
            if (new Date(booking.date).toDateString() === new Date().toDateString()) {
                acc.push(...booking.seats);
            }
            return acc;
        }, []);
        setSeats((prevSeats) =>
            prevSeats.map((seat) => 
                bookedSeats.includes(seat.seatNumber) ? { ...seat, isBooked: true } : seat
            )
            );
    }, [bookings]);

    const handleSeatClick = (seatNumber) => {
            if (!seats.find(seat => seat.seatNumber === seatNumber).isBooked) {
              onSeatSelect(seatNumber);
            }
        // setSeats((prevSeats) =>
        //     prevSeats.map((seat) =>
        //         seat.seatNumber === seatNumber ? { ...seat, isBooked: !seat.isBooked } : seat
        //     )
        // );
    };

    return (
        <div className="seat-map">
            {seats.map((seat) => (

                <Seat key={seat.seatNumber}  {...seat} onClick={() => handleSeatClick(seat.seatNumber)} />

            ))}</div>
    )
}

export default SeatMap