import fetch from 'node-fetch';
import MobileDetect from 'mobile-detect';

const apiKey = process.env.RIJKSMUSEUM_API_KEY
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

    const { page, raw } = req.query;

    const url = `${baseWithKey}&ps=${itemCount}&p=${page}`;

    if (!raw) {
        const response = await get(url);
        return response;
    } else {

        const response = await fetch(url);
        const { artObjects: items } = await response.json();

        res.send(items);
    }
}

export const searchArt = async (req, res) => {

    const { page, search, sort, topPiece, imgOnly, raw } = req.query;

    const url = `${baseWithKey}&p=${page}&ps=${searchItemCount}&q=${search}&s=${sort}&toppieces=${topPiece}&imgonly=${imgOnly}`;

    if (!raw) {
        const response = await get(url);
        return response;
    } else {

        const response = await fetch(url);
        const { artObjects: items } = await response.json();

        res.send(items);
    }
}

export const getArtById = async (id) => {

    const url = `${base}/${id}?key=${apiKey}`
    const response = await get(url);

    return response;
}

export const getArtImages = async (id) => {

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

        res.send(artItems);
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getSmallImage = async(req, art) => {

    let image;
    let alt;

    try { // Try to get the low "z4" image quality

        const images = await getArtImages(art.objectNumber);
        if (images && images.levels) {
            const { tiles } = images.levels.filter(image => image.name === "z4")[ 0 ];
            const lowestImage = tiles[0].url.replace('http', 'https');
            image = lowestImage;
        } else {
            image = art.webImage.url;
        }
        alt = `Image for ${art.title}.`;

    } catch (error) { // If that fails, use a placeholder image

        const imgPlaceholder = './images/explore-placeholder.jpg';
        image = imgPlaceholder;
        alt = `Placeholder image for ${art.title}. This image is only available in the Rijksmuseum`;
    }

    // initialize options for mobile and desktop
    let showOptions = {
        text: '',
        class: '',
    }

    const deviceCheck = new MobileDetect(req.headers['user-agent']);
    const isMobile = deviceCheck.mobile();

    // set options for mobile and desktop
    if (isMobile) {
        showOptions.text = `Click for options`;
        showOptions.class = 'mobile';
    } else {
        showOptions.text = `Hover for options`;
    }

    return {
        smallImg: image,
        alt,
        showOptions
    };
}