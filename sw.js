const cacheName="lifecache-v21";

var filesToCache = ['/pages/updates.html','/pages/faq.html','/pages/offline.html','/style.css','https://kit.fontawesome.com/5149b952aa.js'];

self.addEventListener('install', event => {

  event.waitUntil(
    caches.open(cacheName).then(cache => {
        return cache.addAll(filesToCache);
    })
  );
  

});

self.addEventListener('activate', event => {

 event.waitUntil(
   caches.keys().then(keys=>{
    return Promise.all(keys.filter(key=>key!==cacheName).map(key=>caches.delete(key)))

   })
 );

 
});

// Fetch

self.addEventListener('fetch', (event) => {

  event.respondWith(async function() {
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