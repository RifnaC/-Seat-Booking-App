import express from 'express';
import { Seminar } from '../modal/seminar';
import { isAuth } from '../middlewares/isAuth';
import { bookSeat, getAllSeminars } from '../controller/seminarController.js';

const router = express.Router();

// Get all seminars
router.get('/', isAuth, getAllSeminars);

// Book a seat for a seminar
router.post('/book-seats/', isAuth, bookSeat);

export { router as seminarRouter };
