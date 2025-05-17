import { getAllProducts } from '../services/products.js';

export const getAllProductsController = async (rec, res) => {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
