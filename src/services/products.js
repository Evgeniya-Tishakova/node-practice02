import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async ({
  category,
  minPrice,
  maxPrice,
  user,
}) => {
  const productsQuery = ProductModel.find({
    userId: user._id,
  });

  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (minPrice) {
    productsQuery.where('price').gte(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').lte(maxPrice);
  }

  // const products = await productsQuery.find();
  return productsQuery;
};

export const getProductById = ({ id, user }) => {
  return ProductModel.findOne({
    _id: id,
    userId: user._id,
  });
};

export const creatProduct = ({ payload, user }) => {
  return ProductModel.create({
    ...payload,
    userId: user._id,
  });
};

export const deleteProduct = ({ id, user }) => {
  return ProductModel.findOneAndDelete({
    _id: id,
    userId: user._id,
  });
};
