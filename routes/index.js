import { Router } from 'express';
const router = Router();

import home from './home.js';
import details from './details.js';
import api from './api.js';
import error from './error.js';

router.use('/', home);
router.use('/art-piece', details);
router.use('/api', api);
router.use('*', error);

export default router;