import {Seminar} from '../modal/seminar.js';

const seminars = [
  {
    title: 'Seminar 1',
    description: 'Description for Seminar 1',
    image: 'https://www.thehighereducationreview.com/newsimagespl/US620z35.jpeg',
    bookings:[{
      date: new Date('2024-06-14').toISOString().split('T')[0],
      bookedSeats: ['C3'],
    }]
    
  },
  {
    title: 'Seminar 2',
    description: 'Description for Seminar 2',
    image: 'https://res.cloudinary.com/parallax-agency/image/upload/c_fill%2Cq_auto%2Cf_auto%2Cw_1040%2Ch_452/statamic/cpd-2020-production/what-are-cpd-seminars.jpg',
    bookings :[{
      date: new Date('2024-07-15').toISOString().split('T')[0],
      bookedSeats: ['A1', 'B2']
    }]
    
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



