import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async ({ category, minPrice, maxPrice }) => {
  const productsQuery = ProductModel.find();

  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (minPrice) {
    productsQuery.where('price').equals(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').equals(maxPrice);
  }

  return productsQuery;
};

export const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

export const creatProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const deleteProduct = async (productId) => {
  return await ProductModel.findByIdAndDelete(productId);
};

export const patchProduct = async (productId, payload) => {
  return await ProductModel.findByIdAndUpdate(productId, payload, {
    new: true,
  });
};
