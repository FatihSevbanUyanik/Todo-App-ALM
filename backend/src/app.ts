// imports
import cors from 'cors';
import express from 'express';
import keys from './util/keys';
import { globalErrorHandler } from './util/errorHandling';
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
import routesAuth from './routes/auth'
import routesTodo from './routes/todo'
app.use('/api/v1/auth', routesAuth)
app.use('/api/v1/todo', routesTodo)
app.use(globalErrorHandler)

export { app }