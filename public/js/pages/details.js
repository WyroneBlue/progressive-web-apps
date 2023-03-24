import { $ } from '../modules/helpers.js';
import { isFavorite, toggleFavorite } from '../modules/favorites.js';
import { goToPage, setEventListener, transitionPage } from '../modules/transition.js';
import { showError } from './error.js';

const main = $('main');
let cachedPage;

// show details page
export const showDetails = async () => {

    // activate loading screen
    renderLoading();

    // Show details with transition
    setTimeout(() => {
        transitionPage(renderHTML);
    }, 1000);

    // render details
    function renderHTML() {

        main.innerHTML = cachedPage;
        const artId = $('section:first-of-type', main).id;

        // Remove loading screen
        main.classList.remove('loading');

        // Set save button icon
        const saveButtonIcon = isFavorite(artId) ? '❤️' : '🖤';
        const saveButton = $('button', main);
        saveButton.classList.remove('loading');

        // Add event listeners
        saveButton.innerHTML = saveButtonIcon;
        saveButton.addEventListener('click', (e) => toggleFavorite(e, artId));

        const link = $('nav > a:first-of-type', main);
        setEventListener(link, goToPage);
    }

    // Show loading screen
    function renderLoading() {

        cachedPage = main.innerHTML;

        main.classList.add('loading');
        main.innerHTML = `
            <h1>loading...</h1>
        `;
    }
}

showDetails();

