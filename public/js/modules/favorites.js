import { $, awaitMap } from './helpers.js';
import { filters, toggleFilters } from './filters.js';
import { closeOnEscape } from '../app.js';
import { renderSkeleton, fetchFavoriteDetails } from './requests.js';
import { artCard } from './artCard.js';

// Favorites from local storage
const storage = localStorage.getItem('favorites');
export const favoritesArray = storage ? JSON.parse(storage) : [];

// Check if item is in favorites
export const isFavorite = (objectNumber) => favoritesArray.some(id => id === objectNumber);

// Show empty state in given container
export const emptyState = (list) => {
    list.innerHTML = '<p>There are no favorites yet.</p>';
}

// Show favorites count in favorites button
export const showFavoritesCount = () => {
    const favoritesCount = $('aside[aria-label="favorites"] h2 span');
    favoritesCount.innerHTML = favoritesArray.length;

    return favoritesArray.length;
}

// Get all the favorite buttons
export const favorites = $('aside[aria-label="favorites"]');
const favoButton = $('footer button[aria-label="toggle-favorites"]');
const closeFavorites = $('aside[aria-label="favorites"] button');
const favoritesList = $('aside[aria-label="favorites"] ul');

favoButton.addEventListener('click', toggleFavorites);
closeFavorites.addEventListener('click', toggleFavorites);

// load favorites from local storage
const loadFavorites = async () => {
    const count = showFavoritesCount();
    if (count === 0) {
        emptyState(favoritesList);
        return
    }

    // activate loading screen/skeleton
    renderSkeleton(favoritesList, false);

    // Fetch details for each item
    const items = await fetchFavoriteDetails(favoritesArray);
    favoritesList.innerHTML = '';

    // Render each item
    await awaitMap(items.map(async item => {
        const saveButtonIcon = "❌";
        await artCard({ item, saveButtonIcon, observe: true, resultsContainer: favoritesList });

        const lastItem = favoritesList.lastElementChild;

        const removeButton = $('button:first-of-type', lastItem);
        removeButton.addEventListener('click', (e) => removeItem(e, item.objectNumber));
    }));
}

// toggle favorites window
export async function toggleFavorites() {

    if (filters.classList.contains('show')) {
        toggleFilters();
    }
    favorites.classList.toggle('show');

    if (favorites.classList.contains('show')) {
        await loadFavorites();
        if (favoritesArray.length > 0) {

            const firstItem = $('[tabindex]', favoritesList);
            firstItem.focus();
        }
        document.addEventListener('keydown', closeOnEscape);
    } else {
        favoritesList.innerHTML = '';
        document.removeEventListener('keydown', closeOnEscape);
    }
}

// Toggle favorite animation
export const showFavoriteAnimation = (el, className, icon) => {
    el.classList.add(className);
    el.addEventListener('animationend', () => {
        el.classList.remove(className);
        el.innerHTML = icon;
    });
}

// Toggle favorite item
export const toggleFavorite = (e, objectNumber) => {

    const favoButton = e.target;
    if (isFavorite(objectNumber)) {

        removeFavorite(objectNumber);
        showFavoriteAnimation(favoButton, 'removed', '🖤');
    } else {

        addFavorite(objectNumber);
        showFavoriteAnimation(favoButton, 'saved', '❤️');
    }
    saveFavorites();
}


// Add favorite and save to local storage
function addFavorite(id) {
    favoritesArray.push(id);
    saveFavorites();
}

// Remove favorite and save to local storage
export function removeFavorite(id) {
    const index = favoritesArray.indexOf(id);
    favoritesArray.splice(index, 1);
    saveFavorites();
}

// Save favorites to local storage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
}