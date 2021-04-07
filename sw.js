const cacheName = 'lifeline-cache';
const appShellFiles = [

'/pages/faq.html',
'/style.css',
'scripts/faq.js',
'scripts/misc.js',
'/assets/logo/logo.png',
'/pages/home.html',

]
self.addEventListener('install', event => {
    // fires when the browser installs the app
    // here we're just logging the event and the contents
    // of the object passed to the event. the purpose of this event
    // is to give the service worker a place to setup the local 
    // environment after the installation completes.
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
    // document.querySelector('.pwabanner').getElementsByClassName.display="none";


    event.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(appShellFiles);
      })());
});

self.addEventListener('activate', event => {
    // fires after the service worker completes its installation. 
    // It's a place for the service worker to clean up from previous 
    // service worker versions
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
});

self.addEventListener('fetch', event => {
    console.log(`Fetching ${event.request.url}`);
   

});