/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import Seat from './Seat';

// const SeatMap = ({ seats, onSeatSelect }) => {
//   const handleSeatClick = (seatNumber) => {
//     onSeatSelect(seatNumber);
//   };

//   return (
//     <div className="seat-map">
//       {seats.map((seat) => (
//         <Seat
//           key={seat.seatNumber}
//           seatNumber={seat.seatNumber}
//           isBooked={seat.isBooked}
//           onClick={() => handleSeatClick(seat.seatNumber)}
//         />
//       ))}
//     </div>
//   );
// };

// export default SeatMap;



const SeatMap = ({ bookedSeats }) => {
  const seats = [
    'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', // Example seat layout
  ];

  return (
    <div>
      <h3>Seat Map</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '10px' }}>
        {seats.map((seat) => (
          <div
            key={seat}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: bookedSeats.includes(seat) ? 'red' : 'green',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: bookedSeats.includes(seat) ? 'not-allowed' : 'pointer',
            }}
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
