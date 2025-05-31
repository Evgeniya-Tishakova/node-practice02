import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const IsValidID = (req, resp, next) => {
  const { id } = req.query;

  if (isValidObjectId(id) !== true) {
    return next(createHttpError.BadRequest('Id should be an ObjectId'));
  }
  next();
};
