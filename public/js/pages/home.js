import { $, awaitMap, getParam } from '../modules/helpers.js';
import { fetchItems, renderSkeleton, searchItems } from '../modules/requests.js';
import { artCard } from '../modules/artCard.js';
import { isFavorite, toggleFavorite } from '../modules/favorites.js';

const main = $('main');
let cachedPage;

let page = 1;
let initialLoad = true;

// Show home page

const checkFetch = async () => {

    // Get params from url
    const search = getParam('search');
    const sort = getParam('sort');
    const topPiece = getParam('top-piece');
    const imgOnly = getParam('image-only');

    if (search || sort || topPiece || imgOnly) {
        return await searchItems(page, search, sort, topPiece, imgOnly);
    } else {
        return await fetchItems(page);
    }

}

export const loadHome = async () => {

    // cachedPage = main.innerHTML;

    // activate loading screen/skeleton
    renderSkeleton(main);

    // check if fresh fetch or search
    const items = await checkFetch();

    if (!items || items.length === 0) {
        renderError();
        return;
    }

    const moreResultsSection = $('main > span', main);

    // Show items with transition
    setTimeout(() => {
        renderArtDisplay(items, true);
        initialLoad = false;
    }, 1000);

    let moreResultsOptions = {
        rootMargin: '0px 0px 300px 0px',
    }

    // observe more results section to load more items
    const moreResultsObserver = new IntersectionObserver(async (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {

            if (!initialLoad) {
                page++;
                const items = await checkFetch();
                renderArtDisplay(items);
            }
        }
    }, moreResultsOptions);
    moreResultsObserver.observe(moreResultsSection);
}

export async function renderArtDisplay(items, fresh = false, showMore = false) {

    // if fresh, clear results container
    const resultsContainer = $('main > ul');
    if (fresh) {
        resultsContainer.innerHTML = '';
    }

    // if no items are found, show error message and return
    if (items.length === 0) {
        resultsContainer.innerHTML = `
            <li class="loaded empty-search">
                <div>
                    <p>There were no art pieces found! </p>
                    Try another search or check out the art items below
                    <span>⬇️</span>
                </div>
            </li>
        `;
        return;
    }

    // render items with artCard component
    await awaitMap(items.map(async (item) => {
        const saveButtonIcon = isFavorite(item.objectNumber) ? '❤️' : '🖤';
        await artCard({ item, saveButtonIcon, resultsContainer, observe: true });

        const lastItem = resultsContainer.lastElementChild;
        const saveButton = $('menu li:first-of-type button', lastItem);
        saveButton.addEventListener('click', (e) => toggleFavorite(e, item.objectNumber));
    }));

    // if showMore, show more results section(after search results)
    if (showMore) {
        const moreResultsSection = document.createElement('li');
        moreResultsSection.classList.add('see-other');
        moreResultsSection.classList.add('loaded');

        moreResultsSection.innerHTML = `
        <div>
            <p>Those were the search results ✅</p>
            Check out the other items below
            <span>⬇️</span>
        </div>
        `;

        resultsContainer.appendChild(moreResultsSection);
    }
}

// render error message and retry button
export function renderError() {
    const button = document.createElement('button');
    button.innerHTML = 'Try again 🔃';

    main.innerHTML = `
        <section>
            <h2>Something went wrong while getting Art from the Rijksmuseum</h2>
            ${button.outerHTML}
        </section>
    `;

    main.classList.add('error');

    const retryButton = $('button', main);
    retryButton.addEventListener('click', () => {
        loadHome();
    });
}

loadHome();
