//* Express
import express from 'express';
const router = express.Router();

//* Utils
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validation/authValidation.js';

//* Controllers
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
} from '../controllers/authControllers.js';

//* REGISTER
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

//* LOGIN
router.post('/login', validateBody(loginUserSchema), loginUserController);

//* LOGOUT
router.post('/logout', ctrlWrapper(logoutUserController));

//* REFRESH
router.post('/refresh', ctrlWrapper(refreshUserController));

export default router;
