import {Seminar} from '../modal/seminar.js';

const seminars = [
  {
    title: 'Seminar 1',
    description: 'Description for Seminar 1',
    image: 'image-url-1',
    date: new Date('2024-07-01'),
    seats: 10,
    bookedSeats: ['C3'],
  },
  {
    title: 'Seminar 2',
    description: 'Description for Seminar 2',
    image: 'image-url-2',
    date: new Date('2024-07-15'),
    seats: 10,
    bookedSeats: ['A1', 'B2']
  },
];


const seedSeminars = async () => {
  try {
    await Seminar.deleteMany(); 
    await Seminar.insertMany(seminars);
    console.log('Seminars seeded successfully');
  } catch (error) {
    console.error('Error seeding seminars:', error);
  }
};
export default seedSeminars;

