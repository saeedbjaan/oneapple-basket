const CACHE_NAME = 'oneapple-basket-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/q7gkfVbK/One-Apple-Logo.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap',
  './catch.mp3',
  './golden.mp3',
  './miss.mp3',
  './bonus.mp3',
  './gameover.mp3',
  './powerup.mp3',
  './music.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log('Some files failed to cache:', err);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});