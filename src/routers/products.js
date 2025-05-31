import { Router } from 'express';
import express from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  creatProductController,
  deleteProductController,
  patchOneProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { IsValidID } from '../middlewares/IsValidID.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/product.js';

const router = Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:id', IsValidID, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  jsonParser,
  validateBody(createProductSchema),
  ctrlWrapper(creatProductController),
);

router.patch(
  '/:id',
  IsValidID,
  jsonParser,
  validateBody(updateProductSchema),
  ctrlWrapper(patchOneProductController),
);

router.delete('/:id', IsValidID, ctrlWrapper(deleteProductController));

export default router;
