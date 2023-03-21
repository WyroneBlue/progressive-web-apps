import { $, $$ } from './helpers.js';

// Get main element
const main = $('main');

// Get all anchor elements
const anchors = $$('a');

// Add event listener to each anchor
anchors.forEach(anchor => {

    anchor.addEventListener('click', (e) => {

        e.preventDefault();
        console.log('clicked');
        main.classList.add('page-transition');

        setTimeout(() => {
            window.location = anchor.href;
        }, 1000);
    });
});

// toggle page transition
export function transitionPage(func, options = '', time = 1000) {

    main.classList.add('page-transition');
    setTimeout(() => {
        if (main.classList.contains('error')) {
            main.classList.remove('error');
        };
        func(options);
        main.classList.remove('page-transition');
    }, time);
}


window.addEventListener('load', () => {
    main.classList.remove('page-transition');
});