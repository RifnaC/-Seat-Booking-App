/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useDispatch } from 'react-redux';
import { fetchSeminars } from '../features/seminar/seminarSlice';


const BookingForm = ({ seminarId, selectedSeat, onBookingSuccess, selectedDate }) => {

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      setStatus('loading');
      await axios.post('/api/v1/seminar/book-seat', {
        seminarId,
        seat: selectedSeat,
        date: selectedDate,
      });
      setStatus('succeeded');
      dispatch(fetchSeminars());
      onBookingSuccess(selectedSeat);
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };

  return (
    <div className='text-white'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleBooking} className='border-2 flex'>
        <p className='p-1'>Selected Seat: {selectedSeat}</p>
        <button className='border-2 text-black border-yellow-200 bg-gradient-to-br from-yellow-200 to-yellow-300 p-1'  type="submit" disabled={status === 'loading'}>
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
