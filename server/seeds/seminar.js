import mongoose from 'mongoose';
import Seminar from '../models/Seminar';

const seminars = [
      {
        title: 'Seminar 1',
        description: 'Description for Seminar 1',
        image: 'image-url-1',
        date: new Date('2024-07-01'),
        bookedSeats: ['C3'],
      },
      {
        title: 'Seminar 2',
        description: 'Description for Seminar 2',
        image: 'image-url-2',
        date: new Date('2024-07-15'),
        bookedSeats: ['A1', 'B2']
      },
      // Add more seminars here
    ];


  const seedSeminars = async () => {
    try {
      await Seminar.deleteMany(); // Clear existing data
      await Seminar.insertMany(seminars);
      console.log('Seminars seeded successfully');
    } catch (error) {
      console.error('Error seeding seminars:', error);
    }
  };