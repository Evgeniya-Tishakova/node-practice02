import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:id', ctrlWrapper(getProductByIdController));

router.patch('/products/:id', ctrlWrapper(updateProductController));

export default router;
