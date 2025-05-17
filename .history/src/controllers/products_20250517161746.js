import createHttpError from 'http-errors';
import {
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/products.js';

export const getAllProductsController = async (rec, res) => {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully found product with id {productId}!',
    data: product,
  });
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const product = await updateProduct(id, req.body);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({});
};
