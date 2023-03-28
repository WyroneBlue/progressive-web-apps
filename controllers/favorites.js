import { getFavoritesById, getSmallImage } from './data.js';

const favorites = [];

const index = async (req, res) => {

    const page = {
        title: "Favorites"
    };

    // console.log(favorites);
    const items = await getFavoritesById(favorites);
    console.log(items);

    const cards = await Promise.all(items.map(async (item) => {

        const { smallImg, alt, showOptions } = await getSmallImage(req, item);

        return {
            smallImg,
            alt,
            showOptions,
            ...item,
        }
    }))

    console.log(cards);

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

    console.log(items);
    await JSON.parse(items).forEach(favorite => {
        if (!favorites.includes(favorite)) {
            favorites.push(favorite);
        }
    });
    console.log(favorites);

    res.status(200).json({
        status: 'success',
        message: 'Favorites saved',
    });
}

export { favorites, index }