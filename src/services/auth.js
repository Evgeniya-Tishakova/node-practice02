import { UserModel } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'This email is already in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  console.log('Payload', payload);

  const newUser = await UserModel.create(payload);

  return newUser;
};
