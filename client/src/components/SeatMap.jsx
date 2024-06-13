/* eslint-disable react/prop-types */
const SeatMap = ({ bookedSeats, onSeatSelect, selectedSeat }) => {
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'];

  return (
    <div className="me-8">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px' }}>
        {seats.map((seat) => (
          <div
            key={seat}
            style={{
              width: '50px',
              height: '50px',
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: bookedSeats.includes(seat) ?  "red": selectedSeat === seat ? 'yellow' : '#FFFF80',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: bookedSeats.includes(seat) ? 'not-allowed' : 'pointer',
            }}
            onClick={() => !bookedSeats.includes(seat) && onSeatSelect(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
