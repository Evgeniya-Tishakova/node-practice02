import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  creatProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:id', ctrlWrapper(getProductByIdController));

router.post('/products', ctrlWrapper(creatProductController));

export default router;
