import { Router } from 'express';
import authRouter from './auth.js';
import productsRouter from './products.js';

const router = Router();

router.use('/users', authRouter);
router.use('/products', productsRouter);

export default router;
