import { Seminar } from '../modal/seminar.js';


export const getAllSeminars = async (req, res) => {
    try {
        const seminars = await Seminar.find();
        return res.status(200).json(seminars);
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const getSeminarById = async (req, res) => {
    try {
        const seminar = await Seminar.findById(req.params.id);
        return res.status(200).json(seminar);
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const bookSeat =async (req, res) => {
    const { seminarId, seat, date } = req.body;
    try {
      const seminar = await Seminar.findById(seminarId);
      if (!seminar) {
        return res.status(404).json({ message: 'Seminar not found' });
      }
      const booked =  seminar.bookings.filter(booking => {
        return booking.bookedSeats.includes(seat) && new Date(booking.date).toISOString().split('T')[0] === date 
      });

      if(booked.length > 0) {
        return res.status(400).json({ message: 'Seat already booked'});
      }
      seminar.bookings.filter(booking =>{
        if (new Date(booking.date).toISOString().split('T')[0] === date) {
          booking.bookedSeats.push(seat);
        }
      });
      seminar.bookings.push({ date, bookedSeats: [seat] });
      await seminar.save();
      res.status(200).json({ message: 'Seat booked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



export const getBookingsByDate = async (req, res) => {
    const { seminarId } = req.params;
    const { date } = req.query;
    try {
      const seminar = await Seminar.findById(seminarId);
      const bookings = seminar.bookings.filter((booking) => {
        console.log(new Date(booking.date).toISOString().split('T')[0] === date)
        if(new Date(booking.date).toISOString().split('T')[0] === date) return booking.bookedSeats
        else return null
      });
      const bookedSeats = bookings.map((booking) => booking.bookedSeats).flat();
      console.log(bookedSeats)
      res.json(bookedSeats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  }