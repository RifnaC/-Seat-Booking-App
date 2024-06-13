import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import SeatMap from './SeatMap';
import BookingForm from './BookingForm';
import '../App.css';

const SeminarHall = () => {
  const { seminarId } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        setStatus('loading');
        const response = await axios.get(`/api/v1/seminar/${seminarId}`);
        setSeminar(response.data);
        setStatus('succeeded');
      } catch (err) {
        setError(err.message);
        setStatus('failed');
      }
    };

    fetchSeminar();
  }, [seminarId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/v1/seminar/${seminarId}/bookings`, {
          params: { date: selectedDate },
        });
        console.log(response.data)
        setBookedSeats(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (seminar) {
      fetchBookings();
    }
  }, [seminar, seminarId, selectedDate]);

  const handleSeatSelect = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBookingSuccess = (bookedSeat) => {
    setSelectedSeat(null);
    setBookedSeats((prev) => [...prev, bookedSeat]);
  };

  if (status === 'loading') {
    return <div className='text-white'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='text-red-600'>Error: {error}</div>;
  }

  return (
    <div className=' text-white'>
      {seminar && (
        <>
          <div className=' flex flex-col justify-center items-center my-5'>
            <div className='border-2'>
            <h2 className='text-center text-2xl mx-auto font-bold  my-2 p-2'>Screen</h2>
            </div>
            <div className='border-2 border-white p-2 flex justify-between mt-2 w-72'>
              <label>
                Select Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='text-black'
              />
            </div>
          </div>
          <div className='flex w-screen justify-center '>
            <SeatMap bookedSeats={bookedSeats} onSeatSelect={handleSeatSelect} selectedSeat={selectedSeat} />
            {selectedSeat && <BookingForm seminarId={seminar._id} selectedSeat={selectedSeat} onBookingSuccess={handleBookingSuccess} selectedDate={selectedDate} />}
          </div>
        </>
      )}
    </div>
  );
};

export default SeminarHall;



