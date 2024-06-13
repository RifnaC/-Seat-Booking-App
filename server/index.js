import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connetDB from './config/database.js'
import seedSeminars from './seeds/seminar.js';
import { userRouter } from './routes/userRoutes.js'
import cors from 'cors';
import { seminarRouter } from './routes/seminar.js';

const app = express();
app.use(cors());
app.use(express.json());
const corsOption  ={
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}
app.use(cors(corsOption));
app.options('*', cors(corsOption));

connetDB();
// seedSeminars();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/seminar", seminarRouter);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));

