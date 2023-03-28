const CACHE_NAME = 'static-v1';
const RUNTIME_CACHE_NAME = 'runtime-v1';
const BOOKMARKS_CACHE_NAME = 'bookmarks-v1';

const CORE_ASSETS = [
    '/',
    '/?page=1',
    '/?page=2',
    '/?page=3',
    '/?page=4',
    '/?page=5',
    '/?page=6',
    '/?page=7',
    '/?page=8',
    '/?page=9',
    '/?page=10',
    '/offline',
    '/favorites',
    '/css/app.css',
    '/js/app.js',
    '/images/rijksmuseum-logo.jpg',
    '/fonts/MuseoModerno-VariableFont_wght.ttf',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
    console.log('Service worker installed.');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.');

    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== BOOKMARKS_CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME) {
                        console.log('Service worker: clearing old cache.');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service worker fetching.');

    // get search params
    const url = new URL(event.request.url);
    // console.log(url);
    const path = url.pathname;
    // console.log(path);

    const param = url.searchParams.get('page');
    console.log(param);

    // const notHomeOrOffline = path !== '/' && path !== '/offline';

    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            caches.open(RUNTIME_CACHE_NAME)
            .then(cache => cache.match(event.request))
            .then(response => response || fetchAndCache(event.request))
            .catch(() => caches.open(CACHE_NAME).then(cache => cache.match('/offline')))
        )
    } else if (CORE_ASSETS.includes(path)) {

        const pathWithParam = param ? `${path}?page=${param}` : path;
        console.log(pathWithParam);
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(cache => cache.match(pathWithParam))
        )
    }
})

async function fetchAndCache(request) {
    return fetch(request)
    .then(response => {
        const clone = response.clone()
        caches.open(RUNTIME_CACHE_NAME)
            .then(cache => cache.put(request, clone))

        return response
    })
}

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         fetch(event.request)
//         .then((response) => {

//             const clone = response.clone();
//             caches.open(CACHE_NAME)
//             .then((cache) => cache.put(event.request, clone));

//             return response;
//         })
//         .catch((error) => caches.match(event.request).then((response) => response))
//     );
// });