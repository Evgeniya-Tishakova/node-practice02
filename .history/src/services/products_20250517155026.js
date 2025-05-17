import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find();
  console.log('Product find' + products.length);
  return products;
};

export const getProductById = (productId) => {
  return ProductModel.findById(productId);
};
