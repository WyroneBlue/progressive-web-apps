import { $ } from '../modules/helpers.js';
import { goToPage } from '../modules/transition.js';


const dialog = $('dialog');

// Show extra info in dialog
export const showInfo = (e, item) => {

    dialog.innerHTML = `
        <div>
            <h1>Extra info</h1>
            <form method="dialog">
                <button type="submit">❌</button>
            </form>
        </div>

        <section>
            <h2>${item.title}</h2>
            <p>${item.longTitle}</p>
        </section>

        <div>
            <a href="${item.links.web}" target="_blank">Bekijk op rijksmuseum</a>
            <a href="/art-piece/${item.objectNumber}">
                Bekijk detail pagina
            </a>
        </div>
    `;

    // Add event listeners for closing dialog
    const detailButton = $('a:last-of-type', dialog);

    detailButton.addEventListener('click', (e) => {
        closeDialog();
        goToPage(e);
    });

    dialog.showModal();
}

// Close dialog function
export const closeDialog = () => {
    dialog.close();
    dialog.innerHTML = '';
}

// Close dialog on click outside
window.addEventListener('click', (e) => {
    if (e.target === dialog && dialog.open) {
        closeDialog();
    }
});
