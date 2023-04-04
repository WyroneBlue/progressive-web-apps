import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources/js';
const PUBLIC_BASE = './public/js';

const PAGES = [
    'details',
    'error',
    'favorites',
    'home',
];

(function () {

    buildJS([`${RESOURCE_BASE}/app.js`], PUBLIC_BASE, '.js');
}());

(function () {
    const dir = 'modules';
    buildJS([`${RESOURCE_BASE}/${dir}/*`], `${PUBLIC_BASE}/${dir}`, '.js');
}());


(function () {
    const dir = 'pages';
    PAGES.forEach((page) => {
        buildJS([`${RESOURCE_BASE}/${dir}/${page}.js`], `${PUBLIC_BASE}/${dir}`, '.js');
    });
}());

