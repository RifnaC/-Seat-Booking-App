/* eslint-disable react/prop-types */

const Seat = ({ seatNumber, isBooked, onClick }) => {
  return (
    <div
      className={`seat ${isBooked ? 'booked' : 'available'}`}
      onClick={onClick}
      style={{ cursor: isBooked ? 'not-allowed' : 'pointer' }}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
