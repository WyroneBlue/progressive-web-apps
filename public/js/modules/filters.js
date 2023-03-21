import { $, $$, awaitMap } from './helpers.js';
import { favorites, toggleFavorites } from './favorites.js';
import { closeOnEscape } from '../app.js';

export const filters = $('aside[aria-label="filters"]');
const filterButton = $('footer button[aria-label="toggle-filters"]');
const form = $('aside form');
const closeFilters = $('aside[aria-label="filters"] button');

filterButton.addEventListener('click', toggleFilters);
closeFilters.addEventListener('click', toggleFilters);

// Get values from form and search for items
const searhArt = async (e) => {
    e.preventDefault();

    let freshLoad = true;
    if (window.location.hash !== '#home' && window.location.hash !== '') {
        freshLoad = false;
        window.location = '#home';
    }

    const search = $('label:first-of-type input', form).value;
    const sort = $('fieldset input:checked', form).value;
    const topPiece = $('fieldset label:first-of-type input[name="top-piece"]', form).checked;
    const imageOnly = $('fieldset label:last-of-type input[name="image-only"]', form).checked;

    toggleFilters();

    const resultsContainer = $('main > ul');
    renderSkeleton(resultsContainer, false);

    const { artObjects: items } = await searchItems(1, search, sort, topPiece, imageOnly);

    setTimeout(() => {
        renderArtDisplay(items, freshLoad, true);
    }, 2000);
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