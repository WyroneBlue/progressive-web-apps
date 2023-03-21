import { Router } from 'express';
const router = Router();
import { index } from "../controllers/details.js";

router.get('/:id', index);

export default router;