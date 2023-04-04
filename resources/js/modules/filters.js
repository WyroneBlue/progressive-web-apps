import { $, $$ } from './helpers.js';
import { favorites, toggleFavorites } from './favorites.js';
import { closeOnEscape } from '../app.js';
import { renderSkeleton } from './requests.js';

export const filters = $('aside[aria-label="filters"]');
const filterButton = $('footer button[aria-label="toggle-filters"]');
const form = $('aside form');
const closeFilters = $('aside[aria-label="filters"] button');

// Get values from form and search for items
const searhArt = async (e) => {
    e.preventDefault();

    toggleFilters();
    const resultsContainer = $('main > ul');
    renderSkeleton(resultsContainer, false);

    // submit form with values
    form.submit();
}

// toggle filters window
export function toggleFilters() {

    if (favorites.classList.contains('show')) {
        toggleFavorites();
    }
    filters.classList.toggle('show');

    if (filters.classList.contains('show')) {
        const items = $$('[tabindex]', filters);
        setTabindex(items, 0);
        items[1].focus();

        document.addEventListener('keydown', closeOnEscape);
    } else {
        const items = $$('[tabindex]', filters);
        setTabindex(items, -1);
        document.removeEventListener('keydown', closeOnEscape);
    }
}


// set tabindex for items for accessibility
export function setTabindex(items, value) {
    items.forEach(item => {
        item.setAttribute('tabindex', value);
    });
}


form.addEventListener('submit', searhArt);
filterButton.addEventListener('click', toggleFilters);
closeFilters.addEventListener('click', toggleFilters);
