//* Express
import express from 'express';
const router = express.Router();

//* Routes
import productsRouter from '../routers/products.js';
import authRouter from '../routers/auth.js';

router.use('/products', productsRouter);
router.use('/auth', authRouter);

export default router;
