console.log('Wagwan world!')

import { filters, toggleFilters } from './modules/filters.js';
import { favorites, toggleFavorites, favoritesArray } from './modules/favorites.js';
import { $ } from './modules/helpers.js';

const BOOKMARKS_CACHE_NAME = 'bookmarks-v1';
const favoritesUrlList = favoritesArray.map((item) => `/art-piece/${item}`);

const main = $('main');

// close filters and favorites window
export function closeWindows() {
    if (filters.classList.contains('show')) {
        toggleFilters();
    }
    if (favorites.classList.contains('show')) {
        toggleFavorites();
    }
}

// close windows on escape key
export function closeOnEscape(e) {
    if (e.key === "Escape") {
        closeWindows();
    }
}

if (navigator.serviceWorker) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(async(event) => {
            console.log('Service worker registered.');

            const cache = await caches.open(BOOKMARKS_CACHE_NAME);
            if(cache) cache.addAll(favoritesUrlList);
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    main.classList.remove('no-js');
});