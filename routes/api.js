import { Router } from 'express';
const router = Router();
import { getArtFavorites, getArt, searchArt, getArtById, getArtImages } from "../controllers/data.js";
import { insertArtFavorites } from '../controllers/favorites.js';

router.post('/favorites/save', insertArtFavorites);
router.post('/favorites', getArtFavorites);
router.get('/art/details/images', getArtImages);
router.get('/art/details', getArtById);
router.get('/art/search', searchArt);
router.get('/art', getArt);

export default router;