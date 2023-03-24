import { closeWindows } from '../app.js';
import { $, $$ } from './helpers.js';

// Get main element
const main = $('main');

// Get all anchor elements
const anchors = $$('a:not([target="_blank"])');

export const goToPage = (e) => {
    e.preventDefault();
    closeWindows();
    const anchor = e.currentTarget;
    main.classList.add('page-transition');
    setTimeout(() => {
        window.location = anchor.href;
    }, 1000);
}

// Add event listener to each anchor
anchors.forEach(anchor => {
    setEventListener(anchor, goToPage);
});

// toggle page transition
export function transitionPage(func, time = 1000) {

    main.classList.add('page-transition');
    setTimeout(() => {
        if (main.classList.contains('error')) {
            main.classList.remove('error');
        };
        func();
        main.classList.remove('page-transition');
    }, time);
}

export function setEventListener(el, func, ev = 'click'){
    el.addEventListener(ev, func);
}

window.addEventListener('load', () => {
    main.classList.remove('page-transition');
});