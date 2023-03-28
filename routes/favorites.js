import { Router } from 'express';
const router = Router();
import { index } from "../controllers/favorites.js";

router.get('/', index);

export default router;