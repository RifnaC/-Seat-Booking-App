import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connetDB from './config/database.js'
import { userRouter } from './routes/userRoutes.js'

const app = express();
connetDB();

app.use(express.json());

app.use("/api/v1/user", userRouter)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))