import express from 'express';
import cors from 'cors';
import { ErrorHandler } from './middlewares/ErrorHandler.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  //   app.use(productsRouter);

  //   app.use('*', notFoundHandler);

  //   app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
