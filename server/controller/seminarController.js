import { Seminar } from '../modal/seminar.js';


export const getAllSeminars = async (req, res) => {
    try {
        const seminars = await Seminar.find();
        return res.status(200).json({seminars});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}
export const getSeminarById = async (req, res) => {
    try {
        const seminar = await Seminar.findById(req.params.id);
        return res.status(200).json({seminar});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}
export const bookSeat =async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
    const { seminarId, seat } = req.body;
    try {
      const seminar = await Seminar.findById(seminarId);
      if (!seminar) {
        return res.status(404).json({ message: 'Seminar not found' });
      }
      if (seminar.bookedSeats.includes(seat)) {
        return res.status(400).json({ message: 'Seat already booked' });
      }
      seminar.bookedSeats.push(seat);
      await seminar.save();
      res.status(200).json({ message: 'Seat booked successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

