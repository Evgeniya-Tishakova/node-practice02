import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  creatProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:id', ctrlWrapper(getProductByIdController));

router.post('/products', ctrlWrapper(creatProductController));

router.delete('/products/:id', ctrlWrapper(deleteProductController));

export default router;
