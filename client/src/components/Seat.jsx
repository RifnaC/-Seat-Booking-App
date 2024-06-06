// eslint-disable-next-line react/prop-types
const Seat = ({ seatNumber, isBooked, onClick }) => {
    return (
        <button className={`seat ${isBooked ? 'booked' : ''}`} onClick={onClick}>{seatNumber}</button>
    )
}

export default Seat