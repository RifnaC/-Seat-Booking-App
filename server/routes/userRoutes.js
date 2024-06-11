import express from 'express';
import { getAllSeminars, login, signup } from '../controller/userController.js';
const router = express.Router();
import { isAuth } from "../middlewares/isAuth.js";

router.post('/register', signup);
router.post('/login', login);

export { router as userRouter }