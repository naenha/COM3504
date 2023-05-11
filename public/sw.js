// if u change cahce_name then pwa will re-install the cache(?)
const CACHE_NAME = `v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {

    //Sw will be installed after waitUtil is done
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // files&images that u want to be cached (for offline page)
        cache.addAll([
            '/',
            '/javascripts/add.js',
            '/stylesheets/style.css',
            '/stylesheets/upload.css',
            '/images/icon.png'
        ]);
    })());
});


//called by every http request
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Get the resource from the cache.
        // serve it from the cache, if not try network and save it and then return it
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);

                // Save the resource in the cache and return it.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // The network failed.
            }
        }
    })());
});

