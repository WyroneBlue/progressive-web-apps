const CACHE_NAME = 'static-v1';
const RUNTIME_CACHE_NAME = 'runtime-v1';
const BOOKMARKS_CACHE_NAME = 'bookmarks-v1';
const OFFLINE_URL = '/offline';

const CORE_ASSETS = [
    '/',
    '/?page=1',
    '/?page=2',
    '/?page=3',
    '/?page=4',
    '/?page=5',
    '/offline',
    '/favorites',
    '/css/app.css',
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
    const requestUrl = new URL(event.request.url);
    const path = requestUrl.pathname;
    const param = requestUrl.searchParams.get('page');

    if (CORE_ASSETS.includes(path)) {

        const pathWithParam = param ? `${path}?page=${param}` : path;
        event.respondWith(
            caches.open(CACHE_NAME)
            .then(cache => cache.match(pathWithParam))
            .then(response => response || fetch(event.request))
            .catch(() => caches.match(OFFLINE_URL))
        )
    } else if (requestUrl.pathname !== '/' && !requestUrl.pathname.endsWith('.js') && !requestUrl.pathname.endsWith('.jpg') && !requestUrl.pathname.endsWith('.png') && !requestUrl.pathname.endsWith('.gif')) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request).then(async function (response) {
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(function () {
                return caches.match('/offline');
            })
        );
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