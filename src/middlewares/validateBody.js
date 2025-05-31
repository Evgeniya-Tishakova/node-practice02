import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, resp, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map((detail) => detail.message);
    next(createHttpError.BadRequest(errors));
  }
};
