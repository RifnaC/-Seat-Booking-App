import express from 'express';
import { login, signup } from '../controller/userController';
const router = express.Router();
import { verifyToken } from ('../middlewares/isAuth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', verifyToken);
export { router as userRouter }