const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

 

self.addEventListener('install', (event) => {
    event.waitUntill(
        caches.open(CACHE_NAME)
        .then((cache) => {

            return cache.addAll(urlsToCache)
        })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntill(
        caches.keys()
        .then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});