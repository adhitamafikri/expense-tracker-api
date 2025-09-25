import express from 'express';
import coursesRouter from './routes/courses';
import usersRouter from './routes/users';
import { loggerMiddleware } from './middlewares/logger';
import 'dotenv/config';

const app = express();

console.log('APP_ENV =', process.env.APP_ENV);

// setup app level middlewares
app.use(loggerMiddleware);

// setup routes
app.get('/', (req, res) => {
  res
    .json({ message: 'Welcome to KJO Academy Backend Express API' })
    .status(200);
});

app.use('/courses', coursesRouter);
app.use('/users', usersRouter);

app.listen(
  parseInt(process.env.APP_PORT || '3500'),
  process.env.APP_HOST || '0.0.0.0',
  () => {
    console.log(
      `Server is running on ${process.env.APP_HOST}:${process.env.APP_PORT}`,
    );
  },
);
