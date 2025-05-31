//* Express
import { Router } from 'express';

//* Services
import {
  getAllProductsController,
  getProductByIdController,
  creatProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

//* Middlewares
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/productsValidation.js';
import { authenticate } from '../middlewares/authenthicate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:id', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(creatProductController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteProductController));

export default router;
