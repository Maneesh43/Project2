const cacheName = "lifecache-v4";
var filesToCache = ['./pages/offline.html', './pages/faqoffline.html', './style.css', './scripts/offlinefaq.js', './scripts/offline.js',

  'https://kit.fontawesome.com/5149b952aa.js',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Roboto:wght@700&display=swap',
  './assets/favicons/android-chrome-192x192.png',
  './assets/favicons/android-chrome-512x512.png',
  './assets/favicons/apple-touch-icon.png',
  './assets/favicons/favicon-16x16.png',
  './assets/favicons/favicon-32x32.png',
  './assets/favicons/favicon.ico',
  './assets/favicons/mstile-150x150.png',
  './assets/favicons/safari-pinned-tab.svg',
  './assets/images/default_image.png',
  './assets/images/facebook.png',
  './assets/images/google.png',
  './assets/logo/google-signin.png',
  './assets/logo/logo.png',
  './assets/logo/logo192.png',
  './assets/logo/logo512.png',
  './assets/logo/logomain.png',
  './assets/logo/logoanimated.png',
  './assets/pwa-assets/android/android-launchericon-48-48.png',
  './assets/pwa-assets/android/android-launchericon-72-72.png',
  './assets/pwa-assets/android/android-launchericon-96-96.png',
  './assets/pwa-assets/android/android-launchericon-144-144.png',
  './assets/pwa-assets/android/android-launchericon-192-192.png',
  './assets/pwa-assets/android/android-launchericon-512-512.png',









];

self.addEventListener('install', event => {

  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    // console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(filesToCache);
  })());


});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))

    })
  );


});

// Fetch

self.addEventListener('fetch', (event) => {


  event.respondWith(async function () {
    // Try the cache
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    try {

      return await fetch(event.request);
    } catch (err) {

      return caches.match('/pages/offline.html');

    }
  }());
});