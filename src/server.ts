import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from "./routes/userRoutes";
import meRoute from './routes/meRoutes';
import chatRoute from './routes/chatRoutes';
import messageRoute from './routes/messageRoutes';
import { errorHandler, notFound } from './middleware/error/ErrorHandler';


const app = express();
app.use(cors());
dotenv.config();
const port =  process.env.PORT || 5000;

app.use(express.json());

app.use('/app', userRoute);
app.use('/app', meRoute);
app.use('/app', chatRoute);
app.use('/app', messageRoute);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log('connected'))


//qysXKvHzKw3513zY
//mongodb+srv://blinovarthur2020:<password>@netcraftproject.iowbk7v.mongodb.net/

