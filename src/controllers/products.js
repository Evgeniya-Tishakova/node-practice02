import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  creatProduct,
  deleteProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllProductsController = async (req, res) => {
  const { category, minPrice, maxPrice } = parseFilterParams(req.query);

  const products = await getAllProducts({
    category,
    minPrice,
    maxPrice,
    user: req.user,
  });
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById({ id, user: req.user });

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
  const prodact = await creatProduct({ payload: req.body, user: req.user });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: prodact,
  });
};

export const deleteProductController = async (req, resp) => {
  const { id } = req.params;

  const deletedProduct = await deleteProduct({ id, user: req.user });

  if (deletedProduct === null) {
    throw createHttpError(404, 'Product not found');
  }

  resp.status(204).end();
};
