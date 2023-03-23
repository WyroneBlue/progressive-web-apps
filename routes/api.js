import { Router } from 'express';
const router = Router();
import { getArtFavorites } from "../controllers/data.js";

router.post('/favorites', getArtFavorites);

export default router;