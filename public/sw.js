const cacheName = 'my-cache';
const filesToCache = [
    '/',
    '/javascripts/add.js',
    '/javascripts/index.js',
    '/stylesheets/style.css',
    '/stylesheets/details.css',
    '/stylesheets/upload.css',
    '/images/icon.png',
    '/add',
    '../public/partials/headers.ejs'

];

// install: cache specified files and urls
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filesToCache))
    );
});

// fetch: network first then fetch from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        // Check network first
        fetch(event.request)
            .then(response => {
                // If response is successful, clone it and update the cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(cacheName)
                        .then(cache => cache.put(event.request, responseClone));
                }
                return response;
            })
            .catch(() => {
                // If network request fails, fetch from cache
                return caches.match(event.request);
            })
    );
});
