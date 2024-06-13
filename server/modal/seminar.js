import mongoose from 'mongoose';

const seminarSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    bookings: [{
        date: { 
            type: Date, 
            required: true 
        },
        bookedSeats: [{
            type: String, 
            required: true 
        }],
    }]
    
});

const Seminar = mongoose.model('Seminar', seminarSchema);
export { Seminar as Seminar};
