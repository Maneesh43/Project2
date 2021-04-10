
const staticCacheName = 'pages-cache-v1';
const filesToCache = [
    'style.css',
    'index.html',
    'pages/offline.html',
    'pages/faq.html'
  ];


//   Install event


self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });



// Fetch

self.addEventListener('fetch', (event) => {

});