import { getLocalStorage, setLocalStorage } from '../utils/Localstorage.js';
import { getFavoritesById, getSmallImage } from './data.js';

export const index = async (req, res) => {

    const page = {
        title: "Favorites"
    };

    const favorites = JSON.parse(getLocalStorage('favorites')) || [];
    const items = await getFavoritesById(favorites);

    const cards = await Promise.all(items.map(async (item) => {

        const { smallImg, alt, showOptions } = await getSmallImage(req, item);

        return {
            smallImg,
            alt,
            showOptions,
            ...item,
        }
    }));

    res.status(200).render('favorites', {
        layout: 'favorites',
        headerTitle: 'Favorites',
        page,
        cards,
        hasItems: items.length > 0 ? true : false,
    });
};

export const insertArtFavorites = async (req, res) => {

    const { favorites: items } = req.body;

    setLocalStorage('favorites', items);

    res.status(200).json({
        status: 'success',
        message: 'Favorites saved',
    });
}