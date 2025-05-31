import { Router } from 'express';
import express from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper';
// import { validateBody } from '../middlewares/validateBody';

const router = Router();
const jsonParser = express.json();

router.post('/register');

export default router;
