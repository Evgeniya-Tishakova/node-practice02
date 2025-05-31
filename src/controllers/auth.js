import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, resp) => {
  const user = await registerUser(req.body);

  console.log('user', user);

  resp.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
