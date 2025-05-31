import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    console.log(err);
    const error = err.details.map((detail) => detail.message);

    next(createHttpError(400, error));
  }
};
