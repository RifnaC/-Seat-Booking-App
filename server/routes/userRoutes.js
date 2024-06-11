import express from 'express';
import { getAllSeminars, login, signup } from '../controller/userController.js';
const router = express.Router();
import { verifyToken } from "../middlewares/isAuth.js";

router.post('/register', signup);
router.post('/login', login);
router.get('/', verifyToken, getAllSeminars);
export { router as userRouter }