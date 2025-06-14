import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async ({
  category,
  minPrice,
  maxPrice,
  userId,
}) => {
  const productsQuery = ProductModel.find({ userId });

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

export const getProductById = async (productId, userId) => {
  return await ProductModel.findOne({ _id: productId, userId });
};

export const creatProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const deleteProduct = async (productId, userId) => {
  return await ProductModel.findOneAndDelete({ _id: productId, userId });
};

export const patchProduct = async (productId, payload, userId) => {
  return await ProductModel.findOneAndUpdate(
    { _id: productId, userId },
    payload,
    {
      new: true,
    },
  );
};
