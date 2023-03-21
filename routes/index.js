import { Router } from 'express';
const router = Router();

import home from './home.js';
import details from './details.js';
import error from './error.js';

router.use('/', home);
router.use('/details', details);
router.use('*', error);

export default router;