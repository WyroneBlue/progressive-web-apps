const CACHE_NAME = 'static-v2';

const urlsToCache = [
    '/',
    '/styles.css',
    '/js/script.js',
    '/images/logo.png'
];

self.addEventListener('install', (event) => {
    console.log('Service worker installed.');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.');

    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service worker: clearing old cache.');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
        .then((response) => {

            const clone = response.clone();
            caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));

            return response;
        })
        .catch((error) => caches.match(event.request).then((response) => response))
    );
});

// const urlsToCache = [
//     '/',
//     '/styles.css',
//     '/js/script.js',
//     '/images/logo.png'
// ];

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then((cache) => cache.addAll(urlsToCache))
//     );
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 if (response) {
//                     return response;
//                 }

//                 return fetch(event.request);
//             })
//     );
// });