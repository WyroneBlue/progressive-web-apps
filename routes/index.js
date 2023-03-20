import { Router } from 'express';
const router = Router();

import home from './home.js';
import error from './error.js';

router.use('/', home);
router.use('*', error);

export default router;