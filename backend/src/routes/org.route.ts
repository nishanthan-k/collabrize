import { Router } from 'express';
import { createOrganization } from '../controllers/org/org.controller';

const router = Router();

router.post('/create', createOrganization);

export default router;