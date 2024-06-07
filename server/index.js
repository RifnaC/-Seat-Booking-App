import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connetDB from './config/database.js'
import { userRouter } from './routes/userRoutes.js'
import cors from 'cors';

const app = express();
connetDB();

app.use(express.json());

app.use("/api/v1/user", userRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));

app.use({
    cors: ["http://localhost:4000"],
    credentials: true
});