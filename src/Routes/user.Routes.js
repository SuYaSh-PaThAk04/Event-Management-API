import { Router } from 'express';
import { createUser, getUsers } from '../Controllers/user.controllers.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);

export default router;
