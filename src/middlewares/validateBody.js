//* Http-error
import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const err = error.details.map((detail) => detail.message);
    next(createHttpError(400, err));
  }
};
