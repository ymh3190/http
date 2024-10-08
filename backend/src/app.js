import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import cookieParser from 'cookie-parser';
import { connectDB } from './db';
import './models';

import helmet from 'helmet';
import cors from 'cors';

import authRouter from './routes/authRoutes';
import imageRouter from './routes/imageRoutes';
import videoRouter from './routes/videoRoutes';
import genreRouter from './routes/genreRoutes';

import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.25.57:3000'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/genres', genreRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4999;
(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
