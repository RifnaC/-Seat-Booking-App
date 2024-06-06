/* eslint-disable react/prop-types */
import Seat from './Seat';

const SeatMap = ({ seats, onSeatSelect }) => {
  const handleSeatClick = (seatNumber) => {
    onSeatSelect(seatNumber);
  };

  return (
    <div className="seat-map">
      {seats.map((seat) => (
        <Seat
          key={seat.seatNumber}
          seatNumber={seat.seatNumber}
          isBooked={seat.isBooked}
          onClick={() => handleSeatClick(seat.seatNumber)}
        />
      ))}
    </div>
  );
};

export default SeatMap;
