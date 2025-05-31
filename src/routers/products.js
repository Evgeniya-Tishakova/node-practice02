import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  creatProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductsSchema,
  updateProductsSchema,
} from '../validation/products.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();
router.get('/products', ctrlWrapper(getAllProductsController));

router.get('/products/:id', validateId, ctrlWrapper(getProductByIdController));

router.patch(
  '/products/:id',
  validateId,
  validateBody(createProductsSchema),
  ctrlWrapper(updateProductController),
);

router.post(
  '/products',
  validateBody(updateProductsSchema),
  ctrlWrapper(creatProductController),
);

router.delete(
  '/products/:id',
  validateId,
  ctrlWrapper(deleteProductController),
);

export default router;
