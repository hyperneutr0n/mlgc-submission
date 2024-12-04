import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../server/routes';
import loadModel from '../services/loadModel';

const app = express();
const PORT = process.env.PORT || 3000;
const model = await loadModel();

dotenv.config();
app.use(cors());
app.use(express.json());
app.locals.model = model;

app.use('/predict', router);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const details = err.details || null;

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
  console.log(`Error: ${message}. Details: ${details}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});