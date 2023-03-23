import fetch from 'node-fetch';

const apiKey = process.env.RIJKSMUSEUM_API_KEY
console.log('details: ' + apiKey);
const language = 'nl';
const base = `https://www.rijksmuseum.nl/api/${language}/collection`;
const baseWithKey = `${base}?key=${apiKey}`;

const itemCount = 24;
const searchItemCount = 48;

export const get = async (url) => {

    try {
        const response = await fetch(url);
        if (!response.ok && response.status === 403) {
            throw new Error('This art piece is not available');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getId = (req, res) => {

    const { id } = req.params;
    return id;
}

export const getArt = async (req, res) => {

    const { page } = req.query;

    const url = `${baseWithKey}&ps=${itemCount}&p=${page}`;
    const response = await get(url);

    return response;
}

export const searchArt = async (req, res) => {

    const { page, search, sort, topPiece, imgOnly } = req.query;
    const url = `${baseWithKey}&p=${page}&ps=${searchItemCount}&q=${search}&s=${sort}&toppieces=${topPiece}&imgonly=${imgOnly}`;
    const response = await get(url);

    return response;
}

export const getArtById = async (id) => {

    console.log(id);
    const url = `${base}/${id}?key=${apiKey}`
    const response = await get(url);

    return response;
}

export const getArtImages = async (req, res) => {

    const { id } = req.params;

    const url = `${base}/${id}/tiles?key=${apiKey}`
    const response = await get(url);

    return response;
}

export const getArtFavorites = async (req, res) => {

    try {
        const { favorites } = req.body;
        const artItems = await Promise.all(favorites.map(async (favorite) => {
            const { artObject } = await getArtById(favorite);
            return artObject;
        }));
        console.log(artItems);
        res.send(artItems);
    } catch (error) {
        console.error(error);
        return error;
    }
}