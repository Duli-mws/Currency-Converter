const staticCacheName = 'currency-converter-static-v9999';
const urlsToCache = [
  '/Currency-Converter/',
  'index.html',
  'manifest.webmanifest',
  'js/main.js',
  'js/db.js',
  'js/foundation.min.js',
  'js/vendor/jquery.js',
  'css/foundation.min.css',
  'https://free.currencyconverterapi.com/api/v5/countries',
  'https://free.currencyconverterapi.com/api/v5/currencies' 
]

  //Install service 

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then((cache) => cache.addAll(urlsToCache))
  )
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('currency-converter-') &&
            cacheName !== staticCacheName;
        }).map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match( event.request ).then( function( response ) {
      return response || fetch(event.request);
    }).catch( function( error ) {
      console.log( error, 'no cache entry for:', event.request.url );
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
