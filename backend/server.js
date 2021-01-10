import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import {errorHandler, notFound} from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold),
);
