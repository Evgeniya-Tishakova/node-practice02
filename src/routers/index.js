import { Router } from 'express';
import authRouter from './auth.js';
import productsRouter from './products.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/users', authRouter);
router.use('/products', authenticate, productsRouter);

export default router;
