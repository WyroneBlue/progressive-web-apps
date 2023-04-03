import { getArt, getSmallImage } from './data.js';

const index = async(req, res) => {

    const page = {
        title: "Home"
    };

    let { page: index } = req.query;
    index = parseInt(index) || 1;

    const { artObjects: items } = await getArt(req, res);

    const cards = await Promise.all(items.map(async (item) => {

        const { smallImg, alt, showOptions } = await getSmallImage(req, item);

        return {
            smallImg,
            alt,
            showOptions,
            ...item,
        }
    }))

    res.status(200).render('home', {
        page,
        cards,
        firstPage: !index || index === 1 ? true : false,
        prevPage: index-1,
        nextPage: index+1,
        hasItems: items.length > 0 ? true : false,
    });
};

const offline = (req, res) => {
    const page = {
        title: "Offline"
    };

    const backLink = req.headers.referer || '/';
    res.status(200).render('offline', {
        layout: 'offline',
        page,
        backLink
    });
};

export { index, offline }