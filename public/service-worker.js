// importScripts('https://cdnjs.cloudflare.com/ajax/libs/axios/0.22.0/axios.min.js');

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-name').then((cache) => {
            return cache.addAll([
                '/',
                'index.html',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
    caches.open('axios-cache').then((cache) => {
            return cache.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
