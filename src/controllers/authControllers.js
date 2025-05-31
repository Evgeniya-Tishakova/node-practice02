//* Services
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} from '../services/auth.js';

//* Constants
import { ONE_DAY } from '../constants/index.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'User successfully created!',
    data: {
      user,
    },
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  const user = await logoutUser({
    refreshToken: req.cookies.refreshToken,
    sessionId: req.cookies.sessionId,
  });

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setUpSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserController = async (req, res, next) => {
  const session = await refreshUser({
    refreshToken: req.cookies.refreshToken,
    sessionId: req.cookies.sessionId,
  });

  setUpSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
