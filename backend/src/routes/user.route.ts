import { Router } from 'express';
import { checkUser } from '../controllers/user/user.controller';

const router = Router();
router.get('/checkUser', checkUser);

export default router;