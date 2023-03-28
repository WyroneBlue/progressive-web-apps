import { get, post } from './helpers.js';

// render skeleton for loading items
export const renderSkeleton = (list, container = true) => {

    let html = container ? '<ul>' : '';

    for (let i = 0; i < 10; i++) {
        html += `
            <li class="skeleton"></li>
        `;
    }

    html += container ? '</ul><span></span>' : '';

    list.innerHTML = html;
}

// standard fetch items call: returns 24 items
export const fetchItems = async (page) => await get(`/api/art?page=${page}&raw=false`);

// fetch items with keyword search, sort and filters: returns 48 items
export const searchItems = async (page, search, sort, topPiece, imgOnly) => {

    const topPieceBool = topPiece === 'on' ? true : false;
    const imgOnlyBool = imgOnly === 'on' ? true : false
    return await get(`/api/art/search?page=${page}&raw=false&search=${search}&sort=${sort}&topPiece=${topPieceBool}&imgOnly=${imgOnlyBool}`);
};

// fetch item images for detail page
// export const fetchDetailImages = async (id) => await get(`${base}/${id}/tiles?key=${apiKey}`);
export const fetchDetailImages = async (id) => await get(`/api/art/details/images?id=${id}&raw=false`);

// fetch details for favorite items
export const fetchFavoriteDetails = async (favorites) => await post(`/api/favorites`, {
   favorites
});

export const insertFavorites = (favorites) => post(`/api/favorites/save`, {
    favorites
});
