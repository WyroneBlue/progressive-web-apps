import { Router } from 'express';
const router = Router();
import { index, offline } from "../controllers/home.js";

router.get('/', index);
router.get('/offline', offline);

export default router;