import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find();
  return products;
};

export const getProductById = (productId) => {
  return ProductModel.findById(productId);
};

export const creatProduct = (payload) => {
  return ProductModel.create(payload);
};

export const deleteProduct = (productId) => {
  return ProductModel.findByIdAndDelete(productId);
};
