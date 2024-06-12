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



const SeatMap = ({ bookedSeats  }) => {
  console.log('Booked Seats:', bookedSeats);
  const seats = [
    'A1', 'A2', 'A3', 'A4', 'A5','B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'
  ];

  return (
    <div>
      <h3>Seat Map</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px' }}>
        {seats.map((seat) => (
          <div
            key={seat}
            style={{
              width: '50px',
              height: '50px',
              color: 'black',
              fontWeight: 'bold',
              backgroundColor:bookedSeats.includes(seat) ? "red": '#FFFF80',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: bookedSeats.includes(seat) ? "not-allowed":'pointer',
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
