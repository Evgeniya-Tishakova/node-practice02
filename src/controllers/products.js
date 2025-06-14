import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  creatProduct,
  deleteProduct,
  patchProduct,
} from '../services/products.js';
import { parsFilterParams } from '../utils/parsFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const { category, minPrice, maxPrice } = parsFilterParams(req.query);

  const products = await getAllProducts({
    category,
    minPrice,
    maxPrice,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById({ id, userId: req.user._id });

  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found product with id {productId}!',
    data: product,
  });
};

export const creatProductController = async (req, res) => {
  const prodact = await creatProduct({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: prodact,
  });
};

export const deleteProductController = async (req, resp) => {
  const { id } = req.params;

  const deletedProduct = await deleteProduct(id, req.user._id);

  if (deletedProduct === null) {
    throw createHttpError(404, 'Product not found');
  }

  resp.status(204).end();
};

export const patchOneProductController = async (req, resp) => {
  const { id } = req.params;

  const patchedProduct = await patchProduct(id, req.body, req.user._id);

  if (patchedProduct === null) {
    throw createHttpError(404, 'Contact not found');
  }

  resp.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: patchedProduct,
  });
};
