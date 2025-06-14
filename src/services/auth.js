import { UserModel } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { FIFEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { SessionModel } from '../db/models/session.js';
import { randomBytes } from 'crypto';

export const registerUser = async (payload) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'This email is already in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  const newUser = await UserModel.create(payload);

  return newUser;
};

export const loginUser = async (payload) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  //* Порівнюємо хеші паролів
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  //! функція видаляє попередню сесію користувача, якщо така існує, з колекції сесій.
  //* Це робиться для уникнення конфліктів з новою сесією.
  await SessionModel.deleteOne({ userId: user._id });

  //! генеруються нові токени доступу та оновлення.
  //* Використовуються випадкові байти, які конвертуються в строку формату base64.
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionModel.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionModel.deleteOne({ _id: sessionId });
};

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionModel.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionModel.deleteOne({ _id: sessionId, refreshToken });

  return await SessionModel.create({
    userId: session.userId,
    ...newSession,
  });
};
