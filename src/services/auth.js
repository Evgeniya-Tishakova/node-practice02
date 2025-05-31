//* Mongoose
import { UserCollection } from '../db/models/user.js';
import { SessionCollection } from '../db/models/session.js';

//* Constants
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

//* Http-error
import createHttpError from 'http-errors';

//* Bcrypt
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({
    email: payload.email,
  });
  if (user) {
    throw createHttpError(409, 'Email in use!');
  }

  const hashedUserPassword = await bcrypt.hash(payload.password, 10);
  return await UserCollection.create({
    ...payload,
    password: hashedUserPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({
    email: payload.email,
  });
  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({
    userId: user._id,
  });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async ({ refreshToken, sessionId }) => {
  return await SessionCollection.findOneAndDelete({
    refreshToken: refreshToken,
    _id: sessionId,
  });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  const isTokenExpired = new Date() > session.refreshTokenValidUntil;
  if (isTokenExpired) {
    throw createHttpError(401, 'Token expired');
  }

  const newSession = createSession();
  await SessionCollection.findOneAndDelete({
    _id: sessionId,
    refreshToken,
  });

  return await SessionCollection.create({
    ...newSession,
    userId: session.userId,
  });
};
