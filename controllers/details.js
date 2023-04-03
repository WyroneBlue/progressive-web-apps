import { getArtById } from './data.js';

const index = async (req, res) => {

    const { id } = req.params;
    const { artObject: art } = await getArtById(id);

    const page = {
        title: `Details: ${art.title}`
    };

    const backLink = req.headers.referer || '/';
    const externalLink = `http://www.rijksmuseum.nl/nl/collectie/${art.objectNumber}`;

    // Set image and alt text
    let image = '';
    let msg = '';
    let alt = '';
    let ratio = 1;

    // Check if image is available
    try {
        image = art.webImage.url;
        ratio = art.webImage.width / art.webImage.height;
        if (art.plaqueDescriptionDutch) {
            alt = art.plaqueDescriptionDutch;
        } else {
            alt = `Image for ${art.title}.`;
        }
    } catch (error) { // If not, show placeholder image
        image = './images/rijksmuseum-logo.jpg';
        msg = ': <span>Only available in the Rijksmuseum</span>';
        alt = `Placeholder image for ${art.title}. This image is only available in the Rijksmuseum`;
    }

    // Set aspect ratio
    const style = `aspect-ratio: ${ratio}`;

    res.status(200).render('details', {
        layout: 'details',
        page,
        backLink,
        externalLink,
        art,
        image,
        msg,
        alt,
        style,
    });
};

export { index }