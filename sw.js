const staticCacheName = 'resto-review-cache';
/*
 * TODO:
 */

const requestsWithCredentials  = [        
  '/',
  'index.html',
  'css/styles.css',
  'data/restaurants.json',
  'restaurant.html',
  'js/main.js',
  'js/restaurant_info.js'
].map(url => new Request(url, {credentials: 'include'}));
       
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(requestsWithCredentials);
    })
  );
});


self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('resto-') &&
            cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName);
        })        
        );
    })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      if(response.status === 404){
        return fetch('img/404.jpg');
      }
      return response;
    }).catch(function(){
      return fetch('img/offline.jpg');
    })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request);
    })
  );
});

