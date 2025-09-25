import express from 'express';
import authRouter from './routes/auth';
import coursesRouter from './routes/categories';
import usersRouter from './routes/users';
import { loggerMiddleware } from './middlewares/logger';
import 'dotenv/config';

const app = express();

console.log('APP_ENV =', process.env.APP_ENV);

// setup app level middlewares
app.use(loggerMiddleware);

// setup routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' }).status(200);
});

// Auth routes
app.use('/v1/auth', authRouter);

// Admin routes
// app.use('/v1/admin', );

// User routes
app.use('/v1/categories', coursesRouter);
app.use('/v1/users', usersRouter);

// not found route
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(
  parseInt(process.env.APP_PORT || '3500'),
  process.env.APP_HOST || '0.0.0.0',
  () => {
    console.log(
      `Server is running on ${process.env.APP_HOST}:${process.env.APP_PORT}`,
    );
  },
);
