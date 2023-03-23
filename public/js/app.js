console.log('Wagwan world!')

import { filters, toggleFilters } from './modules/filters.js';
import { favorites, toggleFavorites } from './modules/favorites.js';

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