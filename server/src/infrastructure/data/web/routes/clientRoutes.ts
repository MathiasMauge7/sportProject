import express from 'express';
import { register } from '../controllers/ClientController';

const router = express.Router();

// [POST] http://localhost:8000/users/register
router.post('/register', register);

export default router;
