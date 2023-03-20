import { Router } from 'express';
const router = Router();
import { index, test } from "../controllers/home.js";

router.get('/', index);
router.get('/test', test);

export default router;